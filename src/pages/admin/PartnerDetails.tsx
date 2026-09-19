import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Download, AlertCircle, ExternalLink, FileText } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import PartnerApprovalDialog from '../../components/PartnerApprovalDialog';
import PartnerRejectionDialog from '../../components/PartnerRejectionDialog';

interface Partner {
    uid: string;
    userId: string;
    business?: {
        businessName?: string;
        businessType?: string;
        address?: string;
        city?: string;
        state?: string;
        pincode?: string;
    };
    profilePhotoUrl?: string;
    identity?: {
        governmentIdType?: string;
        governmentIdStatus?: string;
        governmentIdDocumentUrl?: string;
        serviceCertificateUrl?: string;
        serviceCertificateUrls?: string[];
    };
    serviceIds?: string[];
    serviceAreas?: string[];
    status: string;
    verification?: {
        status?: string;
        submittedAt?: any;
        reviewedAt?: any;
        reviewedBy?: string;
        rejectionReason?: string;
    };
    createdAt?: any;
    updatedAt?: any;
}

interface User {
    uid: string;
    email?: string;
    displayName?: string;
    phoneNumber?: string;
    photoURL?: string;
    roles?: string[];
}

export default function PartnerDetails() {
    const { partnerId } = useParams<{ partnerId: string }>();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [partner, setPartner] = useState<Partner | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login');
            return;
        }

        if (!partnerId) {
            navigate('/admin/partners');
            return;
        }

        const fetchPartnerData = async () => {
            try {
                // Fetch partner document
                const partnerDoc = await getDoc(doc(db, 'partners', partnerId));
                if (!partnerDoc.exists()) {
                    navigate('/admin/partners');
                    return;
                }

                const partnerData = { uid: partnerDoc.id, ...partnerDoc.data() } as Partner;
                setPartner(partnerData);

                // Fetch associated user document
                if (partnerData.userId) {
                    const userDoc = await getDoc(doc(db, 'users', partnerData.userId));
                    if (userDoc.exists()) {
                        setUser({ uid: userDoc.id, ...userDoc.data() } as User);
                    }
                }
            } catch (error) {
                console.error('Error fetching partner data:', error);
                setFetchError('Unable to load this partner right now. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPartnerData();
    }, [isAdmin, navigate, partnerId, refreshKey]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-600" role="status">Loading partner details...</p>
                </div>
            </AdminLayout>
        );
    }

    if (fetchError || !partner) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                    <p className="text-gray-700">{fetchError || 'Partner details are unavailable.'}</p>
                    <button
                        onClick={() => {
                            setFetchError(null);
                            setLoading(true);
                            setRefreshKey((currentKey) => currentKey + 1);
                        }}
                        className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
                    >
                        Try Again
                    </button>
                </div>
            </AdminLayout>
        );
    }

    const canApprove = partner.status !== 'APPROVED' && partner.status !== 'REJECTED';
    const canReject = partner.status !== 'REJECTED' && partner.status !== 'APPROVED';
    const serviceCertificateUrls = Array.from(
        new Set(
            [
                partner.identity?.serviceCertificateUrl,
                ...(partner.identity?.serviceCertificateUrls || []),
            ].filter((url): url is string => Boolean(url))
        )
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/admin/partners')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {partner.business?.businessName || 'Partner Application'}
                        </h1>
                        <p className="text-gray-600 mt-1">ID: {partner.uid}</p>
                    </div>
                </div>

                {/* Status Badge and Action Buttons */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span
                            className={`px-4 py-2 rounded-full text-sm font-bold ${partner.status === 'APPROVED'
                                ? 'bg-green-100 text-green-800'
                                : partner.status === 'REJECTED'
                                    ? 'bg-red-100 text-red-800'
                                    : partner.status === 'PENDING'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {partner.status}
                        </span>
                        <span
                            className={`px-4 py-2 rounded-full text-sm font-bold ${partner.verification?.status === 'VERIFIED'
                                ? 'bg-green-100 text-green-800'
                                : partner.verification?.status === 'REJECTED'
                                    ? 'bg-red-100 text-red-800'
                                    : partner.verification?.status === 'SUBMITTED'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            Verification: {partner.verification?.status || 'NOT_SUBMITTED'}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        {canApprove && (
                            <button
                                onClick={() => setShowApproveDialog(true)}
                                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
                            >
                                Approve Partner
                            </button>
                        )}
                        {canReject && (
                            <button
                                onClick={() => setShowRejectDialog(true)}
                                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                            >
                                Reject Partner
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
                            {partner.profilePhotoUrl ? (
                                <img
                                    src={partner.profilePhotoUrl}
                                    alt="Partner profile"
                                    className="h-32 w-32 rounded-2xl border border-gray-200 object-cover"
                                />
                            ) : (
                                <p className="text-gray-500">No profile image uploaded</p>
                            )}
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Name</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {user?.displayName || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                    <p className="text-lg font-semibold text-gray-900">{user?.email || 'Not provided'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {user?.phoneNumber || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Firebase UID</p>
                                    <p className="text-xs font-mono text-gray-600 break-all">{partner.userId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Business Name</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {partner.business?.businessName || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Business Type</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {partner.business?.businessType || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Address</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {partner.business?.address || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">City</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {partner.business?.city || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">State</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {partner.business?.state || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Pincode</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {partner.business?.pincode || '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        {partner.serviceIds && partner.serviceIds.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>
                                <div className="flex flex-wrap gap-2">
                                    {partner.serviceIds.map((serviceId) => (
                                        <span
                                            key={serviceId}
                                            className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold"
                                        >
                                            {serviceId}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Service Areas */}
                        {partner.serviceAreas && partner.serviceAreas.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Areas</h2>
                                <div className="flex flex-wrap gap-2">
                                    {partner.serviceAreas.map((area) => (
                                        <span key={area} className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Identity Verification */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Identity Verification</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Government ID Type</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {partner.identity?.governmentIdType || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">KYC Document Status</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {partner.identity?.governmentIdStatus || 'NOT_SUBMITTED'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <DocumentPreview
                                        label="Government ID"
                                        url={partner.identity?.governmentIdDocumentUrl}
                                    />
                                    {serviceCertificateUrls.map((url, index) => (
                                        <DocumentPreview
                                            key={`${url}-${index}`}
                                            label={`Business Image / Certificate ${index + 1} of ${serviceCertificateUrls.length}`}
                                            url={url}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Business images / certificates uploaded: <span className="font-semibold text-gray-900">{serviceCertificateUrls.length}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Timeline */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Timeline</h3>

                            {partner.verification?.rejectionReason && (
                                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                                    <div className="flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-red-900 text-sm">Rejection Reason</p>
                                            <p className="text-red-800 text-sm mt-1">{partner.verification.rejectionReason}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                {partner.createdAt && (
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Created</p>
                                        <p className="text-sm text-gray-900">
                                            {new Date(partner.createdAt.toDate?.() || partner.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {partner.verification?.submittedAt && (
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Submitted for Review</p>
                                        <p className="text-sm text-gray-900">
                                            {new Date(
                                                partner.verification.submittedAt.toDate?.() ||
                                                partner.verification.submittedAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {partner.verification?.reviewedAt && (
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Reviewed</p>
                                        <p className="text-sm text-gray-900">
                                            {new Date(
                                                partner.verification.reviewedAt.toDate?.() || partner.verification.reviewedAt
                                            ).toLocaleString()}
                                        </p>
                                        {partner.verification?.reviewedBy && (
                                            <p className="text-xs text-gray-600 mt-1">By: {partner.verification.reviewedBy}</p>
                                        )}
                                    </div>
                                )}

                                {partner.updatedAt && (
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Last Updated</p>
                                        <p className="text-sm text-gray-900">
                                            {new Date(partner.updatedAt.toDate?.() || partner.updatedAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            {showApproveDialog && (
                <PartnerApprovalDialog
                    partnerId={partner.uid}
                    businessName={partner.business?.businessName || 'Partner'}
                    onClose={() => setShowApproveDialog(false)}
                    onSuccess={() => {
                        setShowApproveDialog(false);
                        setRefreshKey((currentKey) => currentKey + 1);
                    }}
                />
            )}

            {showRejectDialog && (
                <PartnerRejectionDialog
                    partnerId={partner.uid}
                    businessName={partner.business?.businessName || 'Partner'}
                    onClose={() => setShowRejectDialog(false)}
                    onSuccess={() => {
                        setShowRejectDialog(false);
                        setRefreshKey((currentKey) => currentKey + 1);
                    }}
                />
            )}
        </AdminLayout>
    );
}

interface DocumentPreviewProps {
    label: string;
    url?: string;
}

function DocumentPreview({ label, url }: DocumentPreviewProps) {
    const [imageError, setImageError] = useState(false);
    const isPdf = url?.toLowerCase().split('?')[0].endsWith('.pdf');

    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-semibold text-gray-700">{label}</p>
            </div>

            {url ? (
                <>
                    {isPdf ? (
                        <div className="mb-4 flex h-48 items-center justify-center rounded-lg border border-gray-200 bg-white">
                            <FileText className="h-12 w-12 text-red-500" />
                        </div>
                    ) : !imageError && (
                        <img
                            src={url}
                            alt={`${label} preview`}
                            loading="lazy"
                            onError={() => setImageError(true)}
                            className="mb-4 h-48 w-full rounded-lg border border-gray-200 bg-white object-contain"
                        />
                    )}
                    {imageError && (
                        <div className="mb-4 flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-4 text-center text-sm text-gray-500">
                            Preview unavailable. Open the document to view it.
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            <ExternalLink className="h-4 w-4" />
                            {isPdf ? 'View PDF' : 'Open Document'}
                        </a>
                        <a
                            href={url}
                            download
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </a>
                    </div>
                </>
            ) : (
                <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-4 text-center text-sm text-gray-500">
                    No document uploaded
                </div>
            )}
        </div>
    );
}

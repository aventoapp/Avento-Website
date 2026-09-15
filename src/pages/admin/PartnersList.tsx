import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Search, Users } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

interface Partner {
    uid: string;
    userId: string;
    business?: {
        businessName?: string;
        city?: string;
    };
    status: string;
    verification?: {
        status?: string;
        submittedAt?: any;
    };
    createdAt?: any;
    updatedAt?: any;
}

export default function PartnersList() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const statusFilter = searchParams.get('status') || 'ALL';

    const [partners, setPartners] = useState<Partner[]>([]);
    const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login');
            return;
        }

        const fetchPartners = async () => {
            try {
                const partnersRef = collection(db, 'partners');
                const snapshot = await getDocs(query(partnersRef, orderBy('createdAt', 'desc')));
                const data = snapshot.docs.map((doc) => ({
                    uid: doc.id,
                    ...doc.data(),
                    status: String(doc.data().status || '').toUpperCase(),
                } as Partner));

                setPartners(
                    statusFilter === 'ALL'
                        ? data
                        : data.filter((partner) => partner.status === statusFilter)
                );
            } catch (error) {
                console.error('Error fetching partners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, [isAdmin, navigate, statusFilter]);

    useEffect(() => {
        const filtered = partners.filter((partner) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                partner.business?.businessName?.toLowerCase().includes(searchLower) ||
                partner.business?.city?.toLowerCase().includes(searchLower) ||
                partner.uid.toLowerCase().includes(searchLower)
            );
        });
        setFilteredPartners(filtered);
    }, [searchTerm, partners]);

    const statusBadgeColor = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'SUBMITTED':
                return 'bg-blue-100 text-blue-800';
            case 'UNDER_REVIEW':
                return 'bg-purple-100 text-purple-800';
            case 'SUSPENDED':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
                    <p className="text-gray-600 mt-1">Manage partner applications and approvals</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-end justify-between mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by business name, city, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {['ALL', 'PENDING', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED'].map(
                            (status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        const params = new URLSearchParams();
                                        if (status !== 'ALL') {
                                            params.set('status', status);
                                        }
                                        navigate(`/admin/partners?${params.toString()}`);
                                    }}
                                    className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all text-sm ${statusFilter === status
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {status.replace('_', ' ')}
                                </button>
                            )
                        )}
                    </div>

                    {/* Table */}
                    {!loading ? (
                        filteredPartners.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="px-4 py-3 font-semibold text-gray-900 text-sm">Business</th>
                                            <th className="px-4 py-3 font-semibold text-gray-900 text-sm">City</th>
                                            <th className="px-4 py-3 font-semibold text-gray-900 text-sm">Status</th>
                                            <th className="px-4 py-3 font-semibold text-gray-900 text-sm">Submitted</th>
                                            <th className="px-4 py-3 font-semibold text-gray-900 text-sm">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPartners.map((partner) => (
                                            <tr
                                                key={partner.uid}
                                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-4 py-4 font-medium text-gray-900">
                                                    {partner.business?.businessName || 'Unnamed'}
                                                </td>
                                                <td className="px-4 py-4 text-gray-600">
                                                    {partner.business?.city || '-'}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColor(partner.status)}`}>
                                                        {partner.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-gray-600 text-sm">
                                                    {partner.createdAt
                                                        ? new Date(partner.createdAt.toDate?.() || partner.createdAt).toLocaleDateString()
                                                        : '-'}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <button
                                                        onClick={() => navigate(`/admin/partners/${partner.uid}`)}
                                                        className="px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm font-medium"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-600">No partners found</p>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Loading partners...</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

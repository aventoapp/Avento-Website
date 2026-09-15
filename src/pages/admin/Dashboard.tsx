import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { BarChart3, Users, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
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

export default function AdminDashboard() {
    const { isAdmin, adminData } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        suspended: 0,
    });
    const [recentPartners, setRecentPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const partnersRef = collection(db, 'partners');

                const recentQuery = query(
                    partnersRef,
                    orderBy('createdAt', 'desc'),
                    limit(5)
                );
                const recentDocs = await getDocs(recentQuery);
                const allPartners = recentDocs.docs.map((doc) => ({
                    uid: doc.id,
                    ...doc.data(),
                } as Partner));

                const allPartnerDocs = await getDocs(query(partnersRef));
                const statusCounts = allPartnerDocs.docs.reduce(
                    (counts, doc) => {
                        const status = String(doc.data().status || '').toUpperCase();
                        if (status in counts) {
                            counts[status as keyof typeof counts] += 1;
                        }
                        return counts;
                    },
                    { PENDING: 0, APPROVED: 0, REJECTED: 0, SUSPENDED: 0 }
                );

                setStats({
                    pending: statusCounts.PENDING,
                    approved: statusCounts.APPROVED,
                    rejected: statusCounts.REJECTED,
                    suspended: statusCounts.SUSPENDED,
                });

                setRecentPartners(
                    allPartners.map((partner) => ({
                        ...partner,
                        status: String(partner.status || '').toUpperCase(),
                    }))
                );
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [isAdmin, navigate]);

    const StatCard = ({ label, count, icon: Icon, color }: any) => (
        <div className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${color}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
                    <p className="text-4xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-3 rounded-xl ${color.replace('border-', 'bg-').replace('-700', '-100')}`}>
                    <Icon className="w-6 h-6 text-gray-700" />
                </div>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, {adminData?.email}</p>
                </div>

                {/* Stats Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            label="Pending Partners"
                            count={stats.pending}
                            icon={Clock}
                            color="border-yellow-700 bg-yellow-50"
                        />
                        <StatCard
                            label="Approved Partners"
                            count={stats.approved}
                            icon={CheckCircle}
                            color="border-green-700 bg-green-50"
                        />
                        <StatCard
                            label="Rejected Partners"
                            count={stats.rejected}
                            icon={XCircle}
                            color="border-red-700 bg-red-50"
                        />
                        <StatCard
                            label="Suspended Partners"
                            count={stats.suspended}
                            icon={AlertCircle}
                            color="border-orange-700 bg-orange-50"
                        />
                    </div>
                )}

                {/* Recent Applications */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
                        <button
                            onClick={() => navigate('/admin/partners')}
                            className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                        >
                            View All →
                        </button>
                    </div>

                    {recentPartners.length > 0 ? (
                        <div className="space-y-4">
                            {recentPartners.map((partner) => (
                                <div
                                    key={partner.uid}
                                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
                                    onClick={() => navigate(`/admin/partners/${partner.uid}`)}
                                >
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">
                                            {partner.business?.businessName || 'Unnamed Business'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {partner.business?.city || 'No city'} • ID: {partner.uid.substring(0, 8)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${partner.status === 'APPROVED'
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
                                        <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm font-medium">
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-600">No applications yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

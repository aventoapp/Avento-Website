import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, LogOut, Users, BarChart3, Settings } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setMobileMenuOpen] = useState(false);
    const { logout, isAdmin, adminData } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { label: 'Dashboard', path: '/admin', icon: BarChart3 },
        {
            label: 'Partners', path: '/admin/partners', icon: Users, subItems: [
                { label: 'All Partners', path: '/admin/partners' },
                { label: 'Pending', path: '/admin/partners?status=PENDING' },
                { label: 'Approved', path: '/admin/partners?status=APPROVED' },
                { label: 'Rejected', path: '/admin/partners?status=REJECTED' },
                { label: 'Suspended', path: '/admin/partners?status=SUSPENDED' },
            ]
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-900 to-purple-900 
          transform transition-transform duration-200 lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="h-full flex flex-col overflow-y-auto">
                    {/* Logo */}
                    <div className="p-6 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">A</span>
                            </div>
                            <div>
                                <h1 className="text-white text-lg font-bold">AVENTO</h1>
                                <p className="text-xs text-purple-300">Admin</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => (
                            <div key={item.path}>
                                <button
                                    onClick={() => {
                                        navigate(item.path);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive(item.path)
                                            ? 'bg-white/20 text-white'
                                            : 'text-purple-200 hover:text-white hover:bg-white/10'
                                        }
                  `}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            </div>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-purple-800">
                        <div className="mb-4 p-3 bg-white/10 rounded-lg">
                            <p className="text-xs text-purple-300 mb-1">Logged in as</p>
                            <p className="text-sm text-white font-medium truncate">{adminData?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between lg:justify-end">
                    <button
                        onClick={() => setMobileMenuOpen(!sidebarOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {sidebarOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Admin Portal</p>
                        <p className="text-xs text-gray-500">Role: {adminData?.role}</p>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 lg:p-8">{children}</div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
        </div>
    );
}

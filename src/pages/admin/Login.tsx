import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        console.log('🔐 Login attempt for:', email);

        try {
            console.log('📧 Calling signInWithEmailAndPassword...');
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log('✅ Firebase login successful!');
            console.log('👤 User UID:', result.user.uid);
            console.log('📧 User email:', result.user.email);

            // Auth context will verify admin status automatically
            // If admin, component will redirect; if not, user will be signed out
            console.log('⏳ Waiting 500ms before redirect...');
            setTimeout(() => {
                console.log('🚀 Redirecting to /admin');
                navigate('/admin');
            }, 500);
        } catch (err: any) {
            console.error('❌ Login error:', err);
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 flex items-center justify-center px-4">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="relative w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center mx-auto mb-6 border border-white/30">
                        <span className="text-white text-3xl font-bold">A</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">AVENTO</h1>
                    <p className="text-white/80 text-lg">Admin Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Login to Admin</h2>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-white/90 text-sm font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@aventoapp.in"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/30 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-white/90 text-sm font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:ring-2 focus:ring-white/30 outline-none transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-white/60 text-xs text-center mt-6">
                        Secure admin authentication via Firebase
                    </p>
                </div>
            </div>
        </div>
    );
}

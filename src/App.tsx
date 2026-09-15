import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AventoWebsite from '../AventoWebsite';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import PartnersList from './pages/admin/PartnersList';
import PartnerDetails from './pages/admin/PartnerDetails';

// Protected route component
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading, adminData } = useAuth();
  console.log('🛡️ ProtectedAdminRoute check - isLoading:', isLoading, 'isAdmin:', isAdmin);

  if (isLoading) {
    console.log('⏳ Still loading auth...');
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    console.log('❌ Not admin! Redirecting to login. adminData:', adminData);
    return <Navigate to="/admin/login" replace />;
  }

  console.log('✅ Admin confirmed! Rendering protected content. User:', adminData?.email);
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AventoWebsite />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <ProtectedAdminRoute>
                <PartnersList />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/partners/:partnerId"
            element={
              <ProtectedAdminRoute>
                <PartnerDetails />
              </ProtectedAdminRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

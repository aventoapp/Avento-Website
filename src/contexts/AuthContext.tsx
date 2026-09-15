import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AdminData {
    uid: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: any;
}

interface AuthContextType {
    currentUser: User | null;
    adminData: AdminData | null;
    isAdmin: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('🔐 onAuthStateChanged triggered. User:', user?.email);
            if (user) {
                setCurrentUser(user);
                console.log('✅ Firebase Auth User:', user.uid, user.email);

                // Check if user is an authorized admin
                try {
                    const adminDocRef = doc(db, 'admins', user.uid);
                    console.log('🔍 Checking admin doc at: admins/', user.uid);

                    const adminDoc = await getDoc(adminDocRef);
                    console.log('📄 Admin doc exists:', adminDoc.exists());

                    if (adminDoc.exists()) {
                        const admin = adminDoc.data() as AdminData;
                        console.log('📋 Admin data:', admin);
                        console.log('✔️ Admin active status:', admin.active);

                        if (admin.active) {
                            setAdminData(admin);
                            console.log('✅ Admin authorized! Setting admin data');
                        } else {
                            console.log('❌ Admin account is NOT active');
                            setAdminData(null);
                            await signOut(auth);
                        }
                    } else {
                        console.log('❌ Admin document NOT found in Firestore!');
                        console.log('📍 Expected at: admins/' + user.uid);
                        setAdminData(null);
                    }
                } catch (error) {
                    console.error('🚨 Error checking admin status:', error);
                    setAdminData(null);
                }
            } else {
                console.log('❌ No Firebase user');
                setCurrentUser(null);
                setAdminData(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
        setAdminData(null);
    };

    const value = {
        currentUser,
        adminData,
        isAdmin: !!adminData,
        isLoading,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

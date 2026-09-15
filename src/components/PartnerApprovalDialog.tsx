import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle, X } from 'lucide-react';

interface PartnerApprovalDialogProps {
    partnerId: string;
    businessName: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PartnerApprovalDialog({
    partnerId,
    businessName,
    onClose,
    onSuccess,
}: PartnerApprovalDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleApprove = async () => {
        setLoading(true);
        setError('');

        try {
            await updateDoc(doc(db, 'partners', partnerId), {
                status: 'APPROVED',
                'verification.status': 'VERIFIED',
            });
            setError('Partner approved successfully.');
            window.setTimeout(onSuccess, 900);
        } catch (err: any) {
            setError(err?.details || err?.message || 'Failed to approve partner');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Approve Partner</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to approve{' '}
                        <span className="font-bold text-gray-900">{businessName}</span>?
                    </p>
                    <p className="text-sm text-gray-600">
                        Once approved, this partner can become eligible to appear in the Avento customer app and
                        accept service requests.
                    </p>

                    {error && (
                        <div className={`p-3 rounded-lg border text-sm ${error === 'Partner approved successfully.'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            {error}
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                        ✓ Partner status will be set to APPROVED
                        <br />✓ Verification status will be set to VERIFIED
                        <br />✓ Action will be recorded in audit logs
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApprove}
                        disabled={loading}
                        className="flex-1 px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Approving...' : 'Approve'}
                    </button>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { XCircle, X } from 'lucide-react';

const rejectPartner = httpsCallable<
    { partnerUid: string; reason: string },
    { success: boolean }
>(functions, 'rejectPartner');

interface PartnerRejectionDialogProps {
    partnerId: string;
    businessName: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PartnerRejectionDialog({
    partnerId,
    businessName,
    onClose,
    onSuccess,
}: PartnerRejectionDialogProps) {
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleReject = async () => {
        if (!reason.trim()) {
            setError('Please provide a reason for rejection');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await rejectPartner({ partnerUid: partnerId, reason: reason.trim() });
            setError('Partner rejected successfully.');
            window.setTimeout(onSuccess, 900);
        } catch (err: any) {
            setError(err?.details || err?.message || 'Failed to reject partner');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Reject Partner</h2>
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
                        You are about to reject{' '}
                        <span className="font-bold text-gray-900">{businessName}</span>.
                    </p>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Reason for Rejection *
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Explain why this partner is being rejected. This message will be visible to the partner."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition-all resize-none"
                            rows={4}
                        />
                        <p className="text-xs text-gray-600 mt-1">
                            {reason.length} characters
                        </p>
                    </div>

                    {error && (
                        <div className={`p-3 rounded-lg border text-sm ${error === 'Partner rejected successfully.'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            {error}
                        </div>
                    )}

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                        ⚠️ Partner status will be set to REJECTED
                        <br />✓ Verification status will be set to REJECTED
                        <br />✓ Reason will be stored and visible to partner
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
                        onClick={handleReject}
                        disabled={loading || !reason.trim()}
                        className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Rejecting...' : 'Reject'}
                    </button>
                </div>
            </div>
        </div>
    );
}

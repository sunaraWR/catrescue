import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export default function Profile({ user, onUpdate, onBack }) {
    const [agentName, setAgentName] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatar, setAvatar] = useState(user?.avatar || '🐈');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Password change state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        try {
            await authAPI.updateProfile(user.id, { username: agentName, email, avatar });
            if (onUpdate) onUpdate({ ...user, username: agentName, email, avatar });
            setSuccessMessage('Identity updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Failed to update identity');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New passphrases do not match');
            return;
        }

        setPasswordLoading(true);
        try {
            await authAPI.changePassword(user.id, currentPassword, newPassword);
            setSuccessMessage('Clearance passphrase updated!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Unauthorized: Security update failed');
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full animate-fade-in p-8 space-y-8 overflow-y-auto hide-scrollbar">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-5xl font-black text-white tracking-widest game-title">AGENT PROFILE</h1>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">Identity & Security Management</p>
            </div>

            <div className="max-w-2xl mx-auto w-full space-y-8 pb-12">
                {/* Main Identity Card */}
                <div className="clean-card p-10 flex flex-col md:flex-row items-center gap-10 bg-indigo-500/5 border-indigo-500/20">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[2rem] bg-indigo-500/20 border-2 border-indigo-500/40 flex items-center justify-center text-6xl shadow-2xl group-hover:scale-105 transition-transform cursor-pointer" title="Switch Avatar">
                            {avatar}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-slate-950 flex items-center justify-center text-xs shadow-lg">
                            ✓
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Clearance</span>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                                {user?.missions_count > 20 ? 'Senior Rescuer' : user?.missions_count > 5 ? 'Elite Agent' : 'Field Operative'}
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                                <span className="block text-[8px] font-black text-indigo-400 uppercase">Missions</span>
                                <span className="font-bold text-white">{user?.missions_count || 0}</span>
                            </div>
                            <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                                <span className="block text-[8px] font-black text-indigo-400 uppercase">Avg Time</span>
                                <span className="font-bold text-white">{user?.avg_time || '0:00'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Status Banner */}
                {(successMessage || errorMessage) && (
                    <div className={`p-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest animate-bounce-short border ${successMessage ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                        {successMessage || errorMessage}
                    </div>
                )}

                {/* Settings Box */}
                <form onSubmit={handleUpdate} className="clean-card p-8 space-y-8 shadow-2xl relative">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-white">Identity Matrix</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Agent Alias</label>
                            <input
                                type="text"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 font-bold text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Secure Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 font-bold text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Identity Icon</label>
                            <div className="flex gap-3">
                                {['🐈', '🐱', '🦁', '🐯'].map(icon => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setAvatar(icon)}
                                        className={`w-12 h-12 rounded-lg bg-white/5 border flex items-center justify-center transition-all text-xl ${avatar === icon ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-white/10 hover:border-white/20'}`}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="shine-button w-full py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl disabled:opacity-50 hover:scale-[1.01] active:scale-95 transition-all"
                        >
                            {loading ? 'Synchronizing...' : 'Update Identity Matrix'}
                        </button>
                    </div>
                </form>

                {/* Security Section */}
                <form onSubmit={handlePasswordChange} className="clean-card p-8 space-y-6 shadow-2xl bg-rose-500/[0.02] border-rose-500/10">
                    <div className="flex items-center gap-3 border-b border-rose-500/10 pb-4 mb-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-white">Clearance Passphrase</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Current Passphrase</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 px-6 font-bold text-white focus:outline-none focus:border-rose-500 transition-all text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">New Passphrase</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 px-6 font-bold text-white focus:outline-none focus:border-rose-500 transition-all text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Verify New Passphrase</label>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/5 rounded-xl py-3.5 px-6 font-bold text-white focus:outline-none focus:border-rose-500 transition-all text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="w-full py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 hover:text-white transition-all disabled:opacity-50 active:scale-95"
                        >
                            {passwordLoading ? 'Verifying Clearance...' : 'Update Security Passphrase'}
                        </button>
                    </div>
                </form>

                {/* Navigation */}
                <div className="flex justify-center pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-black/60 transition-all"
                    >
                        <span className="text-lg">←</span> Return to Menu
                    </button>
                </div>
            </div>
        </div>
    );
}

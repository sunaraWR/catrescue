import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export default function Profile({ user, onUpdate, onBack }) {
    const [agentName, setAgentName] = useState(user?.username || '');
    const [avatar, setAvatar] = useState(user?.avatar || '🐈');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        try {
            await authAPI.updateProfile(user.id, { username: agentName, avatar });
            if (onUpdate) onUpdate({ ...user, username: agentName, avatar });
            setSuccessMessage('Identity updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Failed to update profile:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full animate-fade-in p-8 space-y-8 overflow-y-auto hide-scrollbar">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-5xl font-black text-white tracking-widest game-title">AGENT PROFILE</h1>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">Identity Management</p>
            </div>

            <div className="max-w-2xl mx-auto w-full space-y-6">
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

                {/* Settings Box */}
                <form onSubmit={handleUpdate} className="clean-card p-10 space-y-8 shadow-2xl">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Agent Alias</label>
                            <input
                                type="text"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 font-bold text-white focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Identity Icon</label>
                            <div className="flex gap-4">
                                {['🐈', '🐱', '🦁', '🐯'].map(icon => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setAvatar(icon)}
                                        className={`w-12 h-12 rounded-lg bg-white/5 border flex items-center justify-center transition-all ${avatar === icon ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 space-y-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="shine-button w-full py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl disabled:opacity-50"
                        >
                            {loading ? 'Synchronizing...' : 'Update Identity'}
                        </button>

                        {successMessage && (
                            <p className="text-emerald-400 text-center font-bold text-xs animate-bounce">{successMessage}</p>
                        )}
                    </div>
                </form>

                {/* Navigation */}
                <div className="flex justify-center pt-8">
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

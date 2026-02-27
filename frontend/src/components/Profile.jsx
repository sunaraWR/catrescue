import { useState } from 'react';

export default function Profile({ onBack }) {
    const [agentName, setAgentName] = useState('CatLover_01');
    const [successMessage, setSuccessMessage] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        setSuccessMessage('Identity updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
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
                        <div className="w-32 h-32 rounded-[2rem] bg-indigo-500/20 border-2 border-indigo-500/40 flex items-center justify-center text-6xl shadow-2xl group-hover:scale-105 transition-transform">
                            🐈
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-slate-950 flex items-center justify-center text-xs shadow-lg">
                            ✓
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Clearance</span>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Senior Rescuer</h2>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                                <span className="block text-[8px] font-black text-indigo-400 uppercase">Missions</span>
                                <span className="font-bold text-white">42</span>
                            </div>
                            <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                                <span className="block text-[8px] font-black text-indigo-400 uppercase">Avg Time</span>
                                <span className="font-bold text-white">3:45</span>
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
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Notification Systems</label>
                            <div className="flex gap-4">
                                <button type="button" className="flex-1 bg-indigo-500 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Email Alert ON</button>
                                <button type="button" className="flex-1 bg-white/5 border border-white/10 text-slate-400 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">Mobile Alert OFF</button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 space-y-4">
                        <button
                            type="submit"
                            className="shine-button w-full py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl"
                        >
                            Update Identity
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

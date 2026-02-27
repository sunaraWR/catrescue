import { useState } from 'react';
import { authAPI } from '../services/api';

export default function AuthCard({ onLogin }) {
    const [activeTab, setActiveTab] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const resetFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        resetFields();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (activeTab === 'signup') {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        setLoading(true);
        try {
            if (activeTab === 'login') {
                const res = await authAPI.login(username, password);
                if (onLogin) onLogin(res.data.user, res.data.token);
            } else {
                await authAPI.register(username, email, password);
                setActiveTab('login');
                resetFields();
                setError('Mission Credentials Created! Please Sign In.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] mx-auto">
            <div className="clean-card shadow-[0_0_60px_rgba(0,0,0,0.7)] animate-fade-in relative transition-all duration-500 overflow-hidden flex flex-col">
                {/* Fixed Tab Header */}
                <div className="flex border-b border-white/10 bg-white/5 rounded-t-[20px] shrink-0">
                    <button
                        onClick={() => handleTabChange('login')}
                        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'login'
                            ? 'text-white bg-indigo-500/25 border-b-2 border-indigo-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => handleTabChange('signup')}
                        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'signup'
                            ? 'text-white bg-indigo-500/25 border-b-2 border-indigo-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                            }`}
                    >
                        Register
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="p-7 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                    {/* Animated Content Wrapper */}
                    <div key={activeTab} className="animate-slide-up">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">
                                {activeTab === 'login' ? 'Mission Access' : 'New Agent'}
                            </h2>
                            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] opacity-60">
                                {activeTab === 'login'
                                    ? 'Authorize your rescue credentials'
                                    : 'Establish your agent identity'}
                            </p>
                        </div>

                        {error && (
                            <div className={`mb-5 p-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-center animate-bounce-short ${error.includes('Created') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                {error}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Agent Alias</label>
                                <input
                                    type="text"
                                    placeholder="@username"
                                    className="form-input py-3 text-xs"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            {activeTab === 'signup' && (
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure Email</label>
                                    <input
                                        type="email"
                                        placeholder="agent@rescue.hq"
                                        className="form-input py-3 text-xs"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Mission Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="form-input py-3 text-xs"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {activeTab === 'signup' && (
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Verify Passphrase</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="form-input py-3 text-xs"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="shine-button w-full mt-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all"
                                disabled={loading}
                            >
                                {loading ? 'Transmitting...' : (activeTab === 'login' ? 'Authorize' : 'Initialize Agent')}
                            </button>
                        </form>

                        <div className="mt-7 text-center border-t border-white/5 pt-5">
                            <button
                                onClick={() => handleTabChange(activeTab === 'login' ? 'signup' : 'login')}
                                className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                {activeTab === 'login'
                                    ? "New Agent? Create Profile"
                                    : "Existing Agent? Access HQ"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

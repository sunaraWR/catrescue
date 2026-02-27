import { useState } from 'react';
import { authAPI } from '../services/api';

export default function AuthCard({ onLogin }) {
    const [activeTab, setActiveTab] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (activeTab === 'login') {
                const res = await authAPI.login(username, password);
                if (onLogin) onLogin(res.data.user, res.data.token);
            } else {
                await authAPI.register(username, password);
                setActiveTab('login');
                setError('Registration successful! Please sign in.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] mx-auto animate-fade-in">
            <div className="clean-card overflow-hidden">
                {/* Tab Header */}
                <div className="flex border-b border-white/10 bg-white/5">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'login'
                            ? 'text-white border-b-2 border-indigo-500'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setActiveTab('signup')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'signup'
                            ? 'text-white border-b-2 border-indigo-500'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Register
                    </button>
                </div>

                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {activeTab === 'login'
                                ? 'Join our community of cat rescuers'
                                : 'Step into the world of cat rescue'}
                        </p>
                    </div>

                    {error && (
                        <div className={`mb-4 p-3 rounded text-xs font-bold text-center ${error.includes('successful') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-0.5">Agent Alias (Username)</label>
                            <input
                                type="text"
                                placeholder="@username"
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-0.5">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="primary-button w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (activeTab === 'login' ? 'Sign In' : 'Get Started')}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setActiveTab(activeTab === 'login' ? 'signup' : 'login');
                                setError('');
                            }}
                            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                            {activeTab === 'login'
                                ? "Don't have an account? Register"
                                : "Already have an account? Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

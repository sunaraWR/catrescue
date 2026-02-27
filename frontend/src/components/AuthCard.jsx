import { useState } from 'react';

export default function AuthCard({ onLogin }) {
    const [activeTab, setActiveTab] = useState('login');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onLogin) onLogin();
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

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-0.5">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-0.5">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="form-input"
                                required
                            />
                        </div>

                        {activeTab === 'signup' && (
                            <div className="space-y-1.5 animate-fade-in">
                                <label className="text-sm font-medium text-slate-300 ml-0.5">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Repeat your password"
                                    className="form-input"
                                    required
                                />
                            </div>
                        )}

                        <button type="submit" className="primary-button w-full mt-2">
                            {activeTab === 'login' ? 'Sign In' : 'Get Started'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
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

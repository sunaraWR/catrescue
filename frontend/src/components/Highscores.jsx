import { useState, useEffect } from 'react';
import { highscoresAPI } from '../services/api';

export default function Highscores({ user, onBack }) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await highscoresAPI.getTop();
                setScores(res.data);
            } catch (err) {
                console.error('Failed to fetch highscores:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchScores();
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-full w-full animate-fade-in p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-5xl font-black text-white tracking-widest game-title">LEADERBOARD</h1>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">Global Rescue Rankings</p>
            </div>

            {/* Highscores Table Box */}
            <div className="flex-1 max-w-4xl mx-auto w-full clean-card overflow-hidden flex flex-col border-white/5 shadow-2xl">
                <div className="bg-indigo-500/10 border-b border-white/5 grid grid-cols-4 p-5 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                    <div>Rank</div>
                    <div>Agent Name</div>
                    <div className="text-center">Max Level</div>
                    <div className="text-right">Total Time</div>
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    {loading ? (
                        <div className="h-full w-full flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest animate-pulse">
                            Accessing Secure Data...
                        </div>
                    ) : scores.length === 0 ? (
                        <div className="h-full w-full flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest">
                            No Missions Recorded Yet
                        </div>
                    ) : (
                        scores.map((score, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-4 p-5 border-b border-white/5 items-center transition-colors hover:bg-white/5 ${score.username === user?.username ? 'bg-indigo-500/5' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${index === 0 ? 'bg-amber-400 text-black' :
                                        index === 1 ? 'bg-slate-300 text-black' :
                                            index === 2 ? 'bg-amber-700 text-white' :
                                                'bg-white/5 text-slate-400'
                                        }`}>
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="font-bold text-white tracking-wide">
                                    {score.username}
                                    {score.username === user?.username && <span className="ml-2 text-[8px] px-1.5 py-0.5 rounded bg-indigo-500 text-white uppercase italic">You</span>}
                                </div>
                                <div className="text-center font-black text-indigo-400">L{score.level}</div>
                                <div className="text-right font-black text-white tabular-nums">{formatTime(score.total_time)}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Footer Controls */}
            <div className="flex justify-center pt-4 pb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-black/60 transition-all active:scale-95"
                >
                    <span className="text-lg">←</span> Return to Menu
                </button>
            </div>
        </div>
    );
}

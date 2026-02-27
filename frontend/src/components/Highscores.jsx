export default function Highscores({ onBack }) {
    const scores = [
        { rank: 1, name: 'Agent_Whiskers', level: 6, time: '02:45', date: '2024-02-27' },
        { rank: 2, name: 'CatLover_01', level: 6, time: '03:12', date: '2024-02-27' },
        { rank: 3, name: 'MeowMaster', level: 6, time: '03:45', date: '2024-02-26' },
        { rank: 4, name: 'ShadowPaws', level: 5, time: '04:20', date: '2024-02-25' },
        { rank: 5, name: 'PawsomeHero', level: 4, time: '05:10', date: '2024-02-27' },
    ];

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
                    {scores.map((score) => (
                        <div
                            key={score.rank}
                            className={`grid grid-cols-4 p-5 border-b border-white/5 items-center transition-colors hover:bg-white/5 ${score.name === 'CatLover_01' ? 'bg-indigo-500/5' : ''
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${score.rank === 1 ? 'bg-amber-400 text-black' :
                                        score.rank === 2 ? 'bg-slate-300 text-black' :
                                            score.rank === 3 ? 'bg-amber-700 text-white' :
                                                'bg-white/5 text-slate-400'
                                    }`}>
                                    {score.rank}
                                </span>
                            </div>
                            <div className="font-bold text-white tracking-wide">
                                {score.name}
                                {score.name === 'CatLover_01' && <span className="ml-2 text-[8px] px-1.5 py-0.5 rounded bg-indigo-500 text-white uppercase italic">You</span>}
                            </div>
                            <div className="text-center font-black text-indigo-400">L{score.level}</div>
                            <div className="text-right font-black text-white tabular-nums">{score.time}</div>
                        </div>
                    ))}
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

import { useState } from 'react';

export default function MainMenu({ onPlay, difficulty, onDifficultyChange }) {
    const [soundOn, setSoundOn] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full animate-fade-in space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-2">
                <h1 className="text-5xl lg:text-6xl font-black text-white tracking-widest game-title">
                    MAIN MENU
                </h1>
                <div className="text-4xl animate-bounce pt-2">🐈</div>
                <p className="text-indigo-300 font-bold uppercase tracking-[0.3em] text-sm pt-4">
                    Current Agent: <span className="text-white">CatLover_01</span>
                </p>
            </div>

            {/* Central Menu Box */}
            <div className="clean-card p-10 w-full max-w-lg space-y-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                {/* Difficulty Selector */}
                <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
                        Select Difficulty Level
                    </label>
                    <div className="flex p-1.5 bg-black/40 rounded-2xl border border-white/5">
                        {['easy', 'medium', 'hard'].map((level) => (
                            <button
                                key={level}
                                onClick={() => onDifficultyChange(level)}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${difficulty === level
                                        ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Action */}
                <button
                    onClick={onPlay}
                    className="shine-button w-full py-6 rounded-2xl text-xl font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95 transition-transform"
                >
                    Play Mission
                </button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="py-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                        Highscores
                    </button>
                    <button className="py-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                        Profile Update
                    </button>
                </div>

                {/* Sound Toggle */}
                <div className="flex items-center justify-center gap-4 pt-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Audio System</span>
                    <button
                        onClick={() => setSoundOn(!soundOn)}
                        className={`px-4 py-2 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${soundOn
                                ? 'border-indigo-500/50 text-indigo-400 bg-indigo-500/5'
                                : 'border-slate-700 text-slate-600 bg-transparent'
                            }`}
                    >
                        Sound: {soundOn ? 'ON' : 'OFF'}
                    </button>
                </div>
            </div>
        </div>
    );
}

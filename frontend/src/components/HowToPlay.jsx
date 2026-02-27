import { useState, useRef } from 'react';

export default function HowToPlay({ onBack, onStart }) {
    const [hasReadRules, setHasReadRules] = useState(false);
    const scrollRef = useRef(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setHasReadRules(true);
        }
    };

    const sections = [
        {
            id: '01',
            title: 'The Objective',
            content: 'Guide the cat through 6 magical levels of a maze. Solve math puzzles correctly to unlock doors and advance.'
        },
        {
            id: '02',
            title: 'Lives & Challenges',
            content: 'You have 7 shared lives for the entire game. You lose a life if you answer incorrectly or if the timer runs out.'
        },
        {
            id: '03',
            title: 'Difficulty Modes',
            content: 'The level of the math problems increases as you advance, while the time per puzzle depends on your mode:',
            extra: (
                <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-center">
                        <span className="block text-[10px] font-black text-emerald-400 uppercase">Easy</span>
                        <span className="text-white font-bold">50s</span>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-center">
                        <span className="block text-[10px] font-black text-amber-400 uppercase">Medium</span>
                        <span className="text-white font-bold">40s</span>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-center">
                        <span className="block text-[10px] font-black text-rose-400 uppercase">Hard</span>
                        <span className="text-white font-bold">30s</span>
                    </div>
                </div>
            )
        },
        {
            id: '04',
            title: 'Level Structure',
            content: 'Total of 12 puzzles:',
            extra: (
                <div className="mt-4 space-y-2 text-sm font-medium text-slate-400">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>L1 & L2</span>
                        <span className="text-indigo-400">1 puzzle each</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>L3 & L4</span>
                        <span className="text-indigo-400">2 chained puzzles</span>
                    </div>
                    <div className="flex justify-between">
                        <span>L5 & L6</span>
                        <span className="text-indigo-400">3 chained puzzles</span>
                    </div>
                </div>
            )
        },
        {
            id: '05',
            title: 'Leaderboard',
            content: 'Your Total Game Time determines your ranking. Solve puzzles fast to climb the ranks!'
        }
    ];

    return (
        <div className="flex flex-col h-full w-full animate-fade-in relative text-slate-200">

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-6 py-12 hide-scrollbar"
            >
                <div className="max-w-2xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-3 pb-4">
                        <h1 className="text-5xl font-black text-white tracking-widest game-title">HOW TO PLAY</h1>
                        <p className="text-slate-400 text-sm font-medium">Read the rules carefully before starting your rescue mission.</p>
                    </div>

                    {/* Instruction Blocks */}
                    <div className="space-y-4">
                        {sections.map((section) => (
                            <div key={section.id} className="clean-card p-6 flex gap-6 group hover:border-indigo-500/30 transition-colors">
                                <div className="text-3xl font-black text-indigo-500/40 group-hover:text-indigo-500 transition-colors">
                                    {section.id}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-lg font-black text-white uppercase tracking-wider">{section.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium">{section.content}</p>
                                    {section.extra}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Prompt */}
                    <div className="text-center pt-8 pb-32">
                        {!hasReadRules ? (
                            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                                Keep scrolling to unlock mission
                            </p>
                        ) : (
                            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
                                Rules acknowledged • System Ready
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Persistent Footer Controls */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-center z-20">
                <button
                    onClick={onBack}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-black/60 transition-all pointer-events-auto"
                >
                    <span className="text-lg">←</span> Main Menu
                </button>

                <div className={`transition-all duration-700 transform ${hasReadRules ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
                    <button
                        disabled={!hasReadRules}
                        onClick={onStart}
                        className="shine-button px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-transform pointer-events-auto"
                    >
                        Start Rescue
                    </button>
                </div>
            </div>

            {/* Gradient Mask for bottom scroll area */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-none z-10" />
        </div>
    );
}

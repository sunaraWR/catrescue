import { useState, useEffect, useCallback, useRef } from 'react';

const API_URL = 'https://marcconrad.com/uob/heart/api.php?out=json';

export default function Game({ difficulty, onGameEnd }) {
    // Game Configuration
    const MAX_LIVES = 7;
    const LEVELS = 6;
    const LEVEL_CONFIG = {
        1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3
    };
    const TIMER_VALS = {
        easy: 50, medium: 40, hard: 30
    };

    // State
    const [level, setLevel] = useState(1);
    const [puzzleIndex, setPuzzleIndex] = useState(1);
    const [lives, setLives] = useState(MAX_LIVES);
    const [totalTime, setTotalTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIMER_VALS[difficulty]);
    const [puzzle, setPuzzle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("The cat is searching for the way out...");
    const [inputValue, setInputValue] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const inputRef = useRef(null);

    // Fetch Puzzle
    const fetchPuzzle = useCallback(async () => {
        setLoading(true);
        setInputValue("");
        setMessage("The cat is searching for the way out...");
        try {
            const resp = await fetch(API_URL);
            const data = await resp.json();
            setPuzzle(data);
            setTimeLeft(TIMER_VALS[difficulty]);
            // Auto focus input
            setTimeout(() => inputRef.current?.focus(), 100);
        } catch (err) {
            setMessage("Connection error. Retrying...");
            setTimeout(fetchPuzzle, 2000);
        } finally {
            setLoading(false);
        }
    }, [difficulty]);

    // Initial Fetch
    useEffect(() => {
        fetchPuzzle();
    }, [fetchPuzzle]);

    // Total Timer
    useEffect(() => {
        if (gameOver || gameWon) return;
        const interval = setInterval(() => {
            setTotalTime(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [gameOver, gameWon]);

    // Puzzle Countdown
    useEffect(() => {
        if (gameOver || gameWon || loading) return;
        if (timeLeft <= 0) {
            handleWrong();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, gameOver, gameWon, loading]);

    const handleWrong = () => {
        if (lives <= 1) {
            setLives(0);
            setGameOver(true);
            setMessage("Game Over. The maze claims another...");
        } else {
            setLives(lives - 1);
            setMessage("Wrong answer! 😿 The path shifted.");
            fetchPuzzle();
        }
    };

    const handleCorrect = () => {
        const puzzlesInThisLevel = LEVEL_CONFIG[level];
        if (puzzleIndex < puzzlesInThisLevel) {
            setPuzzleIndex(puzzleIndex + 1);
            setMessage("Correct! Path cleared... 🐈");
            fetchPuzzle();
        } else {
            if (level < LEVELS) {
                setLevel(level + 1);
                setPuzzleIndex(1);
                setMessage(`Level ${level} Complete! Onward! 🏠`);
                fetchPuzzle();
            } else {
                setGameWon(true);
                setMessage("MISSION COMPLETE! The cat is safe! 🎉");
            }
        }
    };

    const validateInput = (val) => {
        if (loading || gameOver || gameWon || val === "") return;
        if (parseInt(val) === puzzle.solution) {
            handleCorrect();
        } else {
            handleWrong();
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            validateInput(inputValue);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (gameOver || gameWon) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full animate-fade-in text-center p-8 bg-slate-950/50">
                <div className="clean-card p-12 max-w-lg w-full space-y-8 border-indigo-500/20 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    <h1 className={`text-6xl font-black tracking-tighter ${gameWon ? 'text-emerald-400 glow-text' : 'text-rose-500'}`}>
                        {gameWon ? 'VICTORY' : 'DEFEAT'}
                    </h1>
                    <div className="text-8xl py-4 animate-bounce">{gameWon ? '🎉🐈' : '😿'}</div>
                    <p className="text-slate-300 font-medium text-lg leading-relaxed">{message}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Total Time</span>
                            <span className="text-2xl font-black text-white">{formatTime(totalTime)}</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Level</span>
                            <span className="text-2xl font-black text-white">{level}/6</span>
                        </div>
                    </div>
                    <button
                        onClick={onGameEnd}
                        className="shine-button w-full py-5 rounded-2xl text-lg font-black uppercase tracking-[0.2em]"
                    >
                        Return to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full animate-fade-in p-6 lg:p-8 space-y-6">

            {/* Stats Header - 3 Main Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Box 1: Lives */}
                <div className="clean-card p-6 flex flex-col items-center justify-center border-rose-500/20 bg-rose-500/5 group hover:border-rose-500 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400 mb-2">Lives Remaining</span>
                    <div className="text-5xl font-black text-rose-500 animate-pulse">{lives}</div>
                </div>

                {/* Box 2: Progress */}
                <div className="clean-card p-6 grid grid-cols-2 gap-4 border-indigo-500/20 bg-indigo-500/5">
                    <div className="text-center">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">Level</span>
                        <span className="text-2xl font-black text-white">{level} / 6</span>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">Puzzle</span>
                        <span className="text-2xl font-black text-white">{puzzleIndex} / {LEVEL_CONFIG[level]}</span>
                    </div>
                </div>

                {/* Box 3: Runtime Info */}
                <div className="clean-card p-6 grid grid-cols-2 gap-4 border-amber-500/20 bg-amber-500/5">
                    <div className="text-center">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 mb-1">Total Time</span>
                        <span className="text-2xl font-black text-white tabular-nums">{formatTime(totalTime)}</span>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 mb-1">Mode</span>
                        <span className="text-2xl font-black text-white uppercase tracking-tighter">{difficulty}</span>
                    </div>
                </div>

            </div>

            {/* Main Game Interface */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">

                {/* Left: Rescue Animation Represent Box */}
                <div className="lg:w-1/3 clean-card p-8 flex flex-col items-center justify-center text-center space-y-10 border-indigo-500/10">
                    <div className="relative w-full h-48 bg-black/40 rounded-[2rem] border border-white/5 flex items-center justify-center overflow-hidden">
                        {/* Path Line */}
                        <div className="absolute w-[80%] h-1 bg-white/5 top-1/2 -translate-y-1/2 z-0" />

                        {/* Cat representation */}
                        <div
                            className="text-6xl transition-all duration-1000 ease-in-out z-10"
                            style={{
                                transform: `translateX(${((level - 1) * 15 + puzzleIndex * 10) - 50}%)`,
                                position: 'absolute'
                            }}
                        >
                            🐈
                        </div>

                        {/* House representation */}
                        <div className="absolute right-12 text-6xl z-10 bottom-1/2 translate-y-1/2">
                            🏠
                        </div>

                        {/* Animated indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-indigo-500/50 uppercase tracking-[0.5em] animate-pulse">
                            Rescue in Progress
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="inline-flex px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-black uppercase tracking-[0.2em] text-indigo-400 glow-text">
                            MISSION STATUS
                        </div>
                        <p className="text-slate-300 font-bold text-lg leading-relaxed italic">
                            "{message}"
                        </p>
                    </div>
                </div>

                {/* Right: API Game Box */}
                <div className="flex-1 clean-card p-8 flex flex-col space-y-6 overflow-hidden bg-slate-900/40 border-indigo-500/10">

                    {/* Top Bar: Timer & Status */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Objective</span>
                            <h2 className="text-lg font-black text-white uppercase tracking-tighter">Identify the Solution</h2>
                        </div>
                        <div className={`px-5 py-2 rounded-2xl border flex items-center gap-3 transition-colors ${timeLeft < 10 ? 'border-rose-500 bg-rose-500/10' : 'border-indigo-500/30 bg-black/40'}`}>
                            <span className="text-xl">⏱️</span>
                            <span className={`text-2xl font-black tabular-nums ${timeLeft < 10 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                                {timeLeft}s
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-0">
                        {/* Larger Puzzle Image Display (Takes most space) */}
                        <div className="relative flex-[4] w-full bg-black/80 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center text-xs">🐈</div>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={puzzle?.question}
                                    alt="Heart Game Puzzle"
                                    className="w-full h-full object-contain p-8 animate-fade-in"
                                />
                            )}
                        </div>

                        {/* Answer Input Box - Smaller and compact */}
                        <div className="w-full max-w-[280px] space-y-2 mt-2">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 text-center opacity-80">
                                    GIVE YOUR ANSWER
                                </span>
                                <div className="relative w-full group">
                                    <input
                                        ref={inputRef}
                                        type="number"
                                        min="0"
                                        max="9"
                                        value={inputValue}
                                        onKeyDown={handleInputKeyDown}
                                        onChange={(e) => {
                                            const val = e.target.value.slice(-1);
                                            setInputValue(val);
                                            if (val !== "") {
                                                setTimeout(() => validateInput(val), 200);
                                            }
                                        }}
                                        placeholder="?"
                                        className="w-full bg-black/60 border-2 border-white/10 rounded-2xl py-3 text-center text-3xl font-black text-indigo-400 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/5"
                                    />
                                    <div className="absolute inset-x-0 -bottom-1 h-1 bg-indigo-500 rounded-full blur-sm opacity-0 group-focus-within:opacity-40 transition-opacity" />
                                </div>
                            </div>

                            <p className="text-[8px] text-slate-500 font-medium italic text-center uppercase tracking-widest">
                                Type 0-9 to Rescue
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

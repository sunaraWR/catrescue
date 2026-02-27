import { useState } from 'react';
import AuthCard from './components/AuthCard';
import Home from './components/Home';
import MainMenu from './components/MainMenu';
import HowToPlay from './components/HowToPlay';
import Game from './components/Game';
import bgImage from './assets/bg.png';
import logo from './assets/logo.png';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'home', 'menu', 'instructions', 'game'
  const [difficulty, setDifficulty] = useState('medium');

  return (
    <div className="relative h-screen w-screen overflow-hidden text-slate-200">
      {/* Immersive Background Layers */}
      <div
        className="web-background"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="web-overlay" />

      {/* Top Bar - Persistent Gaming Style */}
      <nav className="absolute top-0 left-0 w-full h-16 bg-black/60 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <img src={logo} alt="Mini Logo" className="w-8 h-8 animate-pulse" />
          <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
            Cat<span className="text-indigo-400">Rescue</span> Maze
          </span>
        </div>
        <div className="flex gap-6 items-center">
          {view === 'landing' ? (
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Awaiting Identity...</span>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <span className="text-xs font-bold text-indigo-300">CR</span>
              </div>
              <button
                onClick={() => setView('landing')}
                className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Multi-View Content Orchestrator */}
      <main className="relative z-10 h-full w-full pt-16">
        {view === 'landing' && (
          <div className="h-full w-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24">
            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">System Online</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4 lowercase">
                  save<span className="text-indigo-400">them</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-400 font-medium mb-8 leading-snug">
                  The ultimate math puzzle adventure. <br />
                  Become the hero they deserve.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto flex items-center justify-center">
              <AuthCard onLogin={() => setView('home')} />
            </div>
          </div>
        )}

        {view === 'home' && (
          <Home onEnterMaze={() => setView('menu')} />
        )}

        {view === 'menu' && (
          <MainMenu
            onPlay={() => setView('instructions')}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />
        )}

        {view === 'instructions' && (
          <HowToPlay
            onBack={() => setView('menu')}
            onStart={() => setView('game')}
          />
        )}

        {view === 'game' && (
          <Game
            difficulty={difficulty}
            onGameEnd={() => setView('menu')}
          />
        )}
      </main>
    </div>
  );
}

export default App;


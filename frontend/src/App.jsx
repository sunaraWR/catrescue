import { useState, useEffect, useRef } from 'react';
import AuthCard from './components/AuthCard';
import Home from './components/Home';
import MainMenu from './components/MainMenu';
import HowToPlay from './components/HowToPlay';
import Game from './components/Game';
import Highscores from './components/Highscores';
import Profile from './components/Profile';
import bgImage from './assets/bg.png';
import logo from './assets/logo.png';
import { highscoresAPI } from './services/api';

// Reliable direct MP3 link
const BGM_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

function App() {
  const [view, setView] = useState('landing');
  const [difficulty, setDifficulty] = useState('medium');
  const [user, setUser] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audioRef = useRef(null);

  // Background Music Logic using standard HTML5 Audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (audioUnlocked && soundEnabled && view !== 'landing' && view !== 'game') {
        audioRef.current.play().catch(e => console.log("BGM Play blocked:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [view, soundEnabled, audioUnlocked]);

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cat_rescue_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleStartMission = () => {
    setAudioUnlocked(true);
    setView('home');
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('cat_rescue_user', JSON.stringify(userData));
    localStorage.setItem('cat_rescue_token', token);
    setAudioUnlocked(true);
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cat_rescue_user');
    localStorage.removeItem('cat_rescue_token');
    setAudioUnlocked(false);
    setView('landing');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('cat_rescue_user', JSON.stringify(updatedUser));
  };

  const handleGameEnd = async (stats) => {
    if (user && stats?.won) {
      try {
        await highscoresAPI.save({
          username: user.username,
          level: stats.level,
          total_time: stats.totalTime
        });
      } catch (err) {
        console.error('Failed to save highscore:', err);
      }
    }
    setView('menu');
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-slate-200" onClick={() => !audioUnlocked && setAudioUnlocked(true)}>
      {/* Hidden Global Audio Element */}
      <audio ref={audioRef} src={BGM_URL} loop />

      {/* Immersive Background Layers */}
      <div
        className="web-background"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="web-overlay" />

      {/* Top Bar - Persistent Gaming Style */}
      <nav className="absolute top-0 left-0 w-full h-16 bg-black/60 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => user && setView('home')}>
          <img src={logo} alt="Mini Logo" className="w-8 h-8 animate-pulse" />
          <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
            Cat<span className="text-indigo-400">Rescue</span> Maze
          </span>
        </div>
        <div className="flex gap-6 items-center">
          {user && (
            <div className="flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Audio Status</span>
              <span className={audioUnlocked ? "text-emerald-400 text-[10px]" : "text-rose-500 text-[10px]"}>
                {audioUnlocked ? "● SYNCED" : "○ OFFLINE"}
              </span>
            </div>
          )}
          {!user ? (
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Awaiting Identity...</span>
          ) : (
            <div className="flex items-center gap-4">
              <div
                onClick={() => setView('profile')}
                className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center cursor-pointer hover:bg-indigo-500/40 transition-all hover:scale-110 active:scale-95 group"
                title="View Profile"
              >
                <span className="text-xs font-bold text-indigo-300 group-hover:text-white transition-colors">
                  {user.avatar || 'CR'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="relative z-10 h-full w-full pt-16">
        {view === 'landing' && (
          <div className="h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-8 lg:px-24 py-8 gap-12">
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

                {user && (
                  <button
                    onClick={handleStartMission}
                    className="shine-button px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl animate-bounce"
                  >
                    Continue Mission: {user.username}
                  </button>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto flex items-center justify-center">
              {!user && <AuthCard onLogin={handleLogin} />}
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
            onShowHighscores={() => setView('highscores')}
            onShowProfile={() => setView('profile')}
            username={user?.username}
            soundOn={soundEnabled}
            setSoundOn={setSoundEnabled}
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
            onGameEnd={handleGameEnd}
            soundEnabled={soundEnabled}
          />
        )}

        {view === 'highscores' && (
          <Highscores user={user} onBack={() => setView('menu')} />
        )}

        {view === 'profile' && (
          <Profile user={user} onUpdate={handleUpdateUser} onBack={() => setView('menu')} />
        )}
      </main>
    </div>
  );
}

export default App;

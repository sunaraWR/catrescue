import AuthCard from './components/AuthCard';
import bgImage from './assets/bg.png';
import logo from './assets/logo.png';

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden text-slate-200">
      {/* Immersive Background Layers */}
      <div
        className="web-background"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="web-overlay" />

      {/* Main Content Wrapper - Limited to 100vh */}
      <main className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24">

        {/* Hero Section - Optimized Vertical Space */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl py-8 lg:py-0">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">v1.0 Protocol</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img src={logo} alt="Logo" className="w-16 h-16 drop-shadow-2xl animate-float" />
              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter lowercase">
                cat<span className="text-indigo-400">rescue</span>
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-slate-400 font-medium mb-8 leading-snug">
              Guiding kittens through stellar mazes. <br />
              Precision puzzles. Celestial rewards.
            </p>

            <div className="flex gap-10 items-center">
              <div>
                <span className="block text-2xl font-bold text-white">06</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Sectors</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="block text-2xl font-bold text-white">∞</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Meows</span>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Section - Perfectly Centered in Viewport */}
        <div className="flex-shrink-0 w-full lg:w-auto flex items-center justify-center py-8 lg:py-0">
          <AuthCard />
        </div>

      </main>

      {/* Floating UI Elements */}
      <div className="absolute bottom-8 left-8 flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
        <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
        <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
      </div>
    </div>
  );
}

export default App;

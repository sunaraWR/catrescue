import logo from '../assets/cat.png';

export default function Home({ onEnterMaze }) {
    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center animate-fade-in">
            {/* Immersive Center Content */}
            <div className="flex flex-col items-center text-center space-y-6 max-w-4xl px-4">

                {/* Animated Cat Logo */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full animate-pulse" />
                    <img
                        src={logo}
                        alt="Hero Cat"
                        className="w-48 h-48 lg:w-64 lg:h-64 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)] animate-pulse-soft relative z-10"
                    />
                </div>

                {/* Game Title Section */}
                <div className="space-y-2">
                    <h1 className="text-6xl lg:text-8xl font-black text-white game-title tracking-tighter">
                        CAT <span className="text-indigo-400">RESCUE</span>
                    </h1>
                    <h2 className="text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 maze-highlight tracking-[0.2em]">
                        MAZE
                    </h2>
                    <p className="text-xl lg:text-2xl text-indigo-300/80 font-bold italic tracking-wide mt-4 uppercase">
                        A Magical Math Adventure
                    </p>
                </div>

                {/* Action Area */}
                <div className="pt-10">
                    <button
                        onClick={onEnterMaze}
                        className="shine-button px-12 py-5 rounded-2xl text-xl font-black uppercase tracking-[0.2em] transform transition-all active:scale-95 group"
                    >
                        <span className="relative z-10">Enter the Maze</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>

            </div>


        </div>
    );
}

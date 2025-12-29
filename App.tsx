import React, { useState, useEffect } from 'react';
import { createSolvedCube, invertAlgorithm, processAlgorithm } from './services/cubeLogic';
import { FORMULAS } from './constants';
import Cube2D from './components/Cube2D'; // Import 2D Cube
import Timer from './components/Timer';
import { Formula } from './types';

// Get unique categories and preserve order
const CATEGORIES = Array.from(new Set(FORMULAS.map(f => f.category)));

const App: React.FC = () => {
  const [selectedFormula, setSelectedFormula] = useState<Formula>(FORMULAS[0]);
  const [cubies, setCubies] = useState(createSolvedCube());
  const [activeTab, setActiveTab] = useState<'learn' | 'timer'>('learn');
  const [openCategories, setOpenCategories] = useState<string[]>([]); // Default all collapsed
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle category collapse
  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Update cube when formula changes
  useEffect(() => {
    // If empty algorithm, show solved
    if (!selectedFormula.algorithm) {
      setCubies(createSolvedCube());
      return;
    }

    // We want to show the state *before* the algorithm is executed.
    // Apply INVERSE of algorithm to a solved cube.
    // This creates the "Case" that needs solving.
    const setupMoves = invertAlgorithm(selectedFormula.algorithm);
    const solved = createSolvedCube();
    const setupStr = setupMoves.join(' ');
    const newCubies = processAlgorithm(solved, setupStr);
    setCubies(newCubies);
  }, [selectedFormula]);

  return (
    <div className="min-h-screen bg-[#050510] text-slate-100 flex flex-col md:flex-row overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 bg-[#0B0C15]/90 border-r border-white/5 flex flex-col h-[40vh] md:h-screen z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        
        {/* Cool Cyberpunk Header */}
        <div className="relative p-8 border-b border-white/5 overflow-hidden group select-none">
          {/* Background Rotating Glow Effect */}
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,211,238,0.1)_180deg,transparent_360deg)] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[#0B0C15]/90 backdrop-blur-sm"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col">
            {/* Decorative Glint Bar */}
            <div className="w-8 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] mb-3 rounded-full animate-pulse"></div>

            <h1 className="text-5xl font-black italic tracking-tighter leading-[0.8] text-white transform -skew-x-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                CUBE
              </span>
              <span className="block text-2xl tracking-[0.38em] text-slate-600 group-hover:text-white transition-colors duration-500 ml-1 mt-1 font-bold mix-blend-screen">
                MASTER
              </span>
            </h1>

            <div className="mt-5 flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              <div className="px-1.5 py-0.5 rounded border border-cyan-500/40 bg-cyan-900/20 text-[9px] text-cyan-300 font-mono tracking-widest uppercase shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                SYS.V2
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            </div>
          </div>
        </div>

        <nav className="flex md:flex-col border-b md:border-b-0 border-white/5">
           <button 
             onClick={() => setActiveTab('learn')}
             className={`flex-1 p-4 text-xs font-bold uppercase tracking-widest transition-all relative overflow-hidden ${activeTab === 'learn' ? 'bg-white/5 text-cyan-400' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}
           >
             {activeTab === 'learn' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>}
             Algorithms
           </button>
           <button 
             onClick={() => setActiveTab('timer')}
             className={`flex-1 p-4 text-xs font-bold uppercase tracking-widest transition-all relative overflow-hidden ${activeTab === 'timer' ? 'bg-white/5 text-purple-400' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}
           >
             {activeTab === 'timer' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.8)]"></div>}
             Pro Timer
           </button>
        </nav>

        {activeTab === 'learn' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
            {CATEGORIES.map(cat => {
              const isOpen = openCategories.includes(cat);
              const formulas = FORMULAS.filter(f => f.category === cat);
              return (
                <div key={cat} className="border-b border-white/5">
                  <button 
                    onClick={() => toggleCategory(cat)}
                    className="w-full sticky top-0 bg-[#0B0C15]/95 backdrop-blur z-10 px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <span>{cat}</span>
                    <span className={`transform transition-transform duration-300 text-cyan-500/50 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-2 space-y-1 bg-black/20">
                      {formulas.map(f => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFormula(f)}
                          className={`w-full text-left px-5 py-3 border-l-2 transition-all duration-200 group relative ${selectedFormula.id === f.id ? 'bg-gradient-to-r from-cyan-500/10 to-transparent border-cyan-400' : 'border-transparent hover:bg-white/5 hover:border-slate-700'}`}
                        >
                          <div className={`font-bold text-sm transition-colors ${selectedFormula.id === f.id ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
                            {f.name}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 font-mono truncate opacity-60 group-hover:opacity-90">
                            {f.algorithm || "(Intuitive Step)"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </aside>

      {/* Main Stage */}
      <main className="flex-1 relative flex flex-col h-[60vh] md:h-screen overflow-hidden bg-[#050510]">
        
        {/* Fullscreen Button */}
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white backdrop-blur-md border border-white/10 transition-all shadow-lg group"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? (
             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.207l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.207 10H10v4zm4-4h4.793l-2.147-2.146a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L18.793 14H14v-4z" /></svg>
          ) : (
             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          )}
        </button>

        {activeTab === 'learn' ? (
          <>
            <div className="flex-1 relative bg-[radial-gradient(circle_at_50%_50%,_rgba(20,30,50,1)_0%,_rgba(5,5,16,1)_100%)]">
              
              {/* Sci-Fi Grid Background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                }}
              ></div>
              
              {/* 2D Cube Diagram (Replaces 3D) */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pb-32 md:pb-0">
                 {/* Glow behind cube */}
                 <div className="absolute w-[300px] h-[300px] bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                 
                 {/* 2D Component */}
                 <div className="transform scale-110 md:scale-150 transition-transform duration-500">
                    <Cube2D cubies={cubies} />
                 </div>
              </div>

              {/* Bottom Info Card */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:min-w-[600px] max-w-5xl z-10">
                <div className="relative bg-[#0B0C15]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden">
                   {/* Decorative top line */}
                   <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                   
                   <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                      <div className="flex-1 text-center md:text-left min-w-0">
                        <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 bg-cyan-900/30 rounded border border-cyan-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)] animate-pulse"></span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 whitespace-nowrap">
                            {selectedFormula.category}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                          {selectedFormula.name}
                        </h2>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                          {selectedFormula.description}
                        </p>
                      </div>

                      {selectedFormula.algorithm && (
                        <div className="relative w-full md:w-auto group">
                          <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl opacity-30 group-hover:opacity-60 blur transition duration-500"></div>
                          <div className="relative bg-[#0F111A] border border-white/10 px-4 py-4 md:px-6 rounded-xl flex flex-col items-center justify-center md:max-w-md lg:max-w-lg">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Algorithm</span>
                            <code className="font-mono text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 tracking-wide text-center whitespace-pre-wrap break-words w-full">
                              {selectedFormula.algorithm}
                            </code>
                          </div>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 bg-[#050510] flex flex-col relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
             
             {/* Timer Content - Flex Column Layout */}
             <div className="relative z-10 w-full h-full flex flex-col">
                <div className="text-center pt-8 pb-4 shrink-0">
                   <h2 className="text-3xl md:text-5xl font-black text-white/10 tracking-tighter mb-1 select-none">PRO TIMER</h2>
                   <p className="text-purple-400/60 font-mono text-[10px] tracking-[0.2em]">PRECISION CHRONOMETER</p>
                </div>
                
                {/* Timer Component stretches to fill space */}
                <div className="flex-1 flex flex-col min-h-0">
                  <Timer />
                </div>
             </div>
          </div>
        )}
      </main>

    </div>
  );
};

export default App;
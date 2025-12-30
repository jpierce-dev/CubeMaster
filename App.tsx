import React, { useState, useEffect, useMemo } from 'react';
import { createSolvedCube, invertAlgorithm, processAlgorithm } from './services/cubeLogic';
import { FORMULAS } from './constants';
import Cube2D from './components/Cube2D'; // Import 2D Cube
import Timer from './components/Timer';
import { Formula, Cubie, Face, CubeColor } from './types';

// Get unique categories and preserve order
const CATEGORIES = Array.from(new Set(FORMULAS.map(f => f.category)));

// Helper to determine if we should mask non-yellow colors
const getVisualCubies = (originalCubies: Cubie[], formula: Formula): Cubie[] => {
  const isOLL = formula.category.includes('OLL');
  const isPLL = formula.category.includes('PLL');

  if (!isOLL && !isPLL) return originalCubies;

  return originalCubies.map(c => {
    // We only care about the top layer (y=1) visual effects
    if (c.y !== 1) return c;

    const isCorner = Math.abs(c.x) === 1 && Math.abs(c.z) === 1;
    const isEdge = !isCorner && (c.x !== 0 || c.z !== 0);
    const newColors = { ...c.colors };

    (Object.keys(newColors) as Face[]).forEach(face => {
      const color = newColors[face];

      if (isOLL) {
        // Step 1 OLL: edges only (gray out corners top/side)
        const isEdgeStep = ['oll-dot', 'oll-l-shape', 'oll-line'].includes(formula.id);
        if (isEdgeStep && isCorner) {
          newColors[face] = '#374151' as CubeColor; // Gray-700
          return;
        }

        // General OLL Masking: Keep yellow, gray out others
        if (color !== CubeColor.Yellow) {
          newColors[face] = '#374151' as CubeColor;
        }
      } else if (isPLL) {
        // PLL Step 1 (Corners): Mask side stickers of edge pieces
        // This highlights corner recognition (Headlights vs No Headlights)
        const isCornerStep = ['pll-diagonal', 'pll-headlights'].includes(formula.id);
        if (isCornerStep && isEdge && face !== Face.U) {
          newColors[face] = '#374151' as CubeColor;
        }
      }
    });

    return { ...c, colors: newColors };
  });
};

// Helper component for the icon only
const FormulaIcon: React.FC<{ formula: Formula }> = ({ formula }) => {
  const cubies = useMemo(() => {
    if (!formula.algorithm) return createSolvedCube();
    const setupMoves = invertAlgorithm(formula.algorithm);
    const solved = createSolvedCube();
    const setupStr = setupMoves.join(' ');
    const rawState = processAlgorithm(solved, setupStr);
    return getVisualCubies(rawState, formula);
  }, [formula.algorithm, formula.id, formula.category]);

  return (
    <div className="w-12 h-12 flex items-center justify-center shrink-0 mr-2">
      <Cube2D cubies={cubies} cellSize={8} />
    </div>
  );
};

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

    // Apply the same visualization logic (masking) as the icons
    const visualCubies = getVisualCubies(newCubies, selectedFormula);

    setCubies(visualCubies);
  }, [selectedFormula]);

  return (
    <div className="min-h-screen bg-[#050510] text-slate-100 flex flex-col md:flex-row overflow-hidden font-sans selection:bg-cyan-500/30">

      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 bg-[#0B0C15]/90 border-r border-white/5 flex flex-col h-[40vh] md:h-screen z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] backdrop-blur-xl">

        {/* Cool Cyberpunk Header */}
        <div className="relative p-6 md:p-8 border-b border-white/5 overflow-hidden group select-none">
          {/* Background Rotating Glow Effect & Grid */}
          <div className="absolute inset-0 bg-[#0B0C15]/90 z-0"></div>
          <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,211,238,0.05)_180deg,transparent_360deg)] animate-[spin_10s_linear_infinite] opacity-50 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end">
            {/* Top Status Bar */}
            <div className="flex justify-between items-center mb-4 opacity-70">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)] animate-ping"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              </div>
              <div className="text-[9px] font-mono text-cyan-500/80 tracking-widest uppercase">
                SYS.ONLINE
              </div>
            </div>

            <h1 className="relative text-6xl md:text-7xl font-black italic tracking-tighter leading-[0.8] text-white transform -skew-x-12 mix-blend-screen">
              {/* Main Text Layer */}
              <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                CUBE
              </div>

              {/* Glitch Layers (Static visual trickery) */}
              <div className="absolute top-0 left-0.5 z-0 text-red-500 opacity-40 mix-blend-lighten animate-pulse" style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-2px, 0)' }}>
                CUBE
              </div>
              <div className="absolute top-0 -left-0.5 z-0 text-cyan-300 opacity-40 mix-blend-lighten animate-pulse" style={{ animationDuration: '0.2s', clipPath: 'inset(40% 0 10% 0)', transform: 'translate(2px, 0)' }}>
                CUBE
              </div>

              <div className="flex items-center gap-3 mt-1 ml-1">
                <span className="text-2xl tracking-[0.4em] text-slate-500 group-hover:text-white transition-colors duration-300 font-bold">
                  MASTER
                </span>
                <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 to-transparent mt-1"></div>
              </div>
            </h1>

            {/* Bottom Tech Bits */}
            <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-slate-600">
              <div className="flex gap-4">
                <span>CPU: <span className="text-cyan-500">12%</span></span>
                <span>MEM: <span className="text-cyan-500">4GB</span></span>
              </div>
              <div className="px-2 py-0.5 bg-cyan-900/10 border border-cyan-500/20 text-cyan-400 rounded text-[9px]">
                V2.4.0
              </div>
            </div>
          </div>
        </div>

        <nav className="flex md:flex-col border-b md:border-b-0 border-white/5">
          <button
            onClick={() => setActiveTab('learn')}
            className={`group flex-1 p-5 text-xs font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden text-left flex items-center gap-3
              ${activeTab === 'learn' ? 'bg-white/5 text-cyan-400' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}
          >
            {activeTab === 'learn' && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent"></div>
              </>
            )}
            <span className={`text-lg ${activeTab === 'learn' ? 'opacity-100' : 'opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300'}`}>▦</span>
            Algorithms
          </button>

          <button
            onClick={() => setActiveTab('timer')}
            className={`group flex-1 p-5 text-xs font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden text-left flex items-center gap-3
              ${activeTab === 'timer' ? 'bg-white/5 text-purple-400' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}
          >
            {activeTab === 'timer' && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.8)]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
              </>
            )}
            <span className={`text-lg ${activeTab === 'timer' ? 'opacity-100' : 'opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300'}`}>◷</span>
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

                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-2 space-y-1 bg-black/20">
                      {formulas.map(f => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFormula(f)}
                          className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-200 group relative flex items-center gap-3 ${selectedFormula.id === f.id ? 'bg-gradient-to-r from-cyan-500/10 to-transparent border-cyan-400' : 'border-transparent hover:bg-white/5 hover:border-slate-700'}`}
                        >
                          {/* Icon */}
                          <div className={`shrink-0 transition-opacity duration-200 ${selectedFormula.id === f.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                            <FormulaIcon formula={f} />
                          </div>

                          {/* Text Info */}
                          <div className="min-w-0">
                            <div className={`font-bold text-sm transition-colors truncate ${selectedFormula.id === f.id ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
                              {f.name}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5 font-mono truncate opacity-60 group-hover:opacity-90">
                              {f.algorithm || "(Intuitive Step)"}
                            </div>
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
              <div className="absolute inset-0 z-0 flex items-center justify-center pb-32 md:pb-48 lg:pb-64">
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

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                    {/* Left Side: Title & Description */}
                    <div className="flex-1 min-w-0 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 bg-cyan-900/30 rounded border border-cyan-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)] animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                          {selectedFormula.category}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-2 tracking-tight truncate md:whitespace-normal">
                        {selectedFormula.name}
                      </h2>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                        {selectedFormula.description}
                      </p>
                    </div>

                    {/* Right Side: Algorithm with Forced Wrapping */}
                    {selectedFormula.algorithm && (
                      <div className="w-full md:w-auto md:min-w-[280px] md:max-w-[50%] shrink-0 group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                        <div className="relative bg-[#0F111A] border border-white/10 p-4 md:p-5 rounded-xl">
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 border-b border-white/5 pb-1">Algorithm</div>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2">
                            {selectedFormula.algorithm.split(' ').map((move, idx) => (
                              <span
                                key={`${move}-${idx}`}
                                className="font-mono text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300"
                              >
                                {move}
                              </span>
                            ))}
                          </div>
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
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Types
type TimerState = 'IDLE' | 'HOLDING' | 'READY' | 'RUNNING';

interface Solve {
  id: number;
  time: number;
  scramble: string;
  date: number;
}

// ==========================================
// Utility Functions
// ==========================================

const generateScramble = (): string => {
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const modifiers = ['', "'", '2'];
  const length = 20;
  let scramble: string[] = [];
  let lastMove = '';
  let secondLastMove = '';

  const getAxis = (m: string) => {
    if (['R', 'L'].includes(m)) return 'x';
    if (['U', 'D'].includes(m)) return 'y';
    if (['F', 'B'].includes(m)) return 'z';
    return '';
  };

  for (let i = 0; i < length; i++) {
    let move: string;
    let axis: string;
    
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
      axis = getAxis(move);
    } while (
      move === lastMove || 
      (getAxis(lastMove) === axis && getAxis(secondLastMove) === axis)
    );

    secondLastMove = lastMove;
    lastMove = move;
    scramble.push(move + modifiers[Math.floor(Math.random() * modifiers.length)]);
  }
  return scramble.join(' ');
};

const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const rs = s % 60;
  const rms = Math.floor((ms % 1000) / 10);
  return `${m > 0 ? m + ':' : ''}${rs < 10 && m > 0 ? '0' : ''}${rs}.${rms < 10 ? '0' : ''}${rms}`;
};

const calculateAverage = (solves: Solve[], size: number): string => {
  if (solves.length < size) return '-';
  const recent = solves.slice(0, size);
  const times = recent.map(s => s.time).sort((a, b) => a - b);
  const trimmed = times.slice(1, -1);
  const sum = trimmed.reduce((acc, curr) => acc + curr, 0);
  return formatTime(sum / trimmed.length);
};

// ==========================================
// Component
// ==========================================

const Timer: React.FC = () => {
  // UI State (for rendering)
  const [time, setTime] = useState(0);
  const [timerState, setTimerState] = useState<TimerState>('IDLE');
  const [solves, setSolves] = useState<Solve[]>([]);
  const [currentScramble, setCurrentScramble] = useState<string>('');
  
  // Logic Refs (for event handlers - avoids re-binding listeners)
  const stateRef = useRef<TimerState>('IDLE');
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number>(0);

  // Sync stateRef with state
  useEffect(() => {
    stateRef.current = timerState;
  }, [timerState]);

  // Initialize
  useEffect(() => {
    setCurrentScramble(generateScramble());
  }, []);

  // Timer Loop
  const updateTimer = () => {
    setTime(Date.now() - startTimeRef.current);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  // Keyboard Handlers
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only handle spacebar
    if (e.code !== 'Space') return;
    
    // Prevent default scrolling
    e.preventDefault();

    // If key is being held down (repeat event), ignore
    if (e.repeat) return;

    const currentState = stateRef.current;

    if (currentState === 'RUNNING') {
      // STOP TIMER
      cancelAnimationFrame(animationFrameRef.current);
      
      const finalTime = Date.now() - startTimeRef.current;
      setTime(finalTime);
      setTimerState('IDLE');
      
      const newSolve: Solve = {
        id: Date.now(),
        time: finalTime,
        scramble: currentScramble, // Use current scramble for record
        date: Date.now()
      };
      
      setSolves(prev => [newSolve, ...prev]);
      setCurrentScramble(generateScramble()); // Generate new one after solve

    } else if (currentState === 'IDLE') {
      // START HOLDING
      setTimerState('HOLDING');
      
      // Start the "Red to Green" timer
      holdTimeoutRef.current = setTimeout(() => {
        setTimerState('READY');
      }, 300); // 0.3s hold time
    }
  }, [currentScramble]); // Depend on currentScramble to save it correctly

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code !== 'Space') return;

    const currentState = stateRef.current;

    if (currentState === 'READY') {
      // START RUNNING
      setTimerState('RUNNING');
      startTimeRef.current = Date.now();
      updateTimer();
    } else if (currentState === 'HOLDING') {
      // ABORT (Released too early)
      setTimerState('IDLE');
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameRef.current);
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Visual Styling
  const getTimerColor = () => {
    switch (timerState) {
      case 'HOLDING': return 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]';
      case 'READY': return 'text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,1)]';
      case 'RUNNING': return 'text-slate-100';
      default: return 'text-slate-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]';
    }
  };

  const getGlowColor = () => {
    switch (timerState) {
      case 'HOLDING': return 'bg-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.3)]';
      case 'READY': return 'bg-green-500/20 shadow-[0_0_100px_rgba(74,222,128,0.4)]';
      case 'RUNNING': return 'bg-blue-500/10 shadow-[0_0_100px_rgba(59,130,246,0.2)]';
      default: return 'bg-transparent';
    }
  };

  const bestTime = solves.length > 0 ? Math.min(...solves.map(s => s.time)) : 0;

  return (
    <div className="flex flex-col h-full w-full justify-between pb-4">
      
      {/* Top Section: Scramble */}
      <div className="w-full max-w-4xl mx-auto pt-8 px-4">
        <div className="bg-[#0B0C15]/60 backdrop-blur-md border border-white/5 rounded-xl p-4 md:p-6 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50"></div>
          <p className="text-xs md:text-sm text-slate-500 uppercase tracking-[0.2em] mb-2 font-bold">Current Scramble</p>
          <p className="text-lg md:text-2xl font-mono text-slate-300 tracking-wide leading-relaxed select-all break-words">
            {currentScramble}
          </p>
        </div>
      </div>

      {/* Middle Section: Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
        {/* Glow Effect */}
        <div 
          className={`absolute inset-0 rounded-full blur-[80px] transition-all duration-300 opacity-60 pointer-events-none transform scale-75 md:scale-100 ${getGlowColor()}`} 
        />
        
        {/* Time Digits */}
        <div className="relative z-10 text-center select-none">
          <h1 
            className={`text-[5rem] md:text-[9rem] lg:text-[11rem] font-black font-mono tabular-nums leading-none transition-all duration-200 ${getTimerColor()}`}
          >
            {formatTime(time)}
          </h1>
          
          {/* Status Indicators */}
          <div className="h-8 mt-2 flex justify-center items-center">
             {timerState === 'IDLE' && <p className="text-slate-500 text-xs md:text-sm uppercase tracking-[0.3em] animate-pulse">Hold Space to Start</p>}
             {timerState === 'HOLDING' && <p className="text-red-400 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Wait...</p>}
             {timerState === 'READY' && <p className="text-green-400 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Release!</p>}
          </div>
        </div>
      </div>

      {/* Bottom Section: Stats */}
      <div className="w-full max-w-5xl mx-auto px-4 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard label="Solves" value={solves.length.toString()} color="text-slate-200" />
          <StatCard label="Best" value={bestTime === 0 ? '-' : formatTime(bestTime)} color="text-cyan-400" />
          <StatCard label="Ao5" value={calculateAverage(solves, 5)} color="text-purple-400" />
          <StatCard label="Ao12" value={calculateAverage(solves, 12)} color="text-pink-400" />
        </div>
      </div>

    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = 'text-white' }) => (
  <div className="bg-[#0B0C15]/40 backdrop-blur-sm border border-white/5 p-3 md:p-4 rounded-xl flex flex-col items-center justify-center group hover:bg-white/5 transition-colors">
    <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest mb-1 group-hover:text-slate-400 transition-colors">{label}</span>
    <span className={`text-xl md:text-2xl font-mono font-bold ${color}`}>{value}</span>
  </div>
);

export default Timer;
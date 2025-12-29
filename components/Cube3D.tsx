import React, { useEffect, useRef, useState } from 'react';
import { Cubie, Face, CubeColor } from '../types';

interface Cube3DProps {
  cubies: Cubie[];
}

const CUBIE_SIZE = 60; 
const GAP = 2; // Reduced gap slightly for a tighter look
const OFFSET = CUBIE_SIZE + GAP;

const Cube3D: React.FC<Cube3DProps> = ({ cubies }) => {
  const [rotation, setRotation] = useState({ x: -25, y: -45 });
  const isDragging = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    lastMousePosition.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    
    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

    const deltaX = clientX - lastMousePosition.current.x;
    const deltaY = clientY - lastMousePosition.current.y;

    setRotation(prev => ({
      x: Math.max(-120, Math.min(120, prev.x - deltaY * 0.4)), 
      y: prev.y + deltaX * 0.4
    }));

    lastMousePosition.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const resetView = () => {
    setRotation({ x: -25, y: -45 });
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => handleMouseMove(e);
    const handleUp = () => handleMouseUp();

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  const getTransform = (x: number, y: number, z: number) => {
    const translateX = x * OFFSET;
    const translateY = -y * OFFSET; 
    const translateZ = z * OFFSET;
    return `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
        
        <div 
          className="w-full h-full flex items-center justify-center cursor-move touch-none perspective-1000"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          title="Drag to rotate"
        >
          <div 
            className="relative transform-style-3d transition-transform duration-100 ease-out will-change-transform"
            style={{
              width: `${CUBIE_SIZE}px`,
              height: `${CUBIE_SIZE}px`,
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            }}
          >
            {cubies.map((cubie, idx) => (
              <div
                key={`${cubie.x}-${cubie.y}-${cubie.z}-${idx}`}
                className="absolute top-0 left-0 w-full h-full transform-style-3d"
                style={{ transform: getTransform(cubie.x, cubie.y, cubie.z) }}
              >
                {/* Draw faces */}
                <CubeFace face={Face.F} color={cubie.colors[Face.F]} />
                <CubeFace face={Face.B} color={cubie.colors[Face.B]} />
                <CubeFace face={Face.U} color={cubie.colors[Face.U]} />
                <CubeFace face={Face.D} color={cubie.colors[Face.D]} />
                <CubeFace face={Face.L} color={cubie.colors[Face.L]} />
                <CubeFace face={Face.R} color={cubie.colors[Face.R]} />
              </div>
            ))}
          </div>
        </div>

        {/* Reset View Button */}
        <button 
            onClick={resetView}
            className="absolute bottom-32 right-8 md:bottom-8 md:right-8 bg-black/40 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-300 p-3 rounded-xl shadow-lg border border-white/10 backdrop-blur-md transition-all group z-40"
            title="Reset Camera View"
        >
            <svg className="group-hover:rotate-180 transition-transform duration-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
    </div>
  );
};

interface CubeFaceProps {
  face: Face;
  color?: CubeColor;
}

const CubeFace: React.FC<CubeFaceProps> = ({ face, color }) => {
  // Deep black plastic base
  const baseStyle = "absolute w-full h-full bg-[#0a0a0a] border-[1px] border-[#1a1a1a] rounded-[4px] backface-hidden flex items-center justify-center";

  let transform = '';
  switch (face) {
    case Face.F: transform = `rotateY(0deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
    case Face.B: transform = `rotateY(180deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
    case Face.U: transform = `rotateX(90deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
    case Face.D: transform = `rotateX(-90deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
    case Face.L: transform = `rotateY(-90deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
    case Face.R: transform = `rotateY(90deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
  }

  return (
    <div 
      className={baseStyle}
      style={{ transform }}
    >
       {color && (
         <div 
            className="w-[88%] h-[88%] rounded-[4px]" 
            style={{
                backgroundColor: color,
                // Solid, vibrant look with subtle depth, no heavy gloss
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.1)'
            }}
         >
         </div>
       )}
       {!color && (
           <div className="w-[88%] h-[88%] bg-[#111] rounded-[4px] opacity-90"></div>
       )}
    </div>
  );
};

export default Cube3D;
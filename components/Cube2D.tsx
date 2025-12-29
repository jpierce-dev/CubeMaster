import React from 'react';
import { Cubie, Face, CubeColor } from '../types';

interface Cube2DProps {
  cubies: Cubie[];
}

const CELL_SIZE = 50;
const GAP = 4;
const GRID_SIZE = (CELL_SIZE * 3) + (GAP * 2);

const Cube2D: React.FC<Cube2DProps> = ({ cubies }) => {
  
  // Helper to find color of a specific face at specific coordinates
  const getColor = (x: number, y: number, z: number, face: Face) => {
    const cubie = cubies.find(c => c.x === x && c.y === y && c.z === z);
    return cubie?.colors[face] || '#1e293b'; // Default to dark slate if undefined
  };

  // U Face (Top 3x3 Grid) - y=1
  // Rows: Back (z=-1), Mid (z=0), Front (z=1)
  const renderUFace = () => {
    const cells = [];
    for (let z = -1; z <= 1; z++) {
      for (let x = -1; x <= 1; x++) {
        const color = getColor(x, 1, z, Face.U);
        cells.push(
          <div 
            key={`u-${x}-${z}`} 
            className="rounded-[4px] border border-black/10 shadow-inner"
            style={{ 
              backgroundColor: color, 
              width: `${CELL_SIZE}px`, 
              height: `${CELL_SIZE}px` 
            }} 
          />
        );
      }
    }
    return cells;
  };

  // Side Strips (Stickers on the side of the Top Layer)
  // Back Strip: z=-1, y=1, Face.B. x: -1, 0, 1. (Standard view: left to right)
  // Wait, if looking from front:
  // Back face is "away". The sticker on B face at x=-1 is the top-left corner's back.
  // We render B strip above U. x goes -1 -> 1 (Left to Right).
  const renderBackStrip = () => {
    const cells = [];
    for (let x = -1; x <= 1; x++) {
      const color = getColor(x, 1, -1, Face.B);
      cells.push(
        <div key={`b-${x}`} className="rounded-sm border border-black/10" style={{ backgroundColor: color, width: `${CELL_SIZE}px`, height: '12px' }} />
      );
    }
    return cells;
  };

  // Front Strip: z=1, y=1, Face.F. x: -1 -> 1.
  const renderFrontStrip = () => {
    const cells = [];
    for (let x = -1; x <= 1; x++) {
      const color = getColor(x, 1, 1, Face.F);
      cells.push(
        <div key={`f-${x}`} className="rounded-sm border border-black/10" style={{ backgroundColor: color, width: `${CELL_SIZE}px`, height: '12px' }} />
      );
    }
    return cells;
  };

  // Left Strip: x=-1, y=1, Face.L. z: -1 -> 1.
  const renderLeftStrip = () => {
    const cells = [];
    for (let z = -1; z <= 1; z++) {
      const color = getColor(-1, 1, z, Face.L);
      cells.push(
        <div key={`l-${z}`} className="rounded-sm border border-black/10" style={{ backgroundColor: color, width: '12px', height: `${CELL_SIZE}px` }} />
      );
    }
    return cells;
  };

  // Right Strip: x=1, y=1, Face.R. z: -1 -> 1.
  const renderRightStrip = () => {
    const cells = [];
    for (let z = -1; z <= 1; z++) {
      const color = getColor(1, 1, z, Face.R);
      cells.push(
        <div key={`r-${z}`} className="rounded-sm border border-black/10" style={{ backgroundColor: color, width: '12px', height: `${CELL_SIZE}px` }} />
      );
    }
    return cells;
  };

  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in duration-700">
      
      {/* Container for the cross shape */}
      <div className="relative">
        
        {/* Back Strip (Top) */}
        <div className="flex gap-1 justify-center mb-1 ml-[16px] mr-[16px]">
          {renderBackStrip()}
        </div>

        <div className="flex gap-1 items-center">
          
          {/* Left Strip */}
          <div className="flex flex-col gap-1 mr-1">
            {renderLeftStrip()}
          </div>

          {/* Main 3x3 U Face */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-lg border border-white/10 backdrop-blur-sm">
            {renderUFace()}
          </div>

          {/* Right Strip */}
          <div className="flex flex-col gap-1 ml-1">
            {renderRightStrip()}
          </div>

        </div>

        {/* Front Strip (Bottom) */}
        <div className="flex gap-1 justify-center mt-1 ml-[16px] mr-[16px]">
          {renderFrontStrip()}
        </div>

      </div>

      <div className="mt-8 text-center text-slate-500 text-xs font-mono uppercase tracking-widest">
        Top View (U Face)
      </div>
    </div>
  );
};

export default Cube2D;
import React from 'react';
import { Cubie, Face, CubeColor } from '../types';

interface Cube2DProps {
  cubies: Cubie[];
  cellSize?: number;
}

const Cube2D: React.FC<Cube2DProps> = ({ cubies, cellSize = 50 }) => {
  const GAP = Math.max(2, Math.floor(cellSize / 12));

  // Helper to find color of a specific face at specific coordinates
  const getColor = (x: number, y: number, z: number, face: Face) => {
    const cubie = cubies.find(c => c.x === x && c.y === y && c.z === z);
    return cubie?.colors[face] || '#1e293b'; // Default to dark slate if undefined
  };

  // U Face (Top 3x3 Grid) - y=1
  const renderUFace = () => {
    const cells = [];
    for (let z = -1; z <= 1; z++) {
      for (let x = -1; x <= 1; x++) {
        const color = getColor(x, 1, z, Face.U);
        cells.push(
          <div
            key={`u-${x}-${z}`}
            className="rounded-[10%] border border-black/10 shadow-inner"
            style={{
              backgroundColor: color,
              width: `${cellSize}px`,
              height: `${cellSize}px`
            }}
          />
        );
      }
    }
    return cells;
  };

  // Side Strips (Stickers on the side of the Top Layer)
  const renderBackStrip = () => {
    const cells = [];
    for (let x = -1; x <= 1; x++) {
      const color = getColor(x, 1, -1, Face.B);
      cells.push(
        <div key={`b-${x}`} className="rounded-[2px] border border-black/10" style={{ backgroundColor: color, width: `${cellSize}px`, height: `${cellSize * 0.24}px` }} />
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
        <div key={`f-${x}`} className="rounded-[2px] border border-black/10" style={{ backgroundColor: color, width: `${cellSize}px`, height: `${cellSize * 0.24}px` }} />
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
        <div key={`l-${z}`} className="rounded-[2px] border border-black/10" style={{ backgroundColor: color, width: `${cellSize * 0.24}px`, height: `${cellSize}px` }} />
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
        <div key={`r-${z}`} className="rounded-[2px] border border-black/10" style={{ backgroundColor: color, width: `${cellSize * 0.24}px`, height: `${cellSize}px` }} />
      );
    }
    return cells;
  };

  return (
    <div className="flex flex-col items-center justify-center">

      {/* Container for the cross shape */}
      <div className="relative">

        {/* Back Strip (Top) */}
        <div className="flex justify-center mb-[2px]" style={{ gap: `${Math.max(1, GAP / 2)}px`, marginLeft: `${cellSize * 0.24 + GAP}px`, marginRight: `${cellSize * 0.24 + GAP}px` }}>
          {renderBackStrip()}
        </div>

        <div className="flex items-center" style={{ gap: `${Math.max(1, GAP / 2)}px` }}>

          {/* Left Strip */}
          <div className="flex flex-col mr-[2px]" style={{ gap: `${Math.max(1, GAP / 2)}px` }}>
            {renderLeftStrip()}
          </div>

          {/* Main 3x3 U Face */}
          <div className="grid grid-cols-3 bg-black/40 rounded-lg border border-white/10 backdrop-blur-sm" style={{ gap: `${Math.max(1, GAP / 2)}px`, padding: `${Math.max(1, GAP / 2)}px` }}>
            {renderUFace()}
          </div>

          {/* Right Strip */}
          <div className="flex flex-col ml-[2px]" style={{ gap: `${Math.max(1, GAP / 2)}px` }}>
            {renderRightStrip()}
          </div>

        </div>

        {/* Front Strip (Bottom) */}
        <div className="flex justify-center mt-[2px]" style={{ gap: `${Math.max(1, GAP / 2)}px`, marginLeft: `${cellSize * 0.24 + GAP}px`, marginRight: `${cellSize * 0.24 + GAP}px` }}>
          {renderFrontStrip()}
        </div>

      </div>

      {cellSize >= 40 && (
        <div className="mt-8 text-center text-slate-500 text-xs font-mono uppercase tracking-widest">
          Top View (U Face)
        </div>
      )}
    </div>
  );
};

export default Cube2D;
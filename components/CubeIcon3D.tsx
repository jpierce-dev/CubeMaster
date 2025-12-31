import React from 'react';
import { Cubie, Face, CubeColor } from '../types';

interface CubeIcon3DProps {
    cubies: Cubie[];
    size?: number;
}

const CUBIE_SIZE = 12;
const GAP = 1;
const OFFSET = CUBIE_SIZE + GAP;

const CubeIcon3D: React.FC<CubeIcon3DProps> = ({ cubies, size = 48 }) => {
    // Fixed Isometric angle
    const rotation = { x: -25, y: -45 };

    const getTransform = (x: number, y: number, z: number) => {
        const translateX = x * OFFSET;
        const translateY = -y * OFFSET;
        const translateZ = z * OFFSET;
        return `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
    };

    return (
        <div
            className="relative flex items-center justify-center pointer-events-none select-none overflow-visible"
            style={{ width: size, height: size, perspective: '400px' }}
        >
            <div
                className="relative transform-style-3d overflow-visible"
                style={{
                    width: `${CUBIE_SIZE}px`,
                    height: `${CUBIE_SIZE}px`,
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
            >
                {cubies.map((cubie, idx) => {
                    // Optimization: Only render cubies that are visible in isometric view (Top/Front/Right)
                    // Visible if: y=1 OR z=1 OR x=1 (roughly)
                    const isVisible = cubie.y === 1 || cubie.z === 1 || cubie.x === 1;
                    if (!isVisible) return null;

                    return (
                        <div
                            key={`${cubie.x}-${cubie.y}-${cubie.z}-${idx}`}
                            className="absolute top-0 left-0 w-full h-full transform-style-3d"
                            style={{ transform: getTransform(cubie.x, cubie.y, cubie.z) }}
                        >
                            {cubie.y === 1 && <MiniFace face={Face.U} color={cubie.colors[Face.U]} />}
                            {cubie.z === 1 && <MiniFace face={Face.F} color={cubie.colors[Face.F]} />}
                            {cubie.x === 1 && <MiniFace face={Face.R} color={cubie.colors[Face.R]} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const MiniFace: React.FC<{ face: Face, color?: CubeColor }> = ({ face, color }) => {
    let transform = '';
    switch (face) {
        case Face.F: transform = `rotateY(0deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
        case Face.U: transform = `rotateX(90deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
        case Face.R: transform = `rotateY(90deg) translateZ(${CUBIE_SIZE / 2}px)`; break;
    }

    // Same styling as Cube3D but smaller
    return (
        <div
            className="absolute w-full h-full bg-[#050505] border-[0.5px] border-[#111] rounded-[1.5px] backface-hidden flex items-center justify-center"
            style={{ transform }}
        >
            {color && color !== '#0a0a0a' && (
                <div
                    className="w-[85%] h-[85%] rounded-[1px]"
                    style={{
                        backgroundColor: color,
                        boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.2)',
                    }}
                />
            )}
        </div>
    );
};

export default CubeIcon3D;

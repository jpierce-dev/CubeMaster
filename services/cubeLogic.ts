import { CubeColor, Cubie, Face } from '../types';
import { SOLVED_COLORS } from '../constants';

// Helper to create a solved cube state
export const createSolvedCube = (): Cubie[] => {
  const cubies: Cubie[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const cubie: Cubie = { x, y, z, colors: {} };
        // Assign colors based on position relative to solved faces
        if (y === 1) cubie.colors[Face.U] = SOLVED_COLORS.U;
        if (y === -1) cubie.colors[Face.D] = SOLVED_COLORS.D;
        if (z === 1) cubie.colors[Face.F] = SOLVED_COLORS.F;
        if (z === -1) cubie.colors[Face.B] = SOLVED_COLORS.B;
        if (x === -1) cubie.colors[Face.L] = SOLVED_COLORS.L;
        if (x === 1) cubie.colors[Face.R] = SOLVED_COLORS.R;
        cubies.push(cubie);
      }
    }
  }
  return cubies;
};

// Rotate a point (x,y) 90 degrees clockwise
const rotate2D = (x: number, y: number): [number, number] => {
  return [y, -x];
};

// Apply a single move to the cube state
const applyMove = (cubies: Cubie[], move: string): Cubie[] => {
  // Normalize move
  const baseChar = move.charAt(0);
  const isWide = baseChar >= 'a' && baseChar <= 'z'; // Check if lowercase
  const face = baseChar.toUpperCase();
  const modifier = move.length > 1 ? move.charAt(1) : '';

  let times = 1;
  if (modifier === "'") times = 3; // 3 clockwise = 1 counter-clockwise
  if (modifier === '2') times = 2;

  // Filter cubies affected by the move
  const newCubies = cubies.map(c => {
    let shouldRotate = false;

    // Handle standard and wide moves
    switch (face) {
      case 'R': shouldRotate = c.x === 1 || (isWide && c.x === 0); break;
      case 'L': shouldRotate = c.x === -1 || (isWide && c.x === 0); break;
      case 'U': shouldRotate = c.y === 1 || (isWide && c.y === 0); break;
      case 'D': shouldRotate = c.y === -1 || (isWide && c.y === 0); break;
      case 'F': shouldRotate = c.z === 1 || (isWide && c.z === 0); break;
      case 'B': shouldRotate = c.z === -1 || (isWide && c.z === 0); break;

      // Slice moves
      case 'M': shouldRotate = c.x === 0; break; // Middle slice (follows L)
      case 'E': shouldRotate = c.y === 0; break; // Equatorial slice (follows D)
      case 'S': shouldRotate = c.z === 0; break; // Standing slice (follows F)

      // Whole cube rotations
      case 'X': shouldRotate = true; break; // Rotate entire cube on R axis
      case 'Y': shouldRotate = true; break; // Rotate entire cube on U axis
      case 'Z': shouldRotate = true; break; // Rotate entire cube on F axis
    }



    if (!shouldRotate) return c;

    let { x, y, z, colors } = c;
    let newColors = { ...colors }; // Clone colors

    for (let i = 0; i < times; i++) {
      // Coordinate rotation
      if (face === 'R' || face === 'X') {
        const [ny, nz] = rotate2D(y, z); y = ny; z = nz;
        // U -> B -> D -> F -> U
        const temp = newColors[Face.U];
        newColors[Face.U] = newColors[Face.F];
        newColors[Face.F] = newColors[Face.D];
        newColors[Face.D] = newColors[Face.B];
        newColors[Face.B] = temp;
      } else if (face === 'L' || (face === 'M')) {
        // L and M follow same direction relative to looking at L face? 
        // Standard: M follows L.
        // Rotation logic for L (x=-1):
        // y, z rotation is inverse of R? R is clockwise looking from Right. L is clockwise looking from Left.
        // So if R is (y,z) -> (z, -y), L is (y,z) -> (-z, y).
        const [nz, ny] = rotate2D(z, y); y = ny; z = nz;
        // U -> F -> D -> B -> U
        const temp = newColors[Face.U];
        newColors[Face.U] = newColors[Face.B];
        newColors[Face.B] = newColors[Face.D];
        newColors[Face.D] = newColors[Face.F];
        newColors[Face.F] = temp;
      } else if (face === 'U' || face === 'Y') {
        const [nz, nx] = rotate2D(z, x); x = nx; z = nz;
        // F -> L -> B -> R -> F
        const temp = newColors[Face.F];
        newColors[Face.F] = newColors[Face.R];
        newColors[Face.R] = newColors[Face.B];
        newColors[Face.B] = newColors[Face.L];
        newColors[Face.L] = temp;

      } else if (face === 'D' || face === 'E') {
        // D and E (Equator) follow D direction: F -> R -> B -> L
        const [nx, nz] = rotate2D(x, z); x = nx; z = nz;
        const temp = newColors[Face.F];
        newColors[Face.F] = newColors[Face.L];
        newColors[Face.L] = newColors[Face.B];
        newColors[Face.B] = newColors[Face.R];
        newColors[Face.R] = temp;
      } else if (face === 'F' || face === 'S' || face === 'Z') {
        const [nx, ny] = rotate2D(x, y); x = nx; y = ny;
        // U -> R -> D -> L -> U
        const temp = newColors[Face.U];
        newColors[Face.U] = newColors[Face.L];
        newColors[Face.L] = newColors[Face.D];
        newColors[Face.D] = newColors[Face.R];
        newColors[Face.R] = temp;
      } else if (face === 'B') {
        const [ny, nx] = rotate2D(y, x); x = nx; y = ny;
        // U -> L -> D -> R -> U
        const temp = newColors[Face.U];
        newColors[Face.U] = newColors[Face.R];
        newColors[Face.R] = newColors[Face.D];
        newColors[Face.D] = newColors[Face.L];
        newColors[Face.L] = temp;
      }
    }

    return { x, y, z, colors: newColors };
  });

  return newCubies;
};

// Parse an algorithm string into moves
export const parseAlgorithm = (algo: string): string[] => {
  // Handle things like (R U R') as separate tokens, remove parens
  const clean = algo.replace(/[()]/g, '');
  return clean.trim().split(/\s+/).filter(m => m.length > 0);
};

// Invert an algorithm to show the setup case
export const invertAlgorithm = (algo: string): string[] => {
  const moves = parseAlgorithm(algo);
  return moves.reverse().map(m => {
    if (m.endsWith("'")) return m.replace("'", "");
    if (m.endsWith("2")) return m;
    return m + "'";
  });
};

export const processAlgorithm = (startState: Cubie[], algoStr: string): Cubie[] => {
  const moves = parseAlgorithm(algoStr);
  let state = startState;
  moves.forEach(move => {
    state = applyMove(state, move);
  });
  return state;
};
import { CubeColor, Formula } from './types';

export const INITIAL_SYSTEM_INSTRUCTION = "You are an expert Rubik's Cube coach. Your goal is to help the user learn the CFOP method (2-Look OLL and PLL). You are helpful, concise, and encourage the user. Use standard cube notation (R, L, U, D, F, B).";

// Standard orientation: Top Yellow, Front Green
export const SOLVED_COLORS = {
  U: CubeColor.Yellow,
  D: CubeColor.White,
  F: CubeColor.Green,
  B: CubeColor.Blue,
  L: CubeColor.Orange,
  R: CubeColor.Red,
};

export const FORMULAS: Formula[] = [
  // ==========================================
  // 2-Look OLL (Orientation)
  // ==========================================
  
  // Step 1: Edges (Orienting the Cross)
  {
    id: 'oll-dot',
    name: 'Dot Case (OLL Edges)',
    category: 'CFOP (2-Look OLL)',
    algorithm: "F R U R' U' F' f R U R' U' f'",
    description: 'No yellow edges oriented. Do standard alg then wide-f alg.'
  },
  {
    id: 'oll-l-shape',
    name: 'L-Shape (OLL Edges)',
    category: 'CFOP (2-Look OLL)',
    algorithm: "f R U R' U' f'",
    description: 'Two adjacent yellow edges (Back and Left). Use wide F.'
  },
  {
    id: 'oll-line',
    name: 'Line Case (OLL Edges)',
    category: 'CFOP (2-Look OLL)',
    algorithm: "F R U R' U' F'",
    description: 'Horizontal yellow line. Use standard F.'
  },

  // Step 2: Corners (7 cases when Cross is done)
  {
    id: 'oll-sune',
    name: 'Sune',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R U R' U R U2 R'",
    description: 'One corner solved (fish head). Sticker on front-right face.'
  },
  {
    id: 'oll-antisune',
    name: 'Anti-Sune',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R U2 R' U' R U' R'",
    description: 'One corner solved (fish head). Sticker on right-side face.'
  },
  {
    id: 'oll-h',
    name: 'H Case',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R U R' U R U' R' U R U2 R'",
    description: 'No corners solved. Headlights on Front and Back.'
  },
  {
    id: 'oll-pi',
    name: 'Pi Case (Bruno)',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R U2 R2 U' R2 U' R2 U2 R",
    description: 'No corners solved. Headlights on Left, outward on Right.'
  },
  {
    id: 'oll-headlights',
    name: 'Headlights (U-Case)',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R2 D' R U2 R' D R U2 R",
    description: 'Two corners solved (eyes). Headlights facing you.'
  },
  {
    id: 'oll-t',
    name: 'T Case (Chameleon)',
    category: 'CFOP (2-Look OLL)',
    algorithm: "r U R' U' r' F R F'",
    description: 'Two corners solved. No headlights, blocks on left.'
  },
  {
    id: 'oll-bowtie',
    name: 'Bowtie (L-Case)',
    category: 'CFOP (2-Look OLL)',
    algorithm: "F' r U R' U' r' F R",
    description: 'Two corners solved diagonally.'
  },

  // ==========================================
  // 2-Look PLL (Permutation)
  // ==========================================

  // Step 1: Corners
  {
    id: 'pll-headlights',
    name: 'Headlights (T-Perm)',
    category: 'CFOP (2-Look PLL)',
    algorithm: "R U R' U' R' F R2 U' R' U' R U R' F'",
    description: 'Swap two adjacent corners. Place headlights on LEFT.'
  },
  {
    id: 'pll-diagonal',
    name: 'Diagonal (Y-Perm)',
    category: 'CFOP (2-Look PLL)',
    algorithm: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    description: 'Swap two diagonal corners. No headlights exist.'
  },

  // Step 2: Edges
  {
    id: 'pll-ua',
    name: 'Ua Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "M2 U M U2 M' U M2",
    description: 'Counter-clockwise edge cycle. Solved face at back.'
  },
  {
    id: 'pll-ub',
    name: 'Ub Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "M2 U' M U2 M' U' M2",
    description: 'Clockwise edge cycle. Solved face at back.'
  },
  {
    id: 'pll-z',
    name: 'Z Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "M' U M2 U M2 U M' U2 M2",
    description: 'Swap adjacent pairs. No solved face.'
  },
  {
    id: 'pll-h',
    name: 'H Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "M2 U M2 U2 M2 U M2",
    description: 'Swap opposite edges. No solved face.'
  },
];
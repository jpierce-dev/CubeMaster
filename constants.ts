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
    id: 'oll-line',
    name: 'Line Case',
    category: 'CFOP (2-Look OLL)',
    algorithm: "F (R U R' U') F'",
    description: 'Horizontal yellow line. Use standard F.'
  },
  {
    id: 'oll-l-shape',
    name: 'L-Shape',
    category: 'CFOP (2-Look OLL)',
    algorithm: "f (R U R' U') f'",
    description: 'Two adjacent yellow edges. Use wide f.'
  },
  {
    id: 'oll-dot',
    name: 'Dot Case',
    category: 'CFOP (2-Look OLL)',
    algorithm: "F (R U R' U') F' f (R U R' U') f'",
    description: 'No yellow edges oriented. Combine Line and L-Shape algs.'
  },

  // Step 2: Corners (7 cases when Cross is done)
  {
    id: 'oll-sune',
    name: 'Sune',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R U R' U (R U2 R')",
    description: 'One corner solved (fish head). Sticker on front-right face.'
  },
  {
    id: 'oll-antisune',
    name: 'Anti-Sune',
    category: 'CFOP (2-Look OLL)',
    algorithm: "(R U2 R') U' R U' R'",
    description: 'One corner solved (fish head). Stickers on right side.'
  },
  {
    id: 'oll-h',
    name: 'H Case',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R U R' U (R U' R' U) R U2 R'",
    description: 'No corners solved. Headlights on Front and Back.'
  },
  {
    id: 'oll-pi',
    name: 'Pi Case',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R U2 (R2 U') (R2 U') R2 U2 R",
    description: 'No corners solved. Headlights on Left, outward on Right.'
  },
  {
    id: 'oll-t',
    name: 'T Case',
    category: 'CFOP (2-Look OLL)',
    algorithm: "(r U R' U') (r' F R F')",
    description: 'Two corners solved. No headlights, blocks on left.'
  },
  {
    id: 'oll-bowtie',
    name: 'Bowtie',
    category: 'CFOP (2-Look OLL)',
    algorithm: "F' (r U R' U') (r' F R)",
    description: 'Two corners solved diagonally.'
  },
  {
    id: 'oll-headlights',
    name: 'Headlights',
    category: 'CFOP (2-Look OLL)',
    algorithm: "R2 D (R' U2 R) D' (R' U2 R')",
    description: 'Two corners solved (eyes). Headlights facing you.'
  },

  // ==========================================
  // 2-Look PLL (Permutation)
  // ==========================================

  // Step 1: Corners
  // Step 1: Corners
  {
    id: 'pll-diagonal',
    name: 'No Headlights',
    category: 'CFOP (2-Look PLL)',
    algorithm: "F (R U' R' U') R U R' F' (R U R' U') R' F R F'",
    description: 'Swap two diagonal corners (Y-Perm). Used when no side has headlights.'
  },
  {
    id: 'pll-headlights',
    name: 'Headlights',
    category: 'CFOP (2-Look PLL)',
    algorithm: "(R U R' U') R' F (R2 U' R') U' (R U R' F')",
    description: 'Swap two adjacent corners (T-Perm). Place headlights on LEFT before performing.'
  },

  // Step 2: Edges
  {
    id: 'pll-ua',
    name: 'Ua Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "(R2 U' R') U' (R U R U) R U' R",
    description: 'Counter-clockwise edge cycle. Solved face at back.'
  },
  {
    id: 'pll-ub',
    name: 'Ub Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "R' U (R' U') (R' U' R' U) R U R2",
    description: 'Clockwise edge cycle. Solved face at back.'
  },
  {
    id: 'pll-h',
    name: 'H Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "M2 U' (M2 U2 M2) U' M2",
    description: 'Swap opposite edges. No solved face.'
  },
  {
    id: 'pll-z',
    name: 'Z Perm',
    category: 'CFOP (2-Look PLL)',
    algorithm: "M' U' (M2 U') (M2 U') M' U2 M2",
    description: 'Swap adjacent pairs. No solved face.'
  },
];
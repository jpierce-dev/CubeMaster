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
  // F2L (Intuitive) - Based on Cube Academy
  // ==========================================

  // ========== 1. Easy Inserts ==========
  {
    id: 'f2l-easy-1',
    name: 'Easy Insert 1',
    category: 'F2L (Intuitive)',
    subCategory: '1. Easy Inserts',
    algorithm: "U (R U' R')",
    description: "白色朝侧，用 U 调整后插入。备选：R' F R F'",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-easy-2',
    name: 'Easy Insert 2',
    category: 'F2L (Intuitive)',
    subCategory: '1. Easy Inserts',
    algorithm: "U' (F' U F)",
    description: "白色朝前，用 U' 调整后插入。备选：y' U' (R' U R)",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-easy-3',
    name: 'Easy Insert 3',
    category: 'F2L (Intuitive)',
    subCategory: '1. Easy Inserts',
    algorithm: "R U R'",
    description: "最基础的右侧入位。",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-easy-4',
    name: 'Easy Insert 4',
    category: 'F2L (Intuitive)',
    subCategory: '1. Easy Inserts',
    algorithm: "F' U' F",
    description: "最基础的正面入位。备选：y' (R' U' R)",
    cameraAngle: { x: -25, y: -45 }
  },

  // ========== 2. Disconnected Pairs ==========
  {
    id: 'f2l-disc-1',
    name: 'Disconnected 1',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U' (R U R')",
    description: "快捷：[U2 R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-disc-2',
    name: 'Disconnected 2',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U (L' U' L)",
    description: "快捷：[U2' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-disc-3',
    name: 'Disconnected 3',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U' (R U2' R')",
    description: "快捷：[U2 R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-disc-4',
    name: 'Disconnected 4',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U (L' U2 L)",
    description: "快捷：[U2' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-disc-5',
    name: 'Disconnected 5',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U' (R U R')",
    description: "快捷：[U R U R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-disc-6',
    name: 'Disconnected 6',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U (L' U' L)",
    description: "快捷：[U' L' U' L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-disc-7',
    name: 'Disconnected 7',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U (R U2' R')",
    description: "快捷：[U R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-disc-8',
    name: 'Disconnected 8',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U' (L' U2 L)",
    description: "快捷：[U' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-disc-9',
    name: 'Disconnected 9',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U2 (R U R')",
    description: "快捷：[U R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-disc-10',
    name: 'Disconnected 10',
    category: 'F2L (Intuitive)',
    subCategory: '2. Disconnected Pairs',
    algorithm: "U2 (L' U' L)",
    description: "快捷：[U' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },

  // ========== 3. Corner in Slot ==========
  {
    id: 'f2l-corner-slot-1',
    name: 'Corner in Slot 1',
    category: 'F2L (Intuitive)',
    subCategory: '3. Corner in Slot',
    algorithm: "U' (R' F R F')",
    description: "快捷：[R U R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-corner-slot-2',
    name: 'Corner in Slot 2',
    category: 'F2L (Intuitive)',
    subCategory: '3. Corner in Slot',
    algorithm: "U (L F' L' F)",
    description: "快捷：[L' U' L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-corner-slot-3',
    name: 'Corner in Slot 3',
    category: 'F2L (Intuitive)',
    subCategory: '3. Corner in Slot',
    algorithm: "(R U' R')",
    description: "快捷：[U R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-corner-slot-4',
    name: 'Corner in Slot 4',
    category: 'F2L (Intuitive)',
    subCategory: '3. Corner in Slot',
    algorithm: "(L' U L)",
    description: "快捷：[U' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-corner-slot-5',
    name: 'Corner in Slot 5',
    category: 'F2L (Intuitive)',
    subCategory: '3. Corner in Slot',
    algorithm: "(R U R')",
    description: "快捷：[U' R U R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-corner-slot-6',
    name: 'Corner in Slot 6',
    category: 'F2L (Intuitive)',
    subCategory: '3. Corner in Slot',
    algorithm: "(L' U' L)",
    description: "快捷：[U L' U' L]",
    cameraAngle: { x: -25, y: 45 }
  },

  // ========== 4. Edge in Slot ==========
  {
    id: 'f2l-edge-slot-1',
    name: 'Edge in Slot 1',
    category: 'F2L (Intuitive)',
    subCategory: '4. Edge in Slot',
    algorithm: "(U R U' R') (U R U' R') (U R U' R')",
    description: "重复3次 sexy move。",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-edge-slot-2',
    name: 'Edge in Slot 2',
    category: 'F2L (Intuitive)',
    subCategory: '4. Edge in Slot',
    algorithm: "U' (R' F R F')",
    description: "快捷：[R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-edge-slot-3',
    name: 'Edge in Slot 3',
    category: 'F2L (Intuitive)',
    subCategory: '4. Edge in Slot',
    algorithm: "U' (R U' R')",
    description: "快捷：[U2 R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-edge-slot-4',
    name: 'Edge in Slot 4',
    category: 'F2L (Intuitive)',
    subCategory: '4. Edge in Slot',
    algorithm: "U (R U R')",
    description: "快捷：[U2' R U R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-edge-slot-5',
    name: 'Edge in Slot 5',
    category: 'F2L (Intuitive)',
    subCategory: '4. Edge in Slot',
    algorithm: "U2 (R U R')",
    description: "快捷：[F R' F' R]",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-edge-slot-6',
    name: 'Edge in Slot 6',
    category: 'F2L (Intuitive)',
    subCategory: '4. Edge in Slot',
    algorithm: "U2 (F' U' F)",
    description: "快捷：[U R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },

  // ========== 5. Connected Pairs ==========
  {
    id: 'f2l-conn-1',
    name: 'Connected 1',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "(R U' R') (U R U' R')",
    description: "快捷：[U2 R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-conn-2',
    name: 'Connected 2',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "(L' U L) (U' L' U L)",
    description: "快捷：[U2' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-conn-3',
    name: 'Connected 3',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "U' (R U' R')",
    description: "快捷：[U R U R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-conn-4',
    name: 'Connected 4',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "U (L' U L)",
    description: "快捷：[U' L' U' L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-conn-5',
    name: 'Connected 5',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "(R U R') (U2 R U' R')",
    description: "快捷：[U R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-conn-6',
    name: 'Connected 6',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "(L' U' L) (U2' L' U L)",
    description: "快捷：[U' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-conn-7',
    name: 'Connected 7',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "(R U2' R')",
    description: "快捷：[U' R U R']",
    cameraAngle: { x: -25, y: -45 }
  },
  {
    id: 'f2l-conn-8',
    name: 'Connected 8',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "(L' U2 L)",
    description: "快捷：[U L' U' L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-conn-9',
    name: 'Connected 9',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "U' (L' U L) (U L' U L)",
    description: "快捷：[U' L' U L]",
    cameraAngle: { x: -25, y: 45 }
  },
  {
    id: 'f2l-conn-10',
    name: 'Connected 10',
    category: 'F2L (Intuitive)',
    subCategory: '5. Connected Pairs',
    algorithm: "U (R U' R') (U' R U' R')",
    description: "快捷：[U R U' R']",
    cameraAngle: { x: -25, y: -45 }
  },

  // ========== 6. Pieces in Slot ==========
  // Critical: setups must keep pieces in BOTTOM 2 layers only
  {
    id: 'f2l-slot-1',
    name: 'Pieces in Slot 1',
    category: 'F2L (Intuitive)',
    subCategory: '6. Pieces in Slot',
    algorithm: "(R U' R') (U' R U R')",
    description: "快捷：[U2 R U' R']",
    cameraAngle: { x: -25, y: -45 },
    setup: "R U' R' U R U2' R' U R U' R'"
  },
  {
    id: 'f2l-slot-2',
    name: 'Pieces in Slot 2',
    category: 'F2L (Intuitive)',
    subCategory: '6. Pieces in Slot',
    algorithm: "(R U' R') (U R U2' R')",
    description: "快捷：[U R U' R']",
    cameraAngle: { x: -25, y: -45 },
    setup: "R U' R' U' R U R' U2' R U' R'"

  },
  {
    id: 'f2l-slot-3',
    name: 'Pieces in Slot 3',
    category: 'F2L (Intuitive)',
    subCategory: '6. Pieces in Slot',
    algorithm: "(R U' R') (U' R U' R')",
    description: "快捷：[d R' U' R]",
    cameraAngle: { x: -25, y: -45 },
    setup: "R U R' F U R U' R' F' R U R'"

  },
  {
    id: 'f2l-slot-4',
    name: 'Pieces in Slot 4',
    category: 'F2L (Intuitive)',
    subCategory: '6. Pieces in Slot',
    algorithm: "(R U R') (U' R U' R')",
    description: "快捷：[U2 y' R' U' R]",
    cameraAngle: { x: -25, y: -45 },
    setup: "R U' R' U' R U R' U2' R U' R'"

  },
  {
    id: 'f2l-slot-5',
    name: 'Pieces in Slot 5',
    category: 'F2L (Intuitive)',
    subCategory: '6. Pieces in Slot',
    algorithm: "(R U' R') (d R' U2' R)",
    description: "快捷：[U R' U2' R]",
    cameraAngle: { x: -25, y: -45 },
    setup: "R U' R U2' F R2' F' U2' R2'"  // Corner Solved, Edge Flipped

  },

  // ==========================================
  // 2-Look OLL (Orientation)
  // ==========================================

  // Step 1: Edges (Orienting the Cross)
  {
    id: 'oll-line',
    name: 'Line Case',
    category: 'CFOP (2-Look OLL)',
    subCategory: '1. 棱块定向 (十字)',
    algorithm: "F (R U R' U') F'",
    description: '一字型，保持水平位置执行。'
  },
  {
    id: 'oll-l-shape',
    name: 'L-Shape',
    category: 'CFOP (2-Look OLL)',
    subCategory: '1. 棱块定向 (十字)',
    algorithm: "f (R U R' U') f'",
    description: 'L型，用宽转 f 执行。'
  },
  {
    id: 'oll-dot',
    name: 'Dot Case',
    category: 'CFOP (2-Look OLL)',
    subCategory: '1. 棱块定向 (十字)',
    algorithm: "F (R U R' U') F' f (R U R' U') f'",
    description: '点型，先做 F 公式再做 f 公式。'
  },

  // Step 2: Corners (7 cases when Cross is done)
  {
    id: 'oll-sune',
    name: 'Sune',
    category: 'CFOP (2-Look OLL)',
    subCategory: '2. 角块定向 (小鱼)',
    algorithm: "R U R' U (R U2 R')",
    description: '小鱼1。'
  },
  {
    id: 'oll-antisune',
    name: 'Anti-Sune',
    category: 'CFOP (2-Look OLL)',
    subCategory: '2. 角块定向 (小鱼)',
    algorithm: "(R U2 R') U' R U' R'",
    description: '小鱼2。'
  },
  {
    id: 'oll-h',
    name: 'H Case',
    category: 'CFOP (2-Look OLL)',
    subCategory: '2. 角块定向 (小鱼)',
    algorithm: "R U R' U (R U' R' U) R U2 R'",
    description: '双头灯朝向前后。'
  },
  {
    id: 'oll-pi',
    name: 'Pi Case',
    category: 'CFOP (2-Look OLL)',
    subCategory: '2. 角块定向 (小鱼)',
    algorithm: "R U2 (R2 U') (R2 U') R2 U2 R",
    description: '一侧头灯，另一侧外翻。'
  },
  {
    id: 'oll-t',
    name: 'T Case',
    category: 'CFOP (2-Look OLL)',
    subCategory: '2. 角块定向 (小鱼)',
    algorithm: "(r U R' U') (r' F R F')",
    description: '顶层已有两个角块，左侧成块。'
  },
  {
    id: 'oll-bowtie',
    name: 'Bowtie',
    category: 'CFOP (2-Look OLL)',
    subCategory: '2. 角块定向 (小鱼)',
    algorithm: "F' (r U R' U') (r' F R)",
    description: '对角顶角。'
  },
  {
    id: 'oll-headlights',
    name: 'Headlights',
    category: 'CFOP (2-Look OLL)',
    subCategory: '2. 角块定向 (小鱼)',
    algorithm: "R2 D (R' U2 R) D' (R' U2 R')",
    description: '头灯朝前。'
  },

  // ==========================================
  // 2-Look PLL (Permutation)
  // ==========================================

  // Step 1: Corners
  {
    id: 'pll-diagonal',
    name: 'No Headlights',
    category: 'CFOP (2-Look PLL)',
    subCategory: '1. 角块交换',
    algorithm: "F (R U' R' U') R U R' F' (R U R' U') R' F R F'",
    description: 'Y-Perm。当没有侧边有头灯时执行。'
  },
  {
    id: 'pll-headlights',
    name: 'Headlights',
    category: 'CFOP (2-Look PLL)',
    subCategory: '1. 角块交换',
    algorithm: "(R U R' U') R' F (R2 U' R') U' (R U R' F')",
    description: 'T-Perm。将头灯放在左侧执行。'
  },

  // Step 2: Edges
  {
    id: 'pll-ua',
    name: 'Ua Perm',
    category: 'CFOP (2-Look PLL)',
    subCategory: '2. 棱块交换',
    algorithm: "(R2 U' R') U' (R U R U) R U' R",
    description: '逆时针棱块循环。已解面放后面。'
  },
  {
    id: 'pll-ub',
    name: 'Ub Perm',
    category: 'CFOP (2-Look PLL)',
    subCategory: '2. 棱块交换',
    algorithm: "R' U (R' U') (R' U' R' U) R U R2",
    description: '顺时针棱块循环。'
  },
  {
    id: 'pll-h',
    name: 'H Perm',
    category: 'CFOP (2-Look PLL)',
    subCategory: '2. 棱块交换',
    algorithm: "M2 U' (M2 U2 M2) U' M2",
    description: '相对面棱块互换。'
  },
  {
    id: 'pll-z',
    name: 'Z Perm',
    category: 'CFOP (2-Look PLL)',
    subCategory: '2. 棱块交换',
    algorithm: "M' U' (M2 U') (M2 U') M' U2 M2",
    description: '相邻面棱块互换。'
  },
];
export enum CubeColor {
  White = '#ffffff',
  Yellow = '#fbbf24', // amber-400
  Green = '#22c55e', // green-500
  Blue = '#3b82f6', // blue-500
  Red = '#ef4444', // red-500
  Orange = '#f97316', // orange-500
  Black = '#1e293b' // slate-800 (internal structure)
}

export enum Face {
  U = 'U', // Up (Yellow)
  D = 'D', // Down (White)
  F = 'F', // Front (Green)
  B = 'B', // Back (Blue)
  L = 'L', // Left (Orange)
  R = 'R'  // Right (Red)
}

export interface Cubie {
  x: number; // -1, 0, 1
  y: number;
  z: number;
  colors: {
    [key in Face]?: CubeColor;
  };
}

export interface Formula {
  id: string;
  name: string;
  category: 'LBL (Beginner)' | 'CFOP (2-Look OLL)' | 'CFOP (2-Look PLL)';
  algorithm: string;
  description: string;
}

export interface TimerSession {
  id: number;
  time: number; // milliseconds
  date: number;
  scramble: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
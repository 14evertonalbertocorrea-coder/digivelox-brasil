
export type TestMode = '15s' | '30s' | '60s';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  chars: number;
  errors: number;
  timestamp: number;
}

export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  bestWPM: number;
  totalTests: number;
  badges: BadgeType[];
}

export type BadgeType = 'iniciante' | 'rapido' | 'ninja' | 'maquina';

export interface RankingEntry {
  userId: string;
  userName: string;
  userPhoto: string;
  wpm: number;
  accuracy: number;
  mode: TestMode;
  timestamp: number;
}

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  createdAt: string;
}

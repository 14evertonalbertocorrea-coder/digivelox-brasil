
import { RankingEntry, User, BadgeType } from '../types';

const STORAGE_KEYS = {
  RANKINGS: 'digivelox_rankings',
  USER: 'digivelox_user',
  POSTS: 'digivelox_posts'
};

export const dbService = {
  // Rankings
  async getRankings(mode: string): Promise<RankingEntry[]> {
    const raw = localStorage.getItem(STORAGE_KEYS.RANKINGS);
    const data: RankingEntry[] = raw ? JSON.parse(raw) : [];
    return data
      .filter(r => r.mode === mode)
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, 50);
  },

  async addRanking(entry: RankingEntry): Promise<void> {
    const rankings = await this.getRankings(entry.mode);
    const allRaw = localStorage.getItem(STORAGE_KEYS.RANKINGS);
    const all: RankingEntry[] = allRaw ? JSON.parse(allRaw) : [];
    all.push(entry);
    localStorage.setItem(STORAGE_KEYS.RANKINGS, JSON.stringify(all));
  },

  // User Profile
  async getUser(): Promise<User | null> {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  },

  async saveUser(user: User): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Auth Simulation
  async loginWithGoogle(): Promise<User> {
    // In a real app, this would call Firebase Auth
    const mockUser: User = {
      uid: 'user_' + Math.random().toString(36).substr(2, 9),
      displayName: 'Piloto DigiVelox',
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      bestWPM: 0,
      totalTests: 0,
      badges: ['iniciante']
    };
    const existing = await this.getUser();
    if (existing) return existing;
    await this.saveUser(mockUser);
    return mockUser;
  }
};

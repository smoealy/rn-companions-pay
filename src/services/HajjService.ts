import AsyncStorage from '@react-native-async-storage/async-storage';

export type HajjGoal = { id: string; name: string; targetAmount: number; saved: number; year: number };

const KEY = 'hajj_goals_v1';

export const HajjService = {
  async list(): Promise<HajjGoal[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  },
  async create(g: Omit<HajjGoal, 'id' | 'saved'>): Promise<HajjGoal[]> {
    const list = await HajjService.list();
    const goal: HajjGoal = { id: `g_${Date.now()}`, saved: 0, ...g };
    const next = [...list, goal];
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return next;
  },
  async save(id: string, amount: number): Promise<HajjGoal[]> {
    const list = await HajjService.list();
    const next = list.map(g => g.id === id ? { ...g, saved: g.saved + amount } : g);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return next;
  },
  async remove(id: string): Promise<HajjGoal[]> {
    const list = await HajjService.list();
    const next = list.filter(g => g.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }
};

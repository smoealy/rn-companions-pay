import AsyncStorage from '@react-native-async-storage/async-storage';

type Env = 'pilot' | 'production';
const ENV_KEY = 'env_v1';
let CURRENT: Env = 'pilot';

export const Flags = {
  async getEnv(): Promise<Env> {
    const saved = await AsyncStorage.getItem(ENV_KEY);
    CURRENT = (saved === 'production' ? 'production' : 'pilot');
    return CURRENT;
  },
  async setEnv(v: Env): Promise<Env> {
    CURRENT = v;
    await AsyncStorage.setItem(ENV_KEY, v);
    return CURRENT;
  },
  env(): Env { return CURRENT; },
};

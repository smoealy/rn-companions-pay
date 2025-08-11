import AsyncStorage from '@react-native-async-storage/async-storage';

type Env = 'pilot' | 'production';
const ENV_KEY = 'env_v1';
const WEB3_KEY = 'web3_enabled_v1';
let CURRENT: Env = 'pilot';
let WEB3_ENABLED = false;

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

  async getWeb3(): Promise<boolean> {
    const v = await AsyncStorage.getItem(WEB3_KEY);
    WEB3_ENABLED = v === 'true';
    return WEB3_ENABLED;
  },
  async setWeb3(enabled: boolean): Promise<boolean> {
    WEB3_ENABLED = enabled;
    await AsyncStorage.setItem(WEB3_KEY, String(enabled));
    return WEB3_ENABLED;
  },
  web3(): boolean { return WEB3_ENABLED; }
};

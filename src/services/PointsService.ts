let POINTS = 120;

export const PointsService = {
  async get(): Promise<number> { return POINTS; },
  async add(n: number): Promise<number> { POINTS += n; return POINTS; },
  async redeem(n: number): Promise<boolean> {
    if (POINTS < n) return false;
    POINTS -= n;
    return true;
  },
};

export const picks = [
  {
    id: 1,
    sport: 'NFL',
    matchup: 'Eagles vs Cowboys',
    pickType: 'Spread',
    line: '+3.5',
    odds: -110,
    isUnderdog: true,
    access: 'free', // free | premium
    status: 'pending', // pending | win | loss | push
    notes: 'Market overreacting to injury news',
  },
  {
    id: 2,
    sport: 'NFL',
    matchup: '49ers vs Rams',
    pickType: 'Moneyline',
    odds: +145,
    isUnderdog: true,
    access: 'premium',
    status: 'pending',
    notes: 'Value on road dog',
  },
];

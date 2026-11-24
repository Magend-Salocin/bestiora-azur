// Shared encounter tables of the Tour de la Mémoire (floors 2 to 4).
export const TOUR_ENCOUNTERS_LOW = {
  rate: 9,
  cave: [
    { creature: 'croquemine', minLevel: 26, maxLevel: 28, weight: 25 },
    { creature: 'blanchin', minLevel: 26, maxLevel: 28, weight: 25 },
    { creature: 'ankoulet', minLevel: 26, maxLevel: 28, weight: 25 },
    { creature: 'revenant', minLevel: 27, maxLevel: 28, weight: 20 },
    { creature: 'moinillon', minLevel: 30, maxLevel: 30, weight: 5 },
  ],
};

export const TOUR_ENCOUNTERS_HIGH = {
  rate: 9,
  cave: [
    { creature: 'blanchin', minLevel: 28, maxLevel: 30, weight: 22 },
    { creature: 'ankoulet', minLevel: 28, maxLevel: 30, weight: 22 },
    { creature: 'revenant', minLevel: 28, maxLevel: 30, weight: 20 },
    { creature: 'croquemine', minLevel: 28, maxLevel: 29, weight: 14 },
    { creature: 'blancome', minLevel: 30, maxLevel: 31, weight: 8 },
    { creature: 'croquefrou', minLevel: 30, maxLevel: 32, weight: 7 },
    { creature: 'moinillon', minLevel: 30, maxLevel: 31, weight: 7 },
    { creature: 'houlecrin', minLevel: 30, maxLevel: 31, weight: 4 },
  ],
};

export default {
  id: 'telepherique_haute_bise',
  name: 'Téléphérique',
  tileset: 'indoor',
  music: 'hometown',
  layers: {
    ground: [
      '#w##w###',
      '#L....P#',
      '#L.....#',
      '#..tt..#',
      '#..tt..#',
      '#......#',
      '#......#',
      '###m####',
    ],
  },
  encounters: null,
  warps: [{ x: 3, y: 7, to: 'haute_bise', toX: 15, toY: 11 }],
  npcs: [{ id: 'conducteur', sprite: 'ouvrier', x: 2, y: 3, facing: 'down', movement: 'static', script: 'conducteur' }],
  trainers: [],
  signs: [],
  items: [],
  hiddenItems: [],
  triggers: [],
  connections: {  },
  scripts: {
    conducteur: [
      {
        cmd: 'if_badge',
        badge: 'feu',
        then: [
          { cmd: 'say', text: 'telepherique_ok' },
          { cmd: 'fade', direction: 'out' },
          { cmd: 'warp', map: 'telepherique_givremont', x: 3, y: 6, facing: 'up' },
        ],
        else: [{ cmd: 'say', text: 'telepherique_refus' }],
      },
    ],
  },
};

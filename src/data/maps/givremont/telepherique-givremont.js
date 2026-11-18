export default {
  id: 'telepherique_givremont',
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
  warps: [{ x: 3, y: 7, to: 'givremont', toX: 19, toY: 11 }],
  npcs: [{ id: 'conducteur', sprite: 'ouvrier', x: 2, y: 3, facing: 'down', movement: 'static', script: 'conducteur' }],
  trainers: [],
  signs: [],
  items: [],
  hiddenItems: [],
  triggers: [],
  connections: {  },
  scripts: {
    conducteur: [
      { cmd: 'say', text: 'telepherique_g_descente' },
      { cmd: 'fade', direction: 'out' },
      { cmd: 'warp', map: 'telepherique_haute_bise', x: 3, y: 6, facing: 'up' },
    ],
  },
};

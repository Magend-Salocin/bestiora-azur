export default {
  id: 'maison_haute_bise_3',
  name: 'Maison de Haute-Bise',
  tileset: 'indoor',
  music: 'house',
  layers: {
    ground: [
      '#w#w##w#',
      '#B..LL.#',
      '#B..LL.#',
      '#......#',
      '#.tt..P#',
      '#.tt...#',
      '#......#',
      '###m####',
    ],
  },
  encounters: null,
  warps: [{ x: 3, y: 7, to: 'haute_bise', toX: 9, toY: 11 }],
  npcs: [
    {
      id: 'fillette',
      sprite: 'fillette',
      x: 5,
      y: 5,
      facing: 'left',
      movement: 'look',
      script: [{ cmd: 'say', text: 'maison_haute_bise_3_fillette' }],
    },
    { id: 'marin', sprite: 'marin', x: 4, y: 4, facing: 'down', movement: 'static', script: 'marin' },
  ],
  trainers: [],
  signs: [],
  items: [],
  hiddenItems: [],
  triggers: [],
  connections: {  },
  scripts: {
    marin: [
      {
        cmd: 'if_flag',
        flag: 'syndicat_dissous',
        then: [{ cmd: 'say', text: 'maison_haute_bise_3_marin_dissous' }],
        else: [{ cmd: 'say', text: 'maison_haute_bise_3_marin' }],
      },
    ],
  },
};

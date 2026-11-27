export default {
  id: 'maison_haute_bise_1',
  name: 'Maison de Haute-Bise',
  tileset: 'indoor',
  music: 'house',
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
  warps: [{ x: 3, y: 7, to: 'haute_bise', toX: 19, toY: 5 }],
  npcs: [{ id: 'ancien', sprite: 'vieil_homme', x: 5, y: 3, facing: 'down', movement: 'static', script: 'ancien' }],
  trainers: [],
  signs: [],
  items: [],
  hiddenItems: [],
  triggers: [],
  connections: {  },
  scripts: {
    ancien: [
      {
        cmd: 'if_flag',
        flag: 'haute_bise_gants',
        then: [{ cmd: 'say', text: 'maison_haute_bise_1_apres' }],
        else: [
          {
            cmd: 'if_badge',
            badge: 'vent',
            then: [
              { cmd: 'say', text: 'maison_haute_bise_1_don' },
              { cmd: 'give_item', item: 'gants_de_force' },
              { cmd: 'set_flag', flag: 'haute_bise_gants' },
              { cmd: 'say', text: 'maison_haute_bise_1_conseil' },
            ],
            else: [{ cmd: 'say', text: 'maison_haute_bise_1_refus' }],
          },
        ],
      },
    ],
  },
};

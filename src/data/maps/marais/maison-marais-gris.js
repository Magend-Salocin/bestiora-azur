export default {
  id: 'maison_marais_gris',
  name: 'Cabane du pêcheur',
  tileset: 'indoor',
  music: 'hometown',
  layers: {
    ground: [
      '##w##w##',
      '#P..L..#',
      '#...L..#',
      '#rr....#',
      '#rr..tt#',
      '#....tt#',
      '#......#',
      '###m####',
    ],
  },
  encounters: null,
  warps: [{ x: 3, y: 7, to: 'marais_gris', toX: 6, toY: 8 }],
  npcs: [
    { id: 'pecheur', sprite: 'pecheur', x: 2, y: 3, facing: 'down', movement: 'static', script: 'pecheur' },
    {
      id: 'fillette',
      sprite: 'fillette',
      x: 4,
      y: 5,
      facing: 'left',
      movement: 'look',
      script: [{ cmd: 'say', text: 'maison_marais_gris_fillette' }],
    },
  ],
  trainers: [],
  signs: [],
  items: [],
  hiddenItems: [],
  triggers: [],
  connections: {  },
  scripts: {
    pecheur: [
      {
        cmd: 'if_item',
        item: 'bouee',
        then: [{ cmd: 'say', text: 'maison_marais_gris_apres' }],
        else: [
          { cmd: 'say', text: 'maison_marais_gris_don' },
          { cmd: 'give_item', item: 'bouee' },
          { cmd: 'set_flag', flag: 'marais_bouee' },
          { cmd: 'say', text: 'maison_marais_gris_conseil' },
        ],
      },
    ],
  },
};

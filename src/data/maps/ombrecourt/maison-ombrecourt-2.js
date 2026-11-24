export default {
  id: 'maison_ombrecourt_2',
  name: 'Maison d’Ombrecourt',
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
  warps: [{ x: 3, y: 7, to: 'ombrecourt', toX: 8, toY: 11 }],
  npcs: [{ id: 'echangiste', sprite: 'vendeur', x: 3, y: 3, facing: 'down', movement: 'static', script: 'echange' }],
  trainers: [],
  signs: [],
  items: [],
  hiddenItems: [],
  triggers: [],
  connections: {  },
  scripts: {
    echange: [
      {
        cmd: 'if_flag',
        flag: 'ombrecourt_echange',
        then: [{ cmd: 'say', text: 'maison_ombrecourt_2_apres' }],
        else: [
          { cmd: 'say', text: 'maison_ombrecourt_2_intro' },
          {
            cmd: 'if_flag',
            flag: 'starter_korrigan',
            then: [
              {
                cmd: 'trade',
                wanted: 'graoulet',
                flag: 'ombrecourt_echange',
                offer: { creature: 'tarasquin', level: 15, nickname: 'Goutte', originalTrainer: 'Ambre' },
              },
            ],
            else: [
              {
                cmd: 'if_flag',
                flag: 'starter_galtza',
                then: [
                  {
                    cmd: 'trade',
                    wanted: 'graoulet',
                    flag: 'ombrecourt_echange',
                    offer: { creature: 'korrigan', level: 15, nickname: 'Feuille', originalTrainer: 'Ambre' },
                  },
                ],
                else: [
                  {
                    cmd: 'trade',
                    wanted: 'graoulet',
                    flag: 'ombrecourt_echange',
                    offer: { creature: 'galtza', level: 15, nickname: 'Cendre', originalTrainer: 'Ambre' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

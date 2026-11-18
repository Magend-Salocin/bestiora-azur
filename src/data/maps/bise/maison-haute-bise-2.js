export default {
  id: 'maison_haute_bise_2',
  name: 'Maison de Haute-Bise',
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
  warps: [{ x: 3, y: 7, to: 'haute_bise', toX: 4, toY: 11 }],
  npcs: [{ id: 'collectionneur', sprite: 'gentleman', x: 3, y: 3, facing: 'down', movement: 'static', script: 'echange' }],
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
        flag: 'haute_bise_echange',
        then: [{ cmd: 'say', text: 'maison_haute_bise_2_apres' }],
        else: [
          { cmd: 'say', text: 'maison_haute_bise_2_intro' },
          {
            cmd: 'if_flag',
            flag: 'starter_fenouillot',
            then: [
              {
                cmd: 'trade',
                wanted: 'volplanin',
                flag: 'haute_bise_echange',
                offer: { creature: 'braisille', level: 15, nickname: 'Zéphyr', originalTrainer: 'Aurèle' },
              },
            ],
            else: [
              {
                cmd: 'if_flag',
                flag: 'starter_braisille',
                then: [
                  {
                    cmd: 'trade',
                    wanted: 'volplanin',
                    flag: 'haute_bise_echange',
                    offer: { creature: 'flaquin', level: 15, nickname: 'Zéphyr', originalTrainer: 'Aurèle' },
                  },
                ],
                else: [
                  {
                    cmd: 'trade',
                    wanted: 'volplanin',
                    flag: 'haute_bise_echange',
                    offer: { creature: 'fenouillot', level: 15, nickname: 'Zéphyr', originalTrainer: 'Aurèle' },
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

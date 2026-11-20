// Ligue, room 4: Terre et Toxique guardian; the trigger line starts the fight, the way forward opens once the guardian leaves. No way back.
export default {
  id: 'ligue_salle_4',
  name: 'Ligue, salle 4',
  tileset: 'special',
  music: 'memory_tower',
  layers: {
    ground: [
      '##############',
      '#llllllXlllll#',
      '#llllllllllll#',
      '#llllllllllll#',
      '#ll#llllll#ll#',
      '#llllllllllll#',
      '#llllllllllll#',
      '#llllllllllll#',
      '#ll#llllll#ll#',
      '#llllllllllll#',
      '#llllllllllll#',
      '##############',
    ],
  },
  encounters: null,
  warps: [{ x: 7, y: 1, to: 'ligue_maitre', toX: 7, toY: 12 }],
  npcs: [
    {
      id: 'gardienne_terre',
      sprite: 'mystique',
      x: 7,
      y: 3,
      facing: 'down',
      movement: 'static',
      hideIf: 'ligue_g4',
      script: [],
    },
  ],
  trainers: [],
  signs: [],
  items: [],
  hiddenItems: [],
  triggers: [{ x: 1, y: 6, w: 12, h: 1, script: [{ cmd: 'call', script: 'combat' }] }],
  connections: {  },
  scripts: {
    combat: [
      {
        cmd: 'if_flag',
        flag: 'ligue_g4',
        else: [
          { cmd: 'say', text: 'gardienne_terre_intro_salle' },
          {
            cmd: 'if_flag',
            flag: 'ligue_terminee',
            then: [{ cmd: 'battle', trainer: 'gardienne_terre_plus' }],
            else: [{ cmd: 'battle', trainer: 'gardienne_terre' }],
          },
          { cmd: 'set_flag', flag: 'ligue_g4' },
          { cmd: 'hide_actor', actor: 'gardienne_terre' },
          { cmd: 'say', text: 'gardienne_terre_apres_salle' },
        ],
      },
    ],
  },
  league: true,
};

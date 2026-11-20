// Ligue, room 3: Givre guardian; the trigger line starts the fight, the way forward opens once the guardian leaves. No way back.
export default {
  id: 'ligue_salle_3',
  name: 'Ligue, salle 3',
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
  warps: [{ x: 7, y: 1, to: 'ligue_salle_4', toX: 7, toY: 10 }],
  npcs: [
    {
      id: 'gardien_givre',
      sprite: 'montagnard',
      x: 7,
      y: 3,
      facing: 'down',
      movement: 'static',
      hideIf: 'ligue_g3',
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
        flag: 'ligue_g3',
        else: [
          { cmd: 'say', text: 'gardien_givre_intro_salle' },
          {
            cmd: 'if_flag',
            flag: 'ligue_terminee',
            then: [{ cmd: 'battle', trainer: 'gardien_givre_plus' }],
            else: [{ cmd: 'battle', trainer: 'gardien_givre' }],
          },
          { cmd: 'set_flag', flag: 'ligue_g3' },
          { cmd: 'hide_actor', actor: 'gardien_givre' },
          { cmd: 'say', text: 'gardien_givre_apres_salle' },
        ],
      },
    ],
  },
  league: true,
};

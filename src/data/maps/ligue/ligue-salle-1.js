// Ligue, room 1: Métal guardian; the trigger line starts the fight, the way forward opens once the guardian leaves. No way back.
export default {
  id: 'ligue_salle_1',
  name: 'Ligue, salle 1',
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
  warps: [{ x: 7, y: 1, to: 'ligue_salle_2', toX: 7, toY: 10 }],
  npcs: [
    {
      id: 'gardien_metal',
      sprite: 'scientifique',
      x: 7,
      y: 3,
      facing: 'down',
      movement: 'static',
      hideIf: 'ligue_g1',
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
        flag: 'ligue_g1',
        else: [
          { cmd: 'say', text: 'gardien_metal_intro_salle' },
          {
            cmd: 'if_flag',
            flag: 'ligue_terminee',
            then: [{ cmd: 'battle', trainer: 'gardien_metal_plus' }],
            else: [{ cmd: 'battle', trainer: 'gardien_metal' }],
          },
          { cmd: 'set_flag', flag: 'ligue_g1' },
          { cmd: 'hide_actor', actor: 'gardien_metal' },
          { cmd: 'say', text: 'gardien_metal_apres_salle' },
        ],
      },
    ],
  },
  league: true,
};

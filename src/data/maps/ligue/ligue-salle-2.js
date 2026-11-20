// Ligue, room 2: Combat guardian; the trigger line starts the fight, the way forward opens once the guardian leaves. No way back.
export default {
  id: 'ligue_salle_2',
  name: 'Ligue, salle 2',
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
  warps: [{ x: 7, y: 1, to: 'ligue_salle_3', toX: 7, toY: 10 }],
  npcs: [
    {
      id: 'gardienne_combat',
      sprite: 'campeuse',
      x: 7,
      y: 3,
      facing: 'down',
      movement: 'static',
      hideIf: 'ligue_g2',
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
        flag: 'ligue_g2',
        else: [
          { cmd: 'say', text: 'gardienne_combat_intro_salle' },
          {
            cmd: 'if_flag',
            flag: 'ligue_terminee',
            then: [{ cmd: 'battle', trainer: 'gardienne_combat_plus' }],
            else: [{ cmd: 'battle', trainer: 'gardienne_combat' }],
          },
          { cmd: 'set_flag', flag: 'ligue_g2' },
          { cmd: 'hide_actor', actor: 'gardienne_combat' },
          { cmd: 'say', text: 'gardienne_combat_apres_salle' },
        ],
      },
    ],
  },
  league: true,
};

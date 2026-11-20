// Named scripts shared by every map (called with { cmd: 'call', script: '<name>' }).
// A map's own `scripts` take precedence over these.
const CHAMPIONS = ['garance', 'mael', 'selene', 'aubin', 'ysolde', 'lazare', 'brune', 'oswin'];

/**
 * Champion after the badge: once the League is beaten, one rematch per real day
 * (trainer `<id>_revanche`, levels 60 to 66). The day is only spent on a win.
 */
function rematchScript(id) {
  const key = `revanche_${id}`;
  return [
    { cmd: 'say', text: `${id}_after` },
    {
      cmd: 'if_flag', flag: 'ligue_terminee',
      then: [{
        cmd: 'if_daily', key,
        then: [{
          cmd: 'ask', text: 'revanche_ask',
          yes: [
            { cmd: 'say', text: 'revanche_oui' },
            { cmd: 'battle', trainer: `${id}_revanche`, won: [{ cmd: 'set_daily', key }, { cmd: 'say', text: 'revanche_fin' }] },
          ],
          no: [{ cmd: 'say', text: 'revanche_non' }],
        }],
        else: [{ cmd: 'say', text: 'revanche_deja' }],
      }],
    },
  ];
}

export const SCRIPTS = {
  heal_party_at_home: [{ cmd: 'heal_party' }],

  // Halte nurse: heal with a short white flash, then this Halte becomes the respawn point.
  halte_heal: [
    {
      cmd: 'ask', text: 'halte_welcome',
      yes: [
        { cmd: 'say', text: 'halte_wait' },
        { cmd: 'play_sfx', sfx: 'jingle_heal' },
        { cmd: 'fade', direction: 'out', color: 'white' },
        { cmd: 'heal_party' },
        { cmd: 'wait', seconds: 0.4 },
        { cmd: 'fade', direction: 'in' },
        { cmd: 'set_respawn' },
        { cmd: 'say', text: 'halte_done' },
      ],
      no: [{ cmd: 'say', text: 'halte_no' }],
    },
  ],

  ...Object.fromEntries(CHAMPIONS.map((id) => [`revanche_${id}`, rematchScript(id)])),
};

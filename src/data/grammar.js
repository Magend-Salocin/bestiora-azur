// Grammatical gender of species names, and agreement markers in game texts.
// A marker {CREATURE:masculine|feminine} picks the form that agrees with the CREATURE variable:
//   '{CREATURE:Un|Une} {CREATURE} sauvage apparaît !', '{CREATURE} est brûlé{CREATURE:|e} !'
// The gender comes from the context (CREATURE_GENDER, set by creatureVars for nicknamed
// creatures), else from the species name in the variable, else masculine.
import { CREATURES } from './creatures.js';

export const GENDERS = ['m', 'f'];

const GENDER_BY_NAME = new Map(CREATURES.map((species) => [species.name, speciesGender(species)]));
const BATTLE_SUFFIXES = [' sauvage', ' ennemie', ' ennemi'];

export const AGREEMENT_MARKER = /\{([A-Z_]+):([^{}|]*)\|([^{}|]*)\}/g;

export function speciesGender(species) {
  return species.gender ?? 'm';
}

/** Gender of a displayed name: a species name, possibly followed by « sauvage » or « ennemi ». */
export function genderOfName(value) {
  const name = String(value ?? '');
  if (GENDER_BY_NAME.has(name)) return GENDER_BY_NAME.get(name);
  const suffix = BATTLE_SUFFIXES.find((item) => name.endsWith(item));
  return (suffix && GENDER_BY_NAME.get(name.slice(0, -suffix.length))) ?? 'm';
}

/** Replaces each agreement marker with the form matching its variable's gender. */
export function applyAgreement(text, context = {}) {
  return text.replace(AGREEMENT_MARKER, (marker, name, masculine, feminine) => {
    const gender = context[`${name}_GENDER`] ?? genderOfName(context[name]);
    return gender === 'f' ? feminine : masculine;
  });
}

/** Both forms of every marker, longest first: for layout checks. */
export function longestAgreement(text) {
  return text.replace(AGREEMENT_MARKER, (marker, name, masculine, feminine) => (Array.from(feminine).length > Array.from(masculine).length ? feminine : masculine));
}

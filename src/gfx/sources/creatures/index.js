// Hand-designed creatures (bestiary V2 and the remaining original legendaries). They replace the generator
// for these species. Each file exports { front, back } as 48 × 48 text rows.
import azurel from './azurel.js';
import braisille from './braisille.js';
import fenouillot from './fenouillot.js';
import fenouvert from './fenouvert.js';
import flaquin from './flaquin.js';
import fournaise from './fournaise.js';
import fulgorine from './fulgorine.js';
import glacerne from './glacerne.js';
import marevor from './marevor.js';
import mirelle from './mirelle.js';
import ondeclat from './ondeclat.js';
import pyrogrue from './pyrogrue.js';
import sylvenard from './sylvenard.js';
import volcarde from './volcarde.js';
import pivelin from './pivelin.js';
import grivelin from './grivelin.js';
import aquilard from './aquilard.js';
import musaraille from './musaraille.js';
import musarogne from './musarogne.js';
import feuillarve from './feuillarve.js';
import nymphot from './nymphot.js';
import phalenoir from './phalenoir.js';
import bousiot from './bousiot.js';
import bousigor from './bousigor.js';
import morillon from './morillon.js';
import morillard from './morillard.js';
import glandor from './glandor.js';
import venimot from './venimot.js';
import venimorde from './venimorde.js';
import lumignon from './lumignon.js';
import lumidanse from './lumidanse.js';
import lumirande from './lumirande.js';
import noisetin from './noisetin.js';
import noiseclat from './noiseclat.js';
import faonille from './faonille.js';
import cerfeuil from './cerfeuil.js';
import cervoral from './cervoral.js';
import caillotin from './caillotin.js';
import bloquetin from './bloquetin.js';
import menhirgon from './menhirgon.js';
import noctule from './noctule.js';
import noctulard from './noctulard.js';
import salamoue from './salamoue.js';
import salamarde from './salamarde.js';
import salamassif from './salamassif.js';
import fouisseron from './fouisseron.js';
import quartzelle from './quartzelle.js';
import quartzard from './quartzard.js';
import grenaillon from './grenaillon.js';
import lingotard from './lingotard.js';
import fonderion from './fonderion.js';
import goujonet from './goujonet.js';
import goujarde from './goujarde.js';
import brochemor from './brochemor.js';
import crabouille from './crabouille.js';
import crabastion from './crabastion.js';
import ombrelle from './ombrelle.js';
import ombrellor from './ombrellor.js';
import anguilet from './anguilet.js';
import anguistral from './anguistral.js';
import fulmarene from './fulmarene.js';
import lapugil from './lapugil.js';
import lapugilat from './lapugilat.js';
import toisonnet from './toisonnet.js';
import nimbelaine from './nimbelaine.js';
import hurlegroin from './hurlegroin.js';
import petalune from './petalune.js';
import corolline from './corolline.js';
import lampyrin from './lampyrin.js';
import lampyrex from './lampyrex.js';
import bovaillon from './bovaillon.js';
import cocolet from './cocolet.js';
import cocomarin from './cocomarin.js';
import cocorage from './cocorage.js';
import fumeron from './fumeron.js';
import fumelard from './fumelard.js';
import cendrador from './cendrador.js';
import boulonnet from './boulonnet.js';
import boulonnier from './boulonnier.js';
import crassou from './crassou.js';
import crassolard from './crassolard.js';
import piquevolt from './piquevolt.js';
import ampoulin from './ampoulin.js';
import ampoulard from './ampoulard.js';
import amperion from './amperion.js';
import sombrelin from './sombrelin.js';
import sombrecor from './sombrecor.js';
import stalactor from './stalactor.js';
import lombrin from './lombrin.js';
import lombrigant from './lombrigant.js';
import filandrin from './filandrin.js';
import filandrix from './filandrix.js';
import fusiblet from './fusiblet.js';
import fusiblard from './fusiblard.js';
import brumelin from './brumelin.js';
import brumoire from './brumoire.js';
import brumaitre from './brumaitre.js';
import cierget from './cierget.js';
import lustrombre from './lustrombre.js';
import glasnuit from './glasnuit.js';
import dionelle from './dionelle.js';
import dionavore from './dionavore.js';
import ronceroc from './ronceroc.js';
import butinet from './butinet.js';
import butinelle from './butinelle.js';
import cabrelin from './cabrelin.js';
import bouquetor from './bouquetor.js';
import cabrecime from './cabrecime.js';
import volplanin from './volplanin.js';
import volplaneur from './volplaneur.js';
import eolithe from './eolithe.js';
import givrelet from './givrelet.js';
import givrailes from './givrailes.js';
import frimousson from './frimousson.js';
import frimours from './frimours.js';
import frimastoc from './frimastoc.js';
import nuageot from './nuageot.js';
import cumulard from './cumulard.js';
import girouette from './girouette.js';
import fangelet from './fangelet.js';
import fangeur from './fangeur.js';
import fangeroi from './fangeroi.js';
import patineau from './patineau.js';
import patinoir from './patinoir.js';
import silurbe from './silurbe.js';
import pestelet from './pestelet.js';
import pestorne from './pestorne.js';
import chafouin from './chafouin.js';
import chafourbe from './chafourbe.js';
import miroitin from './miroitin.js';
import miroitage from './miroitage.js';
import nocturbe from './nocturbe.js';
import chipotard from './chipotard.js';

export const HAND_DRAWN_CREATURES = {
  fenouillot, fenouvert, sylvenard,
  braisille, fournaise, pyrogrue,
  flaquin, ondeclat, marevor,
  azurel, glacerne, volcarde, fulgorine,
  mirelle,
  pivelin, grivelin, aquilard,
  musaraille, musarogne, feuillarve, nymphot, phalenoir,
  bousiot, bousigor, morillon, morillard,
  glandor, venimot, venimorde,
  lumignon, lumidanse, lumirande, noisetin, noiseclat,
  faonille, cerfeuil, cervoral,
  caillotin, bloquetin, menhirgon, noctule, noctulard,
  salamoue, salamarde, salamassif, fouisseron,
  quartzelle, quartzard, grenaillon, lingotard, fonderion,
  goujonet, goujarde, brochemor,
  crabouille, crabastion, ombrelle, ombrellor,
  anguilet, anguistral, fulmarene,
  lapugil, lapugilat, toisonnet, nimbelaine, hurlegroin,
  petalune, corolline, lampyrin, lampyrex, bovaillon,
  cocolet, cocomarin, cocorage,
  fumeron, fumelard, cendrador, boulonnet, boulonnier,
  crassou, crassolard, piquevolt, ampoulin, ampoulard, amperion, sombrelin,
  sombrecor, stalactor, lombrin, lombrigant, filandrin, filandrix,
  fusiblet, fusiblard, brumelin, brumoire, brumaitre, cierget, lustrombre, glasnuit, dionelle, dionavore, ronceroc, butinet, butinelle,
  cabrelin, bouquetor, cabrecime, volplanin, volplaneur, eolithe, givrelet, givrailes, frimousson, frimours, frimastoc, nuageot, cumulard, girouette,
  fangelet, fangeur, fangeroi, patineau, patinoir, silurbe, pestelet, pestorne, chafouin, chafourbe, miroitin, miroitage, nocturbe, chipotard,
};

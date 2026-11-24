// Hand-designed creatures (bestiary V2 and the remaining original legendaries). They replace the generator
// for these species. Each file exports { front, back } as 48 × 48 text rows.
import vouivre from './vouivre.js';
import galtza from './galtza.js';
import korrigan from './korrigan.js';
import korrigard from './korrigard.js';
import tarasquin from './tarasquin.js';
import galtzabras from './galtzabras.js';
import veneur from './veneur.js';
import gaussier from './gaussier.js';
import tarasque from './tarasque.js';
import mitreve from './mitreve.js';
import taraskor from './taraskor.js';
import galtzagor from './galtzagor.js';
import korriroi from './korriroi.js';
import draguignan from './draguignan.js';
import farfadet from './farfadet.js';
import farfandole from './farfandole.js';
import farfator from './farfator.js';
import poulpiquet from './poulpiquet.js';
import poulpifol from './poulpifol.js';
import chauchet from './chauchet.js';
import chauchenid from './chauchenid.js';
import chauchemor from './chauchemor.js';
import carcolh from './carcolh.js';
import carcolosse from './carcolosse.js';
import mandragot from './mandragot.js';
import mandragoul from './mandragoul.js';
import dame_verte from './dame_verte.js';
import basilin from './basilin.js';
import basilic from './basilic.js';
import hada from './hada.js';
import hadalune from './hadalune.js';
import hadelys from './hadelys.js';
import faramin from './faramin.js';
import faramine from './faramine.js';
import fadet from './fadet.js';
import fadebois from './fadebois.js';
import fadeon from './fadeon.js';
import gargoulin from './gargoulin.js';
import gargoulard from './gargoulard.js';
import gargouille from './gargouille.js';
import lubin from './lubin.js';
import lubinou from './lubinou.js';
import dracounet from './dracounet.js';
import dracorive from './dracorive.js';
import dracrhodan from './dracrhodan.js';
import bolegan from './bolegan.js';
import houlin from './houlin.js';
import houlecrin from './houlecrin.js';
import servan from './servan.js';
import servarmure from './servarmure.js';
import servargent from './servargent.js';
import laminak from './laminak.js';
import laminea from './laminea.js';
import laminara from './laminara.js';
import tudgommon from './tudgommon.js';
import goemonroc from './goemonroc.js';
import morgann from './morgann.js';
import morgavague from './morgavague.js';
import coulobrin from './coulobrin.js';
import coulobron from './coulobron.js';
import coulobre from './coulobre.js';
import lougarou from './lougarou.js';
import louvar from './louvar.js';
import truffandec from './truffandec.js';
import truffandor from './truffandor.js';
import warabouc from './warabouc.js';
import margelle from './margelle.js';
import margolys from './margolys.js';
import follet from './follet.js';
import follumine from './follumine.js';
import gonfaron from './gonfaron.js';
import fullettu from './fullettu.js';
import fullemarin from './fullemarin.js';
import fulletonne from './fulletonne.js';
import leberou from './leberou.js';
import leberouge from './leberouge.js';
import leberombre from './leberombre.js';
import gobelinet from './gobelinet.js';
import gobelin from './gobelin.js';
import veluchon from './veluchon.js';
import velucorne from './velucorne.js';
import fouletot from './fouletot.js';
import follaton from './follaton.js';
import follaclair from './follaclair.js';
import follorage from './follorage.js';
import croquemine from './croquemine.js';
import croquefrou from './croquefrou.js';
import dame_noire from './dame_noire.js';
import lycastre from './lycastre.js';
import lycastron from './lycastron.js';
import camecru from './camecru.js';
import camecruse from './camecruse.js';
import moinillon from './moinillon.js';
import moinbourru from './moinbourru.js';
import blanchin from './blanchin.js';
import blancome from './blancome.js';
import blancelune from './blancelune.js';
import ankoulet from './ankoulet.js';
import ankou from './ankou.js';
import revenant from './revenant.js';
import bugulin from './bugulin.js';
import bugul_noz from './bugul_noz.js';
import roncefee from './roncefee.js';
import jetin from './jetin.js';
import jetinelle from './jetinelle.js';
import cabrillon from './cabrillon.js';
import cabridor from './cabridor.js';
import cabro_dor from './cabro_dor.js';
import serpvolin from './serpvolin.js';
import serpvolant from './serpvolant.js';
import koril from './koril.js';
import barbegel from './barbegel.js';
import barbegazi from './barbegazi.js';
import vosgoup from './vosgoup.js';
import vosgar from './vosgar.js';
import vosgarde from './vosgarde.js';
import hellequet from './hellequet.js';
import hellequin from './hellequin.js';
import bayard from './bayard.js';
import graoulet from './graoulet.js';
import graoulard from './graoulard.js';
import graoully from './graoully.js';
import lavandiere from './lavandiere.js';
import lavandame from './lavandame.js';
import magou from './magou.js';
import galipotin from './galipotin.js';
import galipote from './galipote.js';
import matagri from './matagri.js';
import matagot from './matagot.js';
import sotrin from './sotrin.js';
import sotremage from './sotremage.js';
import birette from './birette.js';
import drapet from './drapet.js';
import sirenea from './sirenea.js';
import sirenor from './sirenor.js';
import melusineau from './melusineau.js';
import melusine from './melusine.js';
import nainmarin from './nainmarin.js';
import bagnoz from './bagnoz.js';
import goelame from './goelame.js';
import goulinet from './goulinet.js';
import grangoule from './grangoule.js';
import taurnoir from './taurnoir.js';
import mallet from './mallet.js';
import babauet from './babauet.js';
import babau from './babau.js';
import alicornet from './alicornet.js';
import alicorne from './alicorne.js';
import dahu from './dahu.js';
import gevaudan from './gevaudan.js';

export const HAND_DRAWN_CREATURES = {
  korrigan, korrigard, korriroi,
  galtza, galtzabras, galtzagor,
  tarasquin, taraskor, tarasque,
  vouivre, gaussier, draguignan, veneur,
  mitreve,
  farfadet, farfandole, farfator,
  poulpiquet, poulpifol, chauchet, chauchenid, chauchemor,
  carcolh, carcolosse, mandragot, mandragoul,
  dame_verte, basilin, basilic,
  hada, hadalune, hadelys, faramin, faramine,
  fadet, fadebois, fadeon,
  gargoulin, gargoulard, gargouille, lubin, lubinou,
  dracounet, dracorive, dracrhodan, bolegan,
  houlin, houlecrin, servan, servarmure, servargent,
  laminak, laminea, laminara,
  tudgommon, goemonroc, morgann, morgavague,
  coulobrin, coulobron, coulobre,
  lougarou, louvar, truffandec, truffandor, warabouc,
  margelle, margolys, follet, follumine, gonfaron,
  fullettu, fullemarin, fulletonne,
  leberou, leberouge, leberombre, gobelinet, gobelin,
  veluchon, velucorne, fouletot, follaton, follaclair, follorage, croquemine,
  croquefrou, dame_noire, lycastre, lycastron, camecru, camecruse,
  moinillon, moinbourru, blanchin, blancome, blancelune, ankoulet, ankou, revenant, bugulin, bugul_noz, roncefee, jetin, jetinelle,
  cabrillon, cabridor, cabro_dor, serpvolin, serpvolant, koril, barbegel, barbegazi, vosgoup, vosgar, vosgarde, hellequet, hellequin, bayard,
  graoulet, graoulard, graoully, lavandiere, lavandame, magou, galipotin, galipote, matagri, matagot, sotrin, sotremage, birette, drapet,
  sirenea, sirenor, melusineau, melusine, nainmarin, bagnoz, goelame, goulinet, grangoule, taurnoir, mallet, babauet, babau,
  alicornet, alicorne, dahu, gevaudan,
};

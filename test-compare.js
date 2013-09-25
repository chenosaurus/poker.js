var he = require("./lib/evaluator/HandEvaluator").getInstance();
var Hand = require("./lib/core/Hand");
var Constants = require("./lib/core/Constants");
var Deck = require("./lib/core/Deck");
var OFCHand = require("./lib/games/ofc/OFCHand");
var OFCPosition = require("./lib/games/ofc/OFCPosition");
var Royalties = require("./lib/games/ofc/Royalties");
var Utils = require("./lib/Utils");

he.on("ready", ready)

var TAG = "TEST";
var LOOPS = 20000;


function ready() {

  var pos1 = OFCPosition();
  var pos2 = OFCPosition();

  pos1.addTop("2c", "2h", "2d");
  pos1.addMid("kh", "ks", "kd", "2c", "jc");
  pos1.addBot("6s", "7h", "8h", "9c", "td");

  pos2.addTop("ah", "jh", "3d");
  pos2.addMid("as", "2h", "2d", "2s", "5c");
  pos2.addBot("qh", "qd", "qc", "qs", "8d");

  var scores = pos1.compare(pos2);

  Utils.log(TAG, "p1 top", pos1.hands.top.cardNames());
  Utils.log(TAG, "p1 mid", pos1.hands.mid.cardNames());
  Utils.log(TAG, "p1 bot", pos1.hands.bot.cardNames());

  Utils.log(TAG, "p2 top", pos2.hands.top.cardNames());
  Utils.log(TAG, "p2 mid", pos2.hands.mid.cardNames());
  Utils.log(TAG, "p2 bot", pos2.hands.bot.cardNames());

  Utils.log(TAG, "p1 score", scores[0]);
  Utils.log(TAG, "p2 score", scores[1]);
}

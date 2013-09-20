var he = require("./lib/evaluator/HandEvaluator").getInstance();
var Hand = require("./lib/core/Hand");
var Constants = require("./lib/core/Constants");
var Deck = require("./lib/core/Deck");
var OFCHand = require("./lib/games/ofc/OFCHand");
var Royalties = require("./lib/games/ofc/Royalties");
var Utils = require("./lib/Utils");

he.on("ready", ready)

var TAG = "TEST";
var LOOPS = 50000;


function ready() {
  var ag = {
    hands: 0
  };


  var top = ["qc"];
  var mid = ["kh"];
  var bot = ["6s", "th", "3c"];
  var draw = "5h";

  testHands(top, mid, bot, draw);
}

function testHands(top, mid, bot, draw) {
  //run top
  simulateHands(top.concat(draw), "top");

  //run mid
  simulateHands(mid.concat(draw), "middle");

  //run bot
  simulateHands(bot.concat(draw), "bottom");

}

function simulateHands(cards, position) {
  Utils.log(TAG, "simulation", position);

  var ag = {hands: 0, types: {}};

  for (var i = 0; i < LOOPS; i++) {
    var ev = simulateHand(cards, position);
    ag.hands++;
    ag.types[ev.handType] = ag.types[ev.handType] + 1 || 1;
  }

  for (handType in ag.types) {
    var type = Constants.HAND_TYPES[handType];
    var count = ag.types[handType];

    Utils.log(TAG, "--", type, count * 100 / ag.hands + "%");

  }
}

function simulateHand(cards, position) {
  var hand = new OFCHand(position, cards);

  //create deck without cards in hand
  var deck = Deck.without(cards);
  while(!hand.isFull()) {
    hand.add(deck.draw());
  }
  var ev = hand.evalHand();
  return ev;
}

var he = require("./lib/evaluator/HandEvaluator").getInstance();
var Hand = require("./lib/core/Hand");
var Constants = require("./lib/core/Constants");
var Deck = require("./lib/core/Deck");
var OFCHand = require("./lib/games/ofc/OFCHand");
var Royalties = require("./lib/games/ofc/Royalties");
var Utils = require("./lib/Utils");

he.on("ready", ready)

var TAG = "TEST";

function ready() {
  var ag = {
    hands: 0
  };

  var loops = 10000;

  var top = ["5s", "6h"];

  for (var i = 0; i < loops; i++) {
    var ev = testHand(top, "top");

    ag.hands++;
    ag[ev.handType] = ag[ev.handType] + 1 || 1;
  }
  
  Utils.log(TAG, "High Card: ", ag[1], " ", ag[1]*100/ag.hands + "%");
  Utils.log(TAG, "One Pair: ", ag[2], " ", ag[2]*100/ag.hands + "%");
}

function testHand(cards, position) {

  var hand = new OFCHand(position, cards);
  //create deck without cards in hand
  var deck = Deck.without(cards);
  while(!hand.isFull()) {
    hand.add(deck.draw());
  }

  var ev = hand.evalHand();
  //Utils.log(TAG, hand.cardNames());
  //Utils.log(TAG, hand.evalHand());
  // Utils.log(TAG, "royalties: ", hand.royalties());

  return ev;
}
var Card          = require("../../core/Card"),
    Hand          = require("../../core/Hand"),
    he            = require("../../evaluator/HandEvaluator").getInstance();

var MIN_TOP_PAIR = 6;
var ROYALTY_VALUES = {
  "4": 2,
  "5": 4,
  "6": 8,
  "7": 12,
  "8": 20,
  "9": 30,
  "10": 50,
}

// Given a paired hand, determine the rank of the
// paired (or tripped) cards.
var getRankOfPair = function (hand) {
  var cards = {}, i, r;
  hand = Hand.getCards(hand);
  for (i = 0; i < hand.length; i++) {
    r = Card.getRank(hand[i]);
    cards[r] = cards[r] + 1 || 1;
  }
  for (i in cards) {
    if (cards[i] >= 2) {
      return parseInt(i);
    }
  }
}

var Royalties = {
  getHandRoyalties: function (hand, position) {
    var ev = he.evalHand(hand),
        type = ev.handType,
        royalties = 0,
        rankOfPair;

    // top hands rank / score differently
    if (position == "top") {
      // pair or trips
      if (type == 2 || type == 4) {
        var rankOfPair = getRankOfPair(hand);
        if (rankOfPair >= MIN_TOP_PAIR) {
          royalties = rankOfPair - MIN_TOP_PAIR + 1;
        }
        // trips up?
        if (type == 4) {
          royalties = rankOfPair + 8;
        }
      }
      return royalties;

    // bottom / mid hands rougly use the same scoring scheme
    } else {
      // add royal flush bonus
      if (type == 9 && ev.handRank == 10) {
        type = 10;
      }
      royalties = ROYALTY_VALUES[type] || 0;
      if (position == "bot") {
        royalties = ((royalties /= 2) == 1) ? 0 : royalties;
      }

      return royalties;
    }
  }

};

module.exports = Royalties;
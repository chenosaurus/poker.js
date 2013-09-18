var sys           = require("sys"),
    fs            = require("fs"),
    path          = require("path"),
    EventEmitter  = require("events").EventEmitter,
    Utils         = require("../Utils"),
    Card          = require("../core/Card"),
    HandHelper    = require("./HandHelper");

var TAG = "HANDEVALUATOR";
var RANKS_DATA_FILE = "../../data/HandRanks.dat";


function HandEvaluator() {
  if (false === (this instanceof HandEvaluator)) {
    return new HandEvaluator();
  }
  EventEmitter.call(this);
  this.init();
}

sys.inherits(HandEvaluator, EventEmitter);

HandEvaluator.prototype.init = function() {
  Utils.log(TAG, "init");

  var ranksFile = path.join(__dirname, RANKS_DATA_FILE);

  fs.readFile(ranksFile, function(err, data) {
    if (err) throw err;
    Utils.log(TAG, "ranks file loaded");
    this.ranksLoaded(data);
  }.bind(this));
};

HandEvaluator.prototype.ranksLoaded = function(data) {
  this.ranks = data;
  this.emit("ready");
};

HandEvaluator.prototype.eval = function(cards) {
  var evalCard = function(card) {
    return this.ranks.readUInt32LE(card * 4);
  }.bind(this);

  var p = 53;
  for (var i = 0; i < cards.length; i++) {
    p = evalCard(p + cards[i]);
  }

  if (cards.length == 5) {
    p = evalCard(p)
  }

  return {
    handType: p >> 12,
    handRank: p & 0x00000fff,
    value: p,
    handName: HandEvaluator.HANDTYPES[p >> 12]
  }
};

HandEvaluator.prototype.evalHand = function(cards) {
  if (!this.ranks) {
    throw new Error("HandRanks.dat not loaded");
  }

  if (cards.length != 7 && cards.length != 5 && cards.length != 3) {
    throw new Error("Hand must be 3, 5, or 7 cards");
  }

  //if 3 card hand, fill in to make 5 card
  if (cards.length == 3) {
    cards = HandHelper.fillHand(cards);
  }

  //if passing in string formatted hand, convert first
  if (typeof cards[0] == "string") {
    cards = cards.map(function(card) {
      return Card.CARDS[card.toLowerCase()];
    }.bind(this));
  } else if (cards[0].key) {
    cards = cards.map(function(card) {
      return Card.CARDS[card.key.toLowerCase()];
    }.bind(this));
  }

  return this.eval(cards);
};

HandEvaluator.HANDTYPES = [
  "invalid hand",
  "high card",
  "one pair",
  "two pairs",
  "three of a kind",
  "straight",
  "flush",
  "full house",
  "four of a kind",
  "straight flush"
]



module.exports = HandEvaluator;
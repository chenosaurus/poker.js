var sys           = require("sys"),
    fs            = require("fs"),
    path          = require("path"),
    EventEmitter  = require("events").EventEmitter,
    Utils         = require("../Utils"),
    Constants     = require("../core/Constants"),
    HandHelper    = require("./HandHelper");

var TAG = "HANDEVALUATOR";
var RANKS_DATA_FILE = "../../data/HandRanks.dat";

var instance;

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

HandEvaluator.prototype.evalCards = function(cards) {
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
    handName: Constants.HAND_TYPES[p >> 12]
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

  return this.evalCards(cards);
};

module.exports = {
  getInstance: function() {
    return instance || (instance = new HandEvaluator());
  }
};
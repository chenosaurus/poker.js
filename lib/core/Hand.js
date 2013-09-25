var Card          = require("./Card"),
    Utils         = require("../Utils"),
    he            = require("../evaluator/HandEvaluator").getInstance();

var TAG = "HAND";

var Hand = function(cards) {
  if (false === (this instanceof Hand)) {
    return new Hand(cards);
  }

  if (cards) {
    this.cards = cards.map(function(card) {
      return Card.getVal(card);
    });
  } else {
    this.cards = [];
  }

  //default to 7 card max
  this.MAX_CARDS = 7;
}

Hand.prototype.add = function() {
  var args = Array.prototype.slice.call(arguments);
  if (args.length && typeof args[0] == "object") {
    args = args[0];
  }

  for (var i = 0; i < args.length; i++) {
    this.cards.push(Card.getVal(args[i]));
  }
}

Hand.prototype.evalHand = function() {
  if (!this.isFull()) {
    throw new Error("hand not complete");
  }
  if (!this.ev) {
    this.ev = he.evalHand(this.cards);
  }
  return this.ev;
}

Hand.prototype.isFull = function() {
  return this.cards.length >= this.MAX_CARDS;
}

Hand.prototype.cardNames = function() {
  return this.cards.map(function(card) {
    return Card.getName(card);
  });
}

Hand.getCards = function(hand) {
  if (hand instanceof Hand) {
    return hand.cards;
  } else {
    return hand.map(function(card) {
      return Card.getVal(card);
    });
  }
}

module.exports = Hand;
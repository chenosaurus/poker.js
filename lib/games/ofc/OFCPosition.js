var util          = require("util"),
    OFCHand       = require("../../core/OFCHand");

function OFCPosition(hands) {
  if (false === (this instanceof OFCPosition)) {
    return new OFCPosition(hands);
  }

  this.hands = {};

  if (hands) {
    this.hands.top = hands.top || new OFCHand();
    this.hands.mid = hands.mid || new OFCHand();
    this.hands.bot = hands.bot || new OFCHand();
  }
}

OFCPosition.prototype.addTop = function(card) {
  this.hands.top.add(card);
}

OFCPosition.prototype.addMid = function(card) {
  this.hands.mid.add(card);
}

OFCPosition.prototype.addBot = function(card) {
  this.hands.bot.add(card);
}

OFCPosition.prototype.isFull = function() {
  return this.hands.top.isFull() && this.hands.mid.isFull() && this.hands.bot.isFull();
}

OFCPosition.prototype.isFouled = function() {
  if (!this.isFull()) return false;
  this.topEv = this.hands.top.evalHand();
  this.midEv = this.hands.mid.evalHand();
  this.botEv = this.hands.bot.evalHand();
  return (this.topEv.value > this.midEv.value || this.midEv.value > this.botEv.value);
}

module.exports = OFCPosition;
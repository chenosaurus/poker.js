var util          = require("util"),
    Scoring       = require("./Scoring"),
    OFCHand       = require("./OFCHand");

function OFCPosition(hands) {
  if (false === (this instanceof OFCPosition)) {
    return new OFCPosition(hands);
  }

  this.hands = {};

  hands && hands.top ? this.hands.top = hands.top : this.hands.top = OFCHand("top");
  hands && hands.mid ? this.hands.mid = hands.mid : this.hands.mid = OFCHand("mid");
  hands && hands.bot ? this.hands.bot = hands.bot : this.hands.bot = OFCHand("bot");
}

OFCPosition.prototype.addTop = function() {
  this.hands.top.add(arguments);
}

OFCPosition.prototype.addMid = function() {
  this.hands.mid.add(arguments);
}

OFCPosition.prototype.addBot = function() {
  this.hands.bot.add(arguments);
}

OFCPosition.prototype.isFull = function() {
  return this.hands.top.isFull() && this.hands.mid.isFull() && this.hands.bot.isFull();
}

OFCPosition.prototype.evalHands = function() {
  if (!this.topEv) this.topEv = this.hands.top.evalHand();
  if (!this.midEv) this.midEv = this.hands.mid.evalHand();
  if (!this.botEv) this.botEv = this.hands.bot.evalHand();
}

OFCPosition.prototype.isFouled = function() {
  if (!this.isFull()) return false;
  this.evalHands();
  return (this.topEv.value > this.midEv.value || this.midEv.value > this.botEv.value);
}

OFCPosition.prototype.royalties = function() {
  if (!this.isFull()) return false;
  this.evalHands();
  return {
    topRoyalties: this.topEv.royalties,
    midRoyalties: this.midEv.royalties,
    botRoyalties: this.botEv.royalties
  }
}


OFCPosition.prototype.compare = function(opPos) {
  return Scoring.compare(this, opPos);
}

module.exports = OFCPosition;
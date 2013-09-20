var util          = require("util"),
    Hand          = require("../../core/Hand"),
    Royalties     = require("./Royalties");

function OFCHand(position, cards) {
  if (false === (this instanceof OFCHand)) {
    return new OFCHand(position, cards);
  }

  Hand.call(this, cards);

  this.position = position;
  if (this.position == "top") {
    this.MAX_CARDS = 3;
  } else {
    this.MAX_CARDS = 5;
  }
}

util.inherits(OFCHand, Hand);

OFCHand.prototype.royalties = function() {
  return Royalties.getHandRoyalties(this.cards, this.position);
}

OFCHand.prototype.evalHand = function() {
  var ev = OFCHand.super_.prototype.evalHand.apply(this);
  ev.royalties = this.royalties();
  return ev;
}

module.exports = OFCHand;
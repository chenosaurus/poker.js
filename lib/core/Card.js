var Constants = require("./Constants");

var Card = function(val) {
  if (false === (this instanceof Card)) {
    return new Card(val);
  }

  if (parseInt(val) == val && Constants.CARD_NAMES[val]) {
    this.val = val;
    this.key = Constants.CARD_NAMES[val];
  } else if (val && Constants.CARDS[val.toLowerCase()]) {
    this.val = Constants.CARDS[val.toLowerCase()];
    this.key = val.toLowerCase();
  } else {
    throw new Error("Invalid card value");
  }
};

// returns the numeric rank value of a given card
Card.getRank = function(card) {
  if (card instanceof Card) {
    return Constants.CARD_RANKS[card.val];
  } else if (typeof(card) == "number") {
    return Constants.CARD_RANKS[card];
  } else {
    return Constants.CARD_RANKS[Constants.CARDS[card.toLowerCase()]];
  }
};

// returns the value of a card
Card.getVal = function(card) {
  if (card instanceof Card) {
    return card.val;
  } else if (typeof(card) == "number") {
    return card;
  } else {
    return Constants.CARDS[card.toLowerCase()];
  }
}

Card.getName = function(card) {
  if (card instanceof Card) {
    return card.key;
  } else if (typeof(card) == "number") {
    return Constants.CARD_NAMES[card];
  } else {
    return card.toLowerCase();
  }
}

module.exports = Card;

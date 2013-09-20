var Constants   = require("./Constants"),
    Card        = require("./Card");

var Deck = function(cards, discarded) {
  if (false === (this instanceof Deck)) {
    return new Deck(cards, discarded);
  }

  if (cards) {
    this.cards = cards;
  } else {
    this.cards = Constants.NEW_DECK.slice(0);
  }

  this.shuffle();
  this.shuffle();

  this.discarded = discarded || [];
}

// create new deck without the excluded cards
Deck.without = function(exclude) {
  var exclude = exclude.map(function(card) {
    return Card.getVal(card);
  }); 

  exclude.sort(function(a, b) { return b - a });

  var cards = Constants.NEW_DECK.slice(0);
  for (var i = 0; i < exclude.length; i++) {
    cards.splice(exclude[i] - 1, 1);
  }
  return new Deck(cards, exclude);
}

Deck.prototype.shuffle = function() {
  var i = this.cards.length, j, temp;
  if (i == 0) return;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.cards[i];
    this.cards[i] = this.cards[j];
    this.cards[j] = temp;
  }
}

Deck.prototype.draw = function() {
  if (this.cards.length == 0) {
    throw new Error("Deck is empty");
  }
  var card = this.cards.pop();
  this.discarded.push(card);
  return card;
}

module.exports = Deck;

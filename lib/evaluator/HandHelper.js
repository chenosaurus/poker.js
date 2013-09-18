var Card          = require("../core/Card");

var HandHelper = {
  fillHand: function(cards) {

    var cardsUsed = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    //convert each card to vals 0-12, strip suit
    cards.forEach(function(card) {
      var i = Math.floor(Card.CARDS[card.toLowerCase()]/4);
      cardsUsed[i] = 1;
    }, this);

    var toFill = 2; //need to fill 2 cards
    var maxFillIndex = 0; //index in cardsUsed of highest filled card

    //fill in <toFill> cards to complete 5 card hand
    for (var i = 0; i < 13; i++) {
      if (toFill == 0) break; //done filling
      if (cardsUsed[i] == 0) {
        cardsUsed[i] = 2;
        maxFillIndex = i;
        toFill--;
      }
    }

    //check if there is straight
    var continuousCards = 0;
    var hasStraight = false;
    var straightEndIndex = 0;

    for (var i = 0; i <= 13; i++) {
      if (cardsUsed[i] == 0) {
        continuousCards = 0;
      } else {
        continuousCards++;
        if (continuousCards == 5) {
          hasStraight = true;
          straightEndIndex = i;
        }
      }
    }

    //if there is straight, fix it by shifting highest filled card to one past the straight
    if (hasStraight) {
      cardsUsed[maxFillIndex] = 0;
      cardsUsed[straightEndIndex + 1] = 2;
    }

    //fill dummy cards for lowest possible hand
    var suit = ['s', 'd'];
    for (var i = 0; i <= 13; i++) {
      if (cardsUsed[i] == 2) {
        var card = Card.CARD_KEYS[i] + suit[0];
        suit.splice(0, 1);
        cards.push(card);
      }
    }

    return cards;
  }
};

module.exports = HandHelper;
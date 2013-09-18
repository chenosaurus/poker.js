//represents a single card

var Card = function(val) {
  if (false === (this instanceof Card)) {
    return new Card(val);
  }

  if (!val || val.length != 2 || !Card.CARDS[val.toLowerCase()]) {
    throw new Error("Invalid card value")
  }
  this.val = Card.CARDS[val.toLowerCase()];
  this.key = val.toLowerCase();
};

Card.prototype.toString = function() {
  return Card.CARD_NAMES[this.key[0]] + " of " + Card.CARD_SUITS[this.key[1]];
};

// returns the numeric rank value of a given card
Card.getRankValue = function(card) {
  var rank = card.substring(0, 1),
      r = Number(card.substring(0, 1));

  if (!!r) {
    return r;
  } else {
    return Card.CARD_RANKS[rank];
  }
};

Card.CARDS = {
  "2c": 1,
  "2d": 2,
  "2h": 3,
  "2s": 4,
  "3c": 5,
  "3d": 6,
  "3h": 7,
  "3s": 8,
  "4c": 9,
  "4d": 10,
  "4h": 11,
  "4s": 12,
  "5c": 13,
  "5d": 14,
  "5h": 15,
  "5s": 16,
  "6c": 17,
  "6d": 18,
  "6h": 19,
  "6s": 20,
  "7c": 21,
  "7d": 22,
  "7h": 23,
  "7s": 24,
  "8c": 25,
  "8d": 26,
  "8h": 27,
  "8s": 28,
  "9c": 29,
  "9d": 30,
  "9h": 31,
  "9s": 32,
  "tc": 33,
  "td": 34,
  "th": 35,
  "ts": 36,
  "jc": 37,
  "jd": 38,
  "jh": 39,
  "js": 40,
  "qc": 41,
  "qd": 42,
  "qh": 43,
  "qs": 44,
  "kc": 45,
  "kd": 46,
  "kh": 47,
  "ks": 48,
  "ac": 49,
  "ad": 50,
  "ah": 51,
  "as": 52
};

Card.CARD_NAMES = {
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  't': 'ten',
  'j': 'jack',
  'q': 'queen',
  'k': 'king',
  'a': 'ace'
};

Card.CARD_RANKS = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  't': 10,
  'j': 11,
  'q': 12,
  'k': 13,
  'a': 14
};

Card.CARD_SUITS = {
  's': 'spades',
  'h': 'hearts',
  'c': 'clubs',
  'd': 'diamonds'
};

Card.CARD_KEYS = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];

module.exports = Card;

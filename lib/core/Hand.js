var Hand = function() {
  if (false === (this instanceof Hand)) {
    return new Hand();
  }
};

module.exports = Hand;
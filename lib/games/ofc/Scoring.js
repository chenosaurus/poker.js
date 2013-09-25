
var OFCPosition = require("./OFCPosition");

var emptyScore = {
  scoop: 0,
  top: 0,
  mid: 0,
  bot: 0,
  topRoyalties: 0,
  midRoyalties: 0,
  botRoyalties: 0,
  fouled: false,
  fantasyLandGo: false,
  fantasyLandStay: false
};

function getEmptyScore() {
  return JSON.parse(JSON.stringify(emptyScore));
}

function scoopScore(pos, score) {
  royaltyScore(pos, score);
  score.top = 1;
  score.mid = 1;
  score.bot = 1;
  score.scoop = 3;
  return score;
}

function royaltyScore(pos, score) {
  var royalties = pos.royalties();
  score.topRoyalties = royalties.topRoyalties;
  score.midRoyalties = royalties.midRoyalties;
  score.botRoyalties = royalties.botRoyalties;
}

function fantasyLandGo(pos, score) {
  var royalties = pos.royalties();
  if (royalties.topRoyalties >= 7) {
    return true;
  }
  return false;
}

function fantasyLandStay(pos, score) {
  var royalties = pos.royalties();
  if (royalties.topRoyalties >= 10
    || royalties.midRoyalties >= 6
    || royalties.botRoyalties >= 10) {
    return true;
  }
  return false;
}

function checkFantasyLand(pos, score) {
  score.fantasyLandGo = fantasyLandGo(pos, score);
  score.fantasyLandStay = fantasyLandStay(pos, score);
}

function compareEvs(ev1, ev2, s1, s2, which) {
  if (ev1.value > ev2.value) {
    s1[which] = 1
  } else if (ev1.value < ev2.value) {
    s2[which] = 1
  }
}

function checkScoop(score) {
  if (score.top + score.mid + score.bot == 3) {
    score.scoop = 3;
  }
}

function scores(p1, p2, s1, s2) {
  //compare hands
  compareEvs(p1.topEv, p2.topEv, s1, s2, "top");
  compareEvs(p1.midEv, p2.midEv, s1, s2, "mid");
  compareEvs(p1.botEv, p2.botEv, s1, s2, "bot");

  //get royalties
  royaltyScore(p1, s1);
  royaltyScore(p2, s2);

  //check scoop
  checkScoop(s1);
  checkScoop(s2);

  //check fantasy land
  checkFantasyLand(p1, s1);
  checkFantasyLand(p2, s2);
}

var Scoring = {
  compare: function(p1, p2) {
    if (!p1.isFull()) {
      throw new Error("position 1 is not complete");
    } else if (!p2.isFull()) {
      throw new Error("position 2 is not complete");
    }

    var s1 = getEmptyScore(), s2 = getEmptyScore();

    if (p1.isFouled() && p2.isFouled()) {
      //both players foul
      s1.fouled = true;
      s2.fouled = true;
    } else if (p1.isFouled() && !p2.isFouled()) {
      s1.fouled = true;
      scoopScore(p2, s2);
    } else if (!p1.isFouled() && p2.isFouled()) {
      s2.fouled = true;
      scoopScore(p1, s1);
    } else {
      scores(p1, p2, s1, s2);
    }

    return [s1, s2];
  }
};

module.exports = Scoring;
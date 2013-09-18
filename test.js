var HandEvaluator = require("./lib/evaluator/HandEvaluator");

var he = new HandEvaluator();
he.on("ready", ready)

function ready() {



  console.log(he.evalHand(["as", "ad", "ah"]))

}
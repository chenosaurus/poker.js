var colors = require('colors');

var Utils = {
  log: function() {
    var args = Array.prototype.slice.call(arguments);

    if (args.length) {
      var tag = args[0];
      if (typeof(tag) == "string" && tag.toUpperCase() == tag) {
        //first param is a tag
        args[0] = "[" + tag.green + "]: ";
      }
      console.log.apply(console, args);
    }

  }

}

module.exports = Utils;
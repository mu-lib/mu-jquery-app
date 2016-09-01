(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(function(m) {
      return require(m);
    }));
  } else {
    root["mu-jquery-app/component"] = factory.apply(root, modules.map(function(m) {
      return {
          "jquery": root.jQuery,
          "mu-compose/jquery": root.jQuery.construct
        }[m] || root[m];
    }));
  }
})([
  "jquery",
  "mu-jquery-app/compose",
  "mu-compose/jquery",
  "mu-jquery-app/construct"
], this, function($, compose, $construct, construct) {
  return compose($construct, construct, {
    "on/initialize": function($event) {
      return $.Deferred(function(deferred) {
        console.log("initialize %o", $event);

        setTimeout(function() {
          deferred.resolve();
        }, 1000);
      })
        .done(function() {
          console.log("initialized %o", $event);
        })
        .promise();
    },
    "on/click": function($event) {
      console.log("click %o", $event);
    },
    "hub/test": function() {
      console.log("test %o", arguments);
    }
  });
});

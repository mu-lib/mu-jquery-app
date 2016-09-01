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
          "jquery": root.jQuery
        }[m] || root[m];
    }));
  }
})(["jquery", "mu-jquery-app/compose"], this, function($, compose) {
  return compose($.construct, {
    "on/start": function($event) {
      return $.Deferred(function(deferred) {
        console.log("init %o", $event);
        setTimeout(function() {
          console.log("start %o", $event);
          deferred.resolve();
        }, 1000);
      }).promise();
    },
    "on/click": function($event) {
      console.log("click %o", $event);
    }
  });
});

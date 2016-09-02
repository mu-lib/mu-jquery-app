(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(function(m) {
      return require(m);
    }));
  } else {
    root["mu-jquery-app/button"] = factory.apply(root, modules.map(function(m) {
      return {
          "jquery": root.jQuery
        }[m] || root[m];
    }));
  }
})([
  "jquery",
  "mu-jquery-app/compose",
  "mu-jquery-widget/widget",
  "mu-jquery-hub/widget"
], this, function($, compose, widget, hub) {
  return compose(widget, hub, {
    "on/initialize": function($event) {
      this.on("mouseover", console.log.bind(console));

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
      this.off("mouseover");
    },
    "hub/test": function() {
      console.log("test %o", arguments);
    }
  });
});

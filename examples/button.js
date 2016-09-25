(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/examples/button"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m.replace(/^\.{2}/, "mu-jquery-app")];
    }));
  }
})([
  "jquery",
  "../create",
  "../widget",
], this, function($, create, widget) {
  return create(widget, {
    "on/initialize": function($event) {
      this.on("mouseover", console.log.bind(console));

      return $.Deferred(function(deferred) {
        console.log("initialize %o", $event);
        setTimeout(deferred.resolve, 1000);
      })
        .done(function() {
          console.log("initialized %o", $event);
        })
        .promise();
    },

    "on/finalize": function($event){
      console.log("test");
    },

    "on/click": function($event) {
      console.log("click %o", $event);
      this.off("mouseover");
    },
    "on/click(.special)": function($event) {
      console.log("special %o", $event);
    },
    "hub/test": function() {
      console.log("test %o", arguments);
    }
  });
});

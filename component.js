(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(function(m) {
      return require(m);
    }));
  } else {
    root["mu-jquery-app/component"] = factory.apply(root, modules.map(function(m) {
      return m === "jquery" ? root.jQuery : root[m];
    }));
  }
})(["jquery", "mu-jquery-app/compose"], this, function($, compose) {
  $(document).data("mu-jquery-app/component", compose($.construct, {
    "event/click": function() {
      console.log(arguments);
    }
  }));
});

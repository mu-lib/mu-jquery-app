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
    "on/click": function() {
      console.log(arguments);
    }
  });
});

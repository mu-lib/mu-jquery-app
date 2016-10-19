(function (modules, factory) {
  var root = this;

  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/examples/runkit"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m];
    }, {
        "jquery": root.jQuery
      }));
  }
})(["mu-jquery-app/create", "mu-jquery-app/widget", "mu-jquery-runkit/jquery.runkit"], function (create, widget, runkit) {
  return create(widget, {
    "on/initialize": function ($event) {
      var me = this;
      var $children = me.$element.children();

      me.on("ready.runkit", function() {
        return false;
      });
      me.on("create.runkit", function() {
        $children.hide();
      });

      runkit.call($children);
    }
  })
});

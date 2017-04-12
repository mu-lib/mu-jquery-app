(function (modules, factory) {
  var root = this;

  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["runkit/widget"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-jquery-widget/widget", "mu-jquery-runkit/jquery.runkit"], function (widget, runkit) {
  return widget.extend({
    "on/initialize": function ($event) {
      var me = this;
      var $children = me.$element.children();

      me.on("ready.runkit", function () {
        return false;
      });
      me.on("create.runkit", function () {
        $children.hide();
      });

      runkit.call($children);
    }
  })
});

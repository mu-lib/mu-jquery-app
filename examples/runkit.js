(function (modules, root, factory) {
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
})(["jquery", "mu-jquery-app/create", "mu-jquery-app/widget", "mu-jquery-runkit/jquery.runkit"], this, function ($, create, widget, runkit) {
  return create(widget, {
    "on/initialize": function ($event) {
      var me = this;
      var $element = me.$element;

      function ready() {
        return false;
      }

      $element
        .on("finalize." + me.ns, function () {
          $element.off("ready.runkit", ready);
        })
        .on("ready.runkit", ready)
        .children()
        .runkit();
    }
  })
});

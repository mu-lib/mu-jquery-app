(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/examples/app"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m];
    }, {
        "jquery": root.jQuery
      }));
  }
})(["jquery", "mu-jquery-loom/jquery.loom", "mu-jquery-hub/hub"], this, function (jQuery, loom, hub) {
  var self = this;

  jQuery.fn.loom = loom;

  function load(module) {
    return self[module];
  }

  jQuery(function ($) {
    $(document)
      .loom("[mu-widget]", "mu-widget", load, hub("memory", "stopOnFalse"))
      .weave()
      .fail(console.error.bind(console));
  });
});
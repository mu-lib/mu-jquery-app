(function (modules, factory) {
  var root = this;
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["quickstart-umd/app"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "quickstart-umd")];
    }, {
        "jquery": root.jQuery
      }));
  }
})(["jquery", "mu-jquery-capture/add", "mu-jquery-loom/jquery.loom"], function (jQuery, add, loom) {
  var root = this;

  function load(name) {
    return root[name];
  }

  // Replace jQuery.event.add with a version that captures event results
  jQuery.event.add = add(jQuery);

  // Extend jQuery.fn with .crank/.twist/.weave
  loom.call(jQuery.fn, "[mu-widget]", "mu-widget", load, {});

  // Wait for document ready and weave the document element
  jQuery(function ($) {
    $(document).weave().fail(console.error.bind(console));
  });
});
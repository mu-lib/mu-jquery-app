(function (modules, factory) {
  var root = this;
  root["quickstart/app"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "quickstart")];
  }, {
      "jquery": root.jQuery
    }));
})(["jquery", "mu-jquery-capture/add", "mu-jquery-loom/jquery.loom"], function (jQuery, add, loom) {
  var root = this;

  function load(module) {
    return root[module];
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
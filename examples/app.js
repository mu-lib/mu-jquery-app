(function (modules, factory) {
  var root = this;

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
})(["jquery", "mu-jquery-loom/jquery.loom", "mu-jquery-capture/add"], function (jQuery, loom, add) {
  var root = this;
  var $event = jQuery.event;

  function load(module) {
    return root[module];
  }

  $event.add = add.call(jQuery, $event.add);
  
  loom.call(jQuery.fn, "[mu-widget]", "mu-widget", load, {});
  
  jQuery(function ($) {
    $(document).weave().fail(console.error.bind(console));
  });
});
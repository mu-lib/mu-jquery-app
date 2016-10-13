(function (modules, root, factory) {
  root["mu-jquery-app/examples/app"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m];
  }, {
      "jquery": root.jQuery
    }));
})([
  "jquery",
  "mu-jquery-loom/jquery.loom",
  "mu-jquery-hub/hub"
], this, function (jQuery, loom, hub) {
  var slice = Array.prototype.slice;
  var self = this;

  // construct hub with flags
  hub = hub("memory", "stopOnFalse");

  // static loader from `self`
  function load(module) {
    return self[module];
  }

  // wait for `ready`
  jQuery(function ($) {
    // publish initial values on the `test` topic
    hub("test").publish("a", "b", "c");

    // Extend jQuery with loom
    $.fn.loom = loom;

    $(document)
      // Call loom to configure
      .loom("[mu-widget]", "mu-widget", load, hub)
      // weave elements
      .weave()
      // log
      .done(console.info.bind(console))
      // publish on the `test` topic
      .done(function () {
        hub("test").publish(1, 2, 3);
      })
      // add error handler
      .fail(console.error.bind(console));
  });
});

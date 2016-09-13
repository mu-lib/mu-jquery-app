(function(modules, root, factory) {
  root["mu-jquery-app/examples/app"] = factory.apply(root, modules.map(function(m) {
    return {
      "jquery": root.jQuery
    }[m] || root[m];
  }));
})([
  "jquery",
  "mu-jquery-component/jquery.weave",
  "mu-jquery-hub/hub"
], this, function (jQuery, weave, hub) {
  var slice = Array.prototype.slice;
  var self = this;

  // construct hub with flags
  hub = hub("memory", "stopOnFalse");

  // static loader from `self`
  function load(module) {
    return self[module];
  }

  // define `$.fn.weave` with attribute and args set
  jQuery.fn.weave = function() {
    return weave.apply(this.find("[mu-widget]"), ["mu-widget", load, hub].concat(slice.call(arguments)));
  };

  // wait for `ready`
  jQuery(function ($) {
    // publish initial values on the `test` topic
    hub("test").publish("a", "b", "c");

    $(document)
      // weave elements
      .weave()
      // log
      .done(console.info.bind(console))
      // publish on the `test` topic
      .done(function() {
        hub("test").publish(1,2,3);
      })
      // add error handler
      .fail(console.error.bind(console));
  });
});

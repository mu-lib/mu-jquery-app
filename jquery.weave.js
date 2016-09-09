(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/jquery.weave"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m];
    }));
  }
})([
  "jquery",
  "mu-jquery-widget/jquery.weave",
  "mu-jquery-crank/jquery.crank"
], this, function($, weave, crank) {
  var slice = Array.prototype.slice;

  return function(attr) {
    // weave elements from `attr` attribute
    return weave.apply(this, slice.call(arguments))
      // convert widgets to $widgets
      .then(function() {
        return $($.map(slice.call(arguments), function(widget) {
          return ($.isArray(widget) ? widget[0] : widget).$element;
        }));
      })
      // crank `initialize` on `$widgets`
      .then(function($widgets) {
        return crank.call($widgets, attr, "initialize");
      });
  }
});

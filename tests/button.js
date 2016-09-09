(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/button"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m = m.replace(/^\.{2}/, "mu-jquery-app")] || root[m];
    }));
  }
})([
  "jquery",
  "../compose",
  "mu-jquery-widget/widget"
], this, function($, compose, widget) {
    return compose(widget, {
        "on/click": function ($event) {
            console.log("clicked");
        }
    });
});
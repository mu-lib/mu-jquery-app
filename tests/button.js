(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/test/button"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\.{2}/, "mu-jquery-app")];
    }));
  }
})([
  "../compose",
  "mu-jquery-widget/widget"
], this, function(compose, widget) {
    return compose(widget, {
        "on/click": function ($event) {
            console.log("clicked");
        }
    });
});
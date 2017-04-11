(function (modules, factory) {
  var root = this;
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["quickstart-umd/widget"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "quickstart-umd")];
    }));
  }
})(["mu-jquery-widget/widget"], function (widget) {
  return widget.extend({
    "on/click": function ($event) {
      console.log("clicked");
    }
  });
});
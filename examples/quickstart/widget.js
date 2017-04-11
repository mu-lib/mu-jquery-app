(function (modules, factory) {
  var root = this;
  root["package/widget"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "package")];
  }));
})(["mu-jquery-widget/widget"], function (widget) {
  return widget.extend({
    "on/click": function ($event) {
      console.log("clicked");
    }
  });
});
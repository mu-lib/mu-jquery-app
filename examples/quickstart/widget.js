(function (modules, factory) {
  var root = this;
  root["quickstart/widget"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "quickstart")];
  }));
})(["mu-jquery-widget/widget"], function (widget) {
  return widget.extend({
    "on/click": function ($event) {
      console.log("clicked");
    }
  });
});
```javascript
(function (modules, root, factory) {
  root["your/app"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "your")];
  }, {
      "jquery": root.jQuery
    }));
})(["jquery", "mu-jquery-loom/jquery.loom"], this, function (jQuery, loom) {
  var root = this;

  jQuery.fn.loom = loom;

  function load(module) {
    return root[module];
  }

  jQuery(function ($) {
    $(document)
      .loom("[mu-widget]", "mu-widget", load)
      .weave()
      .fail(console.error.bind(console));
  });
});
```

# App setup
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

# Widget template

```javascript
(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));\
  } else {
    root["your/test-widget"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "your")];
    }));
  }
})(["mu-jquery-widget/widget"], this, function (widget) {
  return widget.extend({
    "on/click": function ($event) {
      console.log("clicked");
    }
  });
});
```

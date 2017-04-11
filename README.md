# App setup
```javascript
(function (modules, root, factory) {
  root["your/app"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "your")];
  }, {
      "jquery": root.jQuery
    }));
})(["jquery","mu-jquery-capture/add", "mu-jquery-loom/jquery.loom"], this, function (jQuery, add, loom) {
  var root = this;

  function load(module) {
    return root[module];
  }

  // Replace jQuery.event.add with a version that captures event results
  jQuery.event.add = add(jQuery);
  
  // Extend jQuery.fn with .crank/.twist/.weave
  loom.call(jQuery.fn, "[mu-widget]", "mu-widget", load, {});

  // Wait for document ready and weave the document element
  jQuery(function ($) {
    $(document).weave().fail(console.error.bind(console));
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

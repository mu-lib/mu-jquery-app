# Quickstart

## App

file: `app.js`.

```javascript
(function (modules, factory) {
  var root = this;
  root["package/app"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "package")];
  }, {
      "jquery": root.jQuery
    }));
})(["jquery","mu-jquery-capture/add", "mu-jquery-loom/jquery.loom"], function (jQuery, add, loom) {
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

# Widget

file: `widget.js`

```javascript
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
```

# HTML

file: `index.html`

```html
<!DOCTYPE html>
<html>
  <body>
    <button mu-widget="package/widget">click me</button>
  </body>
  <script src="https://rawgit.com/jquery/jquery/3.2.1/dist/jquery.js"></script>
  <script src="https://rawgit.com/mu-lib/mu-jquery-app/master/dist/bundle.min.js"></script>
  <script src="widget.js"></script>
  <script src="app.js"></script>
</html>
```
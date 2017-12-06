# µ jQuery Application Toolkit

- [bundle](dist/mu-jquery-app.js) ([minified](dist/mu-jquery-app.min.js))
- [tests](tests)
- [examples](examples)
- [changelog](CHANGELOG.md)

## Bundled

- [mu-create](../mu-create)
- [mu-jquery-widget](../mu-jquery-widget)
- [mu-jquery-wire](../mu-jquery-wire)
- [mu-jquery-capture](../mu-jquery-capture)
- [mu-jquery-crank](../mu-jquery-crank)
- [mu-jquery-loom](../mu-jquery-loom)

## Installation

```
npm install mu-jquery-app --save
```

```
bower install mu-jquery-app --save
```

## QuickStart your app in 3 steps

Check out [the source](https://github.com/mu-lib/mu-jquery-app/tree/master/examples/quickstart) or try a [live example](http://mu-lib.org/mu-jquery-app/examples/quickstart).

### Application

file: `app.js`.

```javascript
(function (modules, factory) {
  var root = this;
  factory.apply(root, modules.map(function (m) {
    return this[m] || root[m];
  }, {
      "jquery": root.jQuery
    }));
})(["jquery", "mu-jquery-capture/add", "mu-jquery-loom/jquery.loom"], function (jQuery, add, loom) {
  var root = this;

  function load(name) {
    return root[name];
  }

  // Replace jQuery.event.add with a version that captures event results
  jQuery.event.add = add(jQuery);

  // Extend jQuery.fn with .crank/.weave
  loom.call(jQuery.fn, "mu-widget", load);

  // Wait for document ready and weave the document element
  jQuery(function ($) {
    $(document).weave().fail(console.error.bind(console));
  });
});
```

### Widget

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

### HTML

file: `index.html`

```html
<!DOCTYPE html>
<html>
  <body>
    <button mu-widget="package/widget">click me</button>
  </body>
  <script src="https://rawgit.com/jquery/jquery/3.2.1/dist/jquery.js"></script>
  <script src="https://rawgit.com/mu-lib/mu-jquery-app/master/dist/mu-jquery-app.min.js"></script>
  <script src="widget.js"></script>
  <script src="app.js"></script>
</html>
```

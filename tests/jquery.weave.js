(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/tests/jquery.weave"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery,
        "qunit": root.QUnit
      }[m = m.replace(/^\.{2}/, "mu-jquery-app")] || root[m];
    }));
  }
})([
  "qunit",
  "jquery",
  "../jquery.weave",
  "../load"
], this, function(QUnit, $, weave, load) {
  var root = this;
  var slice = Array.prototype.slice;
  var button = "mu-jquery-app/test/button";

  function id(i) {
    return this + "@" + i;
  }

  QUnit.module("jquery.weave");
  
  QUnit.test("single element", function(assert) {
    return $.Deferred(function(deferred) {
      var $elements = $("<button>")
        .attr("mu-widget", button)
        .appendTo("#qunit-fixture");

      assert.expect(1);

      weave
        .call($elements, "mu-widget", load)
        .done(function() {
          assert.deepEqual(slice.call(arguments), [id.call(button, 1)]);
        })
        .then(deferred.resolve, deferred.reject);
    });
  });

  QUnit.test("multiple elements", function(assert) {
    return $.Deferred(function(deferred) {
      var $elements = $("<button><button>")
        .attr("mu-widget", button)
        .appendTo("#qunit-fixture");

      assert.expect(1);

      weave
        .call($elements, "mu-widget", load)
        .done(function() {
          assert.deepEqual(slice.call(arguments), [id.call(button, 1), id.call(button, 2)]);
        })
        .then(deferred.resolve, deferred.reject);
    });
  });

  QUnit.test("single element, multiple widgets", function(assert) {
    return $.Deferred(function(deferred) {
      var $elements = $("<button>")
        .attr("mu-widget", [button, button].join(" "))
        .appendTo("#qunit-fixture");

      assert.expect(1);

      weave
        .call($elements, "mu-widget", load)
        .done(function() {
          assert.deepEqual(slice.call(arguments), [[id.call(button, 1), id.call(button, 2)]]);
        })
        .then(deferred.resolve, deferred.reject);
    });
  });
});
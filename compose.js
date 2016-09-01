(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(function(m) {
      return require(m);
    }));
  } else {
    root["mu-jquery-app/compose"] = factory.apply(root, modules.map(function(m) {
      return root[m];
    }));
  }
})([
  "mu-compose/composer",
  "mu-compose/constructor",
  "mu-compose/prototype",
  "mu-compose/dom"
], this, function(composer, construct, proto, dom) {
  function hub(result, data) {
    var key = data.key;
    var matches = key.match(/^hub\/(.+)/);

    if (matches) {
      (result.hub = result.hub || []).push({
        "topic": matches[1],
        "handler": data.value
      });

      return false;
    }
  }

  return composer(construct, hub, dom, proto);
});

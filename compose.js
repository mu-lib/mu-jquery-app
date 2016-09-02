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
  "mu-compose/compose",
  "mu-compose/constructor",
  "mu-compose/prototype",
  "mu-compose/regexp"
], this, function(compose, construct, proto, regexp) {
  return compose(
    construct,
    regexp(/^hub\/(.+)/, function(result, data, topic) {
      (result.hub = result.hub || []).push({
        "topic": topic,
        "handler": data.value
      });

      return false;
    }),
    regexp(/^(on|attr|prop)\/(.+)/, function(result, data, method, type) {
      (result.dom = result.dom || []).push({
        "method": method,
        "type": type,
        "value": data.value
      });

      return false;
    }),
    proto
  );
});

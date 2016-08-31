(function(root, modules, factory) {
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
})(this, [
  "mu-compose/composer",
  "mu-compose/constructor",
  "mu-compose/prototype",
  "mu-compose/dom"
], function(composer, construct, proto, dom) {
  return composer(construct, dom, proto);
});

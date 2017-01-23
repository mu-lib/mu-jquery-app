(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-app/create"] = factory.apply(root, modules.map(function (m) {
      return root[m.replace(/^\./, "mu-jquery-app")];
    }));
  }
})(["mu-create/create", "mu-create/constructor", "mu-create/prototype", "mu-jquery-widget/dom"], this, function (create, construct, proto, dom) {
  return create(construct, dom, proto);
});

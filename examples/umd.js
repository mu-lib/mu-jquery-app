function umd(name, modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root[name] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
}
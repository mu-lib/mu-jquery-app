(function(modules, root, factory) {
root["mu-jquery-app/load"] = factory.apply(root, modules.map(function(m) {
    return root[m];
}));
})([], this, function() {
var root = this;

return function (module) {
    return root[module];
};
});

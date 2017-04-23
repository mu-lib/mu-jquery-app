var jQuery = require("jquery");
var add = require("mu-jquery-capture/add");
var loom = require("mu-jquery-loom/jquery.loom");

function load(name) {
  return SystemJS.import(name);
}

// Replace jQuery.event.add with a version that captures event results
jQuery.event.add = add(jQuery);

// Extend jQuery.fn with .crank/.weave
loom.call(jQuery.fn, "mu-widget", load);

// Wait for document ready and weave the document element
jQuery(function ($) {
  $(document).weave().fail(console.error.bind(console));
});
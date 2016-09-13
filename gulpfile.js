var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("default", function() {
  return gulp.src([
    "bower_components/mu-jquery-wire/jquery.wire.js",
    "bower_components/mu-jquery-crank/jquery.crank.js",
    "bower_components/mu-jquery-component/create.js",
    "bower_components/mu-jquery-component/jquery.twist.js",
    "bower_components/mu-jquery-component/jquery.weave.js",
    "bower_components/mu-jquery-component/jquery.crank.js",
    "bower_components/mu-create/transform.js",
    "bower_components/mu-create/process.js",
    "bower_components/mu-create/create.js",
    "bower_components/mu-create/constructor.js",
    "bower_components/mu-create/prototype.js",
    "bower_components/mu-create/regexp.js",
    "bower_components/mu-jquery-widget/widget.js",
    "bower_components/mu-jquery-widget/dom.js",
    "bower_components/mu-jquery-widget/create.js",
    "bower_components/mu-jquery-hub/hub.js",
    "./create.js",
    "./hub.js"
  ])
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./dist/"));
});

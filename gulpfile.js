var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("default", function() {
  return gulp.src([
    "bower_components/mu-jquery-wire/jquery.wire.js",
    "bower_components/mu-jquery-capture/capture.js",
    "bower_components/mu-jquery-capture/add.js",
    "bower_components/mu-jquery-crank/jquery.crank.js",
    "bower_components/mu-jquery-loom/expr.js",
    "bower_components/mu-jquery-loom/create.js",
    "bower_components/mu-jquery-loom/jquery.wire.js",
    "bower_components/mu-jquery-loom/jquery.weave.js",
    "bower_components/mu-jquery-loom/jquery.crank.js",
    "bower_components/mu-jquery-loom/jquery.loom.js",
    "bower_components/mu-create/transform.js",
    "bower_components/mu-create/process.js",
    "bower_components/mu-create/create.js",
    "bower_components/mu-create/constructor.js",
    "bower_components/mu-create/prototype.js",
    "bower_components/mu-create/regexp.js",
    "bower_components/mu-jquery-widget/expr.js",
    "bower_components/mu-jquery-widget/jquery.get.js",
    "bower_components/mu-jquery-widget/dom.js",
    "bower_components/mu-jquery-widget/create.js",
    "bower_components/mu-jquery-widget/widget.js"
  ])
    .pipe(concat("mu-jquery-app.js"))
    .pipe(gulp.dest("./dist/"));
});

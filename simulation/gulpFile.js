var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');
var livereload = require('gulp-livereload');

gulp.task('browserify', function(){
  browserifyShare();
    livereload.listen();
});

function browserifyShare(){
  // you need to pass these three config option to browserify
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  b = watchify(b);
  b.on('update', function(){
    bundleShare(b);
  });

  b.add(['src/js/simGrid/index.js','src/js/app.js']);
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./deploy'))
      .pipe(livereload());
}

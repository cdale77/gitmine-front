var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var path = {
  CSS:  'src/css/*.css',
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  MINIFIED_CSS: 'app.min.css',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// currently not used. Needs fixing, to include Babel, css, etc
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    //transform: [reactify],
    })
    .transform(babelify)
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('css', function() {
  gulp.src(path.CSS)
      .pipe(cssmin())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT,
      'css': 'build/' + path.MINIFIED_CSS
    }))
    .pipe(gulp.dest(path.DEST));
});

var vendors = [
  'react',
  'jquery'
];

gulp.task('vendors', function () {
    var stream = browserify({
            debug: false,
            require: vendors
        });

    stream.bundle()
          .pipe(source('vendors.js'))
          .pipe(gulp.dest('dist/build'));

    return stream;
});

gulp.task('production', ['replaceHTML', 'vendors', 'css', 'build']);

gulp.task('default', ['watch']);

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var del = require('del');
var rollup = require('rollup').rollup;
var rollupBabel = require('rollup-plugin-babel');
var rollupString = require('rollup-plugin-string');
var browserSync = require('browser-sync');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

// clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// lint source files
gulp.task('lint', function () {
  return gulp.src(['./src/app/**/*.js'])
    // .pipe($.debug({title: 'lint'}))
    .pipe($.semistandard())
    .pipe($.semistandard.reporter('default', {
      breakOnError: true
    }));
});

// rollup scripts
gulp.task('rollup', function () {
  return rollup({
    entry: 'src/app/main.js',
    plugins: [
      // compile future ES 2015 to runnable ES 5
      rollupBabel({
        runtimeHelpers: true,
        exclude: 'src/app/templates/**' // don't compile templates
      }),
      // load templates from files
      rollupString({
        extensions: ['.html']
      })
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'amd',
      dest: '.tmp/bundle.js'
    });
  });
});

// copy nls files to dist
gulp.task('nls', function () {
  return gulp.src('./src/app/nls/**/*.js')
    .pipe(gulp.dest('./dist/app/nls'));
});

// bundle minify and copy scripts to dist
gulp.task('scripts', ['rollup', 'nls'], function () {
  gulp.src(['.tmp/bundle.js'])
    .pipe($.replace('\'use strict\';', ''))
    .pipe(gulp.dest('dist/app'))
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/app'));
});

// styles: for now just copying
// later may want to pre/post process
gulp.task('styles', function () {
  return gulp.src('./src/styles/*.css')
    .pipe(gulp.dest('./dist/styles'));
});

// html: for now just copying
// later may want to transform/minify
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
});

// test: for now just lint
// TODO: add tests
gulp.task('test', ['lint']);

gulp.task('serve', ['build'], function () {
  // serve dist files
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });

  // reload whenever dist files updated
  gulp.watch([
    'dist/**/*'
  ]).on('change', reload);

  // update dist files when source files change
  gulp.watch('./src/styles/*.css', ['styles']);
  gulp.watch('./src/app/**/*.*', ['scripts']);
  gulp.watch('./src/*.html', ['html']);
});

// copy to dist and size'r up
gulp.task('build', ['lint', 'scripts', 'styles', 'html'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

// clean dist and run build
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

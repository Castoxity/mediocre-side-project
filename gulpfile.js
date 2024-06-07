const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Task to concatenate and minify CSS files
function styles() {
  return src('src/css/**/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// Task to concatenate and minify JS files
function scripts() {
  return src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Task to watch for changes in CSS and JS files
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  watch('src/css/**/*.css', styles);
  watch('src/js/**/*.js', scripts);
  watch('*.html').on('change', browserSync.reload);
}

// Default task
exports.default = series(styles, scripts, watchFiles);

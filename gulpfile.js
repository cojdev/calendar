const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

const src = 'src';
const dist = 'docs';

// Parse and minify Sass
gulp.task('sass', () => gulp.src(`${src}/scss/**/main.scss`)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('main.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(`${dist}/css`)));


// Watch edits
gulp.task('watch', () => {
  gulp.watch(`${src}/**/*.scss`, ['sass']);
});

// Default task
gulp.task('default', gulp.series('sass', 'watch'));

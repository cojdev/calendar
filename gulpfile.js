const gulp = require('gulp');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const webpackConfig = require('./webpack.config');

const src = {
  js: 'src/js',
  css: 'src/scss',
};
const dist = 'docs';

function js() {
  webpackConfig.mode = 'development';
  return gulp.src(`${src.js}/index.js`)
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(`${dist}/js`))
    .pipe(browserSync.stream());
}

function css() {
  return gulp.src(`${src.css}/**/main.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${dist}/css`))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    open: false,
    server: {
      baseDir: './docs',
    },
  });

  gulp.watch(`${src.js}/**/*.js`, js);
  gulp.watch(`${src.js}/**/*.vue`, js);
  gulp.watch(`${src.css}/**/*.scss`, css);
  gulp.watch(`${dist}/*.html`).on('change', browserSync.reload);
}

exports.js = js;
exports.css = css;
exports.serve = gulp.series(js, css, serve);

exports.deploy = gulp.parallel(js, css);

exports.watch = () => {
  gulp.watch(`${src.js}/**/*.js`, js);
  gulp.watch(`${src.css}/**/*.scss`, css);
};

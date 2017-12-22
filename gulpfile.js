/**
 * Author: Charles Ojukwu
 */

var gulp = require('gulp'),

    // General
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    filter = require('gulp-filter'),

    // CSS
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano');

var sourceFolder = 'src';
var destFolder = 'docs';

// Parse and minify Sass
gulp.task('sass', function() {
return gulp.src(sourceFolder + '/scss/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destFolder + '/css'))
    .pipe(filter('**/*.css'))
    .pipe(rename('main.min.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destFolder + '/css'))
});

// Watch edits
gulp.task('watch', function(){
gulp.watch(sourceFolder + '/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass', 'watch']);
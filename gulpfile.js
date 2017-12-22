/**
 * Author: Charles Ojukwu
 */

var gulp = require('gulp'),

    // General
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    filter = require('gulp-filter'),

    // SCSS & CSS
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),

    // JavaScript
    uglify = require('gulp-uglify');

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

gulp.task('js', function() {
	return gulp.src(sourceFolder + '/js/main.js')
		.pipe(sourcemaps.init())
		.pipe(gulp.dest(destFolder + '/js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destFolder + '/js'))
});


// Watch edits
gulp.task('watch', function(){
    gulp.watch(sourceFolder + '/**/*.scss', ['sass']);
    gulp.watch(sourceFolder + '/**/*.js', ['js']);
});

// Default task
gulp.task('default', ['sass', 'watch']);
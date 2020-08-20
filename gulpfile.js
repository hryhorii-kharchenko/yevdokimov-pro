'use strict';
 
var log = require('fancy-log');

var gulp = require('gulp');
var watch = require('gulp-watch');
var watchSass = require("gulp-watch-sass");
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
 
sass.compiler = require('node-sass');
 

gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});


gulp.task("sass:watch", () =>
  watchSass("./assets/sass/**/*.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./assets/css'))
);
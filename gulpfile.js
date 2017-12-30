'use strict';
const del        = require('del');
const gulp       = require('gulp');
const sass       = require('gulp-sass');
const concat     = require('gulp-concat');
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

const autoprefixer = require('autoprefixer');

gulp.task('default', ['clean', 'sass'/*, 'webpack'*/], function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('clean', function () {
    return del(['./dist/*']);
});

gulp.task('sass', function () {
    return gulp.src('./src/all.scss')
    .pipe(sourcemaps.init())
    //.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass({outputStyle: 'expand'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css'));
});
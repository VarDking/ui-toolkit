'use strict';
const del        = require('del');
const gulp       = require('gulp');
const sass       = require('gulp-sass');
const concat     = require('gulp-concat');
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');

const autoprefixer = require('autoprefixer');

gulp.task('default', ['clean', 'sass', 'compile-js'], function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.js', ['compile-js']);
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


gulp.task('compile-js', function () {
    return gulp.src('./src/**/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js'))
});
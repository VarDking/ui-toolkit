'use strict';
const del          = require('del');
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const babel        = require('gulp-babel');
const gulpSequence = require('gulp-sequence');
const uglify       = require('gulp-uglify');

const autoprefixer = require('autoprefixer');

gulp.task('default', function () {
    gulpSequence(['clean'], ['sass', 'compile-js'], ['concat-js'], function () {
        gulp.watch('./src/**/*.scss', ['sass']);
        gulp.watch('./src/**/*.js', gulpSequence(['compile-js'], ['concat-js']));
    });
});

gulp.task('clean', function () {
    return del(['./dist/*']);
});

gulp.task('sass', function () {
    return gulp.src('./src/all.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile-js', function () {
    return gulp.src('./src/**/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('concat-js', function () {
    return gulp.src('./dist/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify({
        mangle: true
    }))
    .pipe(gulp.dest('./dist'))
});
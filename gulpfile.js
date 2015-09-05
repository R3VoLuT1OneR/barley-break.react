'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gwatch = require('gulp-util'),
    source = require('vinyl-source-stream'),
    exorcist = require('exorcist'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    babelify = require('babelify'),

    less = require('gulp-less');

var extensions = ['.es6', '.js', '.jsx'];

// Basic usage
gulp.task('browserify', function() {

    var bundler = browserify("app/app.js", {
        debug: true,
        extensions: extensions
    });

    bundler.transform(babelify.configure({
        extensions: extensions
    }));

    var bundle = function () {
        bundler
            .bundle()
            .on('error', function (err) {
                // browserSync.notify("Browserify Error!");
                gutil.log(err.message);
                this.emit("end");
            })
            .pipe(exorcist('public/assets/js/app.js.map'))
            .pipe(source('app.js'))
            .pipe(gulp.dest('public/assets/js'));
    };

    watchify(bundler).on('update', bundle);
    bundle();
});

gulp.task('less', function() {
    return gulp.src('app/assets/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch-less', ['less'], function() {
    gulp.watch('app/assets/less/**/*.less', ['less']);
});

gulp.task('default', ['browserify', 'watch-less']);

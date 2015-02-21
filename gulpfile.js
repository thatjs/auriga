var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    jslint = require('gulp-jslint'),
    karma = require('gulp-karma'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),

    merge = require('merge-stream'),

    path2 = require('path');


var webapp = 'src/main/webapp/',
    path = {
        css: webapp + 'css',
        js: webapp + 'js/thatjs',

    };

var jsSrc = path.js + '/**/*.js',
    jsOutPath = webapp + 'js/out',
    jsDest = 'target/build';


var config = require('./config/gulp');


// gulp public API
// ===============

gulp.task('install', function () {

    var jQuerySrc = path.js + '/jquery/**/*.js',
        angularSrc = path.js + '/angular/**/*.js',

        jquery = gulp.src(jQuerySrc)
            .pipe(concat('jquery-that.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(gulp.dest(jsOutPath))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js'}))
            .pipe(gulp.dest(jsDest))
            .pipe(gulp.dest(jsOutPath)),

        angular = gulp.src(angularSrc)
            .pipe(concat('angular-that.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(gulp.dest(jsOutPath))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js'}))
            .pipe(gulp.dest(jsDest))
            .pipe(gulp.dest(jsOutPath));


    return merge(jquery, angular);

});

gulp.task('clean', function () {
    return gulp.src(['target', path.css, jsOutPath], { read: false})
        .pipe(clean());
});

gulp.task('lint', function () {
    return gulp.src(jsSrc)
        .pipe(jslint(config.jslint))
});

gulp.task('test', function () {
    return gulp
        .src([])  // use config file globs
        .pipe(karma({
            configFile: config.karma.configFile,
            action: 'run'  // run tests once, then exit
        }))
        .on('error', function (err) {
            throw err;  // make sure gulp exits non-zero on error
        });

});

gulp.task('tdd', function (callback) {
    gulp.src([])
        .pipe(karma({
            configFile: config.karma.configFile,
            action: 'watch'  // run tests, watch files and run when files change
        }));
});

gulp.task('default', function() {
  // place code for your default task here
  gUtil.log(jsSrc);
  gUtil.log(jsGlob);
  gUtil.log(jsPath + 'angular/**/*.js');
  gUtil.log(jsPath + 'angular/' + jsGlob);

  gUtil.log('== default task executed ==');

});

//gulp.task('build', ['clean'], function () {
//    return gulp.src(jsPath + 'thatjs/jquery/**/.js')
//        .pipe(concat())
//        .pipe(gulp.dest(jsOutPath + 'jquery/that.js'));
//});

//gulp.task('default', function() {
//  // place code for your default task here
//  gUtil.log('== default task executed ==');
//});

//function runKarma(configFilePath, options, callback) {
//
//    configFilePath = path.resolve(configFilePath);
//
//    var server = karma.server,
//        log = gUtil.log,
//        colors = gUtil.colors,
//        config = karmaParseConfig(configFilePath, {});
//
//    Object.keys(options).forEach(function (key) {
//        config[key] = options[key];
//    });
//
//    server.start(config, function (exitCode) {
//        log('Karma has exited with ' + colors.red(exitCode));
//        callback();
//        process.exit(exitCode);
//    });
//}

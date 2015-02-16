var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    jslint = require('gulp-jslint'),
    karma = require('gulp-karma'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),

    path = require('path');


var webapp = 'src/main/webapp/',
    cssPath = webapp + 'css',
    jsPath = webapp + 'js/thatjs/',
    jsGlob = '**/*.js',
    jsSrc = jsPath + jsGlob,
    jsOutPath = webapp + 'js/out',
    jsDest = 'target/build';


var config = require('./config/gulp');



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

function build(config, options, callback) {

    var src,
        i,
        len = config.length,
        exit;

    for (i = 0; i < len; i++) {


        // test execution inside function
        exit = gulp.src(jsPath + 'angular/**/*.js')
            .pipe(concat('that.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js'}))
            .pipe(gulp.dest(jsDest));
    }

    gUtil.log('exit = ' + exit);
}


gulp.task('default', function() {
  // place code for your default task here
  gUtil.log(jsSrc);
  gUtil.log(jsGlob);
  gUtil.log(jsPath + 'angular/**/*.js');
  gUtil.log(jsPath + 'angular/' + jsGlob);

  gUtil.log('== default task executed ==');
});


gulp.task('install', function () {
    build(config.assemble);
//    return gulp.src(jsPath + 'angular/**/*.js')
//        .pipe(concat('build/that.js'))
//        .pipe(gulp.dest(jsDest))
//        .pipe(uglify())
//        .pipe(rename({ extname: '.min.js'}))
//        .pipe(gulp.dest(jsDest));

});

gulp.task('clean', function () {
    return gulp.src(['target', cssPath, jsOutPath], { read: false})
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

//gulp.task('build', ['clean'], function () {
//    return gulp.src(jsPath + 'thatjs/jquery/**/.js')
//        .pipe(concat())
//        .pipe(gulp.dest(jsOutPath + 'jquery/that.js'));
//});

//gulp.task('default', function() {
//  // place code for your default task here
//  gUtil.log('== default task executed ==');
//});
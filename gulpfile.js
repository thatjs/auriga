var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),

    path = require('path'),
    karma = require('karma');

//    karmaParseConfig = require('node_modules/karma/lib/config.js').parseConfig

var webapp = 'src/main/webapp/',
    cssPath = webapp + 'css',
    jsOutPath = webapp + 'js/out';


function runKarma(configFilePath, options, callback) {

    configFilePath = path.resolve(configFilePath);

    var server = karma.server,
        log = gUtil.log,
        colors = gUtil.colors,
        config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function (key) {
        config[key] = options[key];
    });

    server.start(config, function (exitCode) {
        log('Karma has exited with ' + colors.red(exitCode));
        callback();
        process.exit(exitCode);
    });
}

gulp.task('clean', function () {
    return gulp
        .src(['target', cssPath, jsPath], { read: false})
        .pipe(clean());
});

gulp.task('test', function (callback) {
    runKarma('karma.conf.js', {
        autoWatch: false,
        singleRun: true
    }, callback);
});

gulp.task('tdd', function (callback) {
    runKarma('karma.conf.js', {
        autoWatch: true,
        singleRun: false
    }, callback);
});

//gulp.task('build', ['clean'], function () {
//    return gulp.src(jsPath + 'thatjs/jquery/**/.js')
//        .pipe(concat())
//        .pipe(gulp.dest(jsOutPath + 'jquery/that.js'));
//});

gulp.task('default', function() {
  // place code for your default task here
  gUtil.log('== default task executed ==');
});
"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

var config = {
    port: 9090,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start a local development server
gulp.task('connect', function() {
    return connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', gulp.series('connect', function() {
    return gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
}));

gulp.task('html', function() {
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    return browserify(config.paths.mainJs)
        .transform(babelify, {presets: ["@babel/preset-env", "@babel/preset-react"]})
        .bundle()
        .on('error', console.error.bind(console)) // eslint-disable-line no-console
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    return gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + "/images"))
        .pipe(connect.reload());
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint())
        .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, gulp.series('html'));
    gulp.watch(config.paths.js, gulp.series('js', 'lint'));
    return;
});

gulp.task('default', gulp.series('html', 'js', 'css', 'images', 'lint', 'open', 'watch'));

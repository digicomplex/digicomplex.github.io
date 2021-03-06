"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const purgecss = require('gulp-purgecss')

// Load package.json for banner
const pkg = require('./package.json');


// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean vendor
function clean() {
    return del(["./vendor/"]);
}


// CSS task
function css() {
    return gulp
        .src("./assets/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded",
            includePaths: "./node_modules",
        }))
        .on("error", sass.logError)
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("./assets/css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./assets/css"))
        .pipe(browsersync.stream());
}

// JS task
function js() {
    return gulp
        .src([
            './assets/javascript/*.js',
            '!./assets/javascript/*.min.js'
        ])
        // .pipe(uglify())
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        // .pipe(gulp.dest('./assets/js'))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch("./assets/scss/**/*", css);
    gulp.watch(["./assets/javascript/**/*", "!./assets/javascript/**/*.min.js"], js);
    gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean);
const build = gulp.series(vendor, gulp.parallel(css));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;

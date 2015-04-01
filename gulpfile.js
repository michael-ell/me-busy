var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del'),
    karma = require('karma').server,
    tmp = '.tmp/',
    stylusFiles = 'src/**/*.styl',
    jsFiles = 'src/**/*.js',
    dist = 'dist';

gulp.task('bundle', ['clean', 'css', 'js']);

gulp.task('clean', function() {
    var cleaned = del.sync([tmp, dist]);
    console.log('Cleaned:', cleaned.join(', '));
});

gulp.task('css', ['stylus'], function () {
    gulp.src(['./.tmp/**/*.css'])
        .pipe(plugins.plumber())
        .pipe(plugins.concat('me-busy.css'))
        .pipe(gulp.dest('./dist/'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('stylus', function () {
    return gulp.src(stylusFiles)
        .pipe(plugins.plumber())
        .pipe(plugins.stylus())
        .pipe(gulp.dest(tmp));
});

gulp.task('js', ['lint'], function(){
    return gulp.src(jsFiles)
        .pipe(plugins.concat('me-busy.js'))
        .pipe(gulp.dest(dist))
        .pipe(plugins.uglify({mangle: true}))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(dist))
});

gulp.task('lint', function(){
    return gulp.src(jsFiles)
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default', {verbose: true}));
});

gulp.task('test', function(done){
    test(false, done);
});

gulp.task('test-ci', function(done){
    test(true, done);
});

function test(ci, done){
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: ci
    }, done);
}

gulp.task('watch', function(){
        gulp.start('bundle-css-watch', 'bundle-js-watch');
    }
);

gulp.task('bundle-css-watch', function(){
    gulp.watch([stylusFiles], ['css']);
});

gulp.task('bundle-js-watch', function(){
    gulp.watch([jsFiles], ['js']);
    gulp.start('test');
});

gulp.task('default', ['bundle', 'watch']);
import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import pimport from 'postcss-import';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';

export const html = () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('public'));
}

export const styles = () => {
    return gulp.src('src/css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            pimport,
            minmax,
            autoprefixer,
            csso,
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/css'))
};

export const scripts = () => {
    return browserify('src/js/script.js', { debug: true })
    .transform(babelify)
    .transform('@browserify/uglifyify', { global: true  })
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
     .pipe(source('script.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/js'));
};

export const copy = () => {
    return gulp.src([
            'src/img/**/*',
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('public/img'))
};

export const paths = () => {
    return gulp.src('public/*.html')
        .pipe(replace(
            ' type="module"', ''
        ))
        .pipe(gulp.dest('public'));
};

export default gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    ),
    paths,
);
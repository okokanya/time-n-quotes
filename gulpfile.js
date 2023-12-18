import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
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
    return gulp.src('src/css/*.css')
        .pipe(postcss([
            pimport,
            minmax,
            autoprefixer,
            csso,
        ]))
        .pipe(replace(/\.\.\//g, ''))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/css'))
};

export const scripts = () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            'presets': ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/js'))
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
            /(<script src=".\/js\/toggle-theme.js" async><\/script>)/, ''
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
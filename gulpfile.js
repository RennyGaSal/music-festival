import {src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

// Compile JS
export function js(done) {
    src('src/js/app.js')
        .pipe(dest('build/js'))
    done();
}

// Compile CSS
export function css ( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass().on('error', sass.logError) )
        .pipe ( dest ('build/css', {sourcemaps: '.'}) )

    done()
}

// Development Watchers
export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}


// Prod Build
export const build = series(js, css)

// Dev Build
export default series(build, dev)
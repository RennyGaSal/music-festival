import {src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import terser from 'gulp-terser'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { glob } from 'glob'

const sass = gulpSass(dartSass)

// Compile JS
export function js(done) {
    src('src/js/app.js')
        .pipe(terser())
        .pipe(dest('build/js'))
    done();
}

// Compile CSS
export function css ( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass.sync().on('error', sass.logError) )
        .pipe(postcss([cssnano()]))
        .pipe ( dest ('build/css', {sourcemaps: '.'}) )

    done()
}


export async function crop() {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb'
    const width = 250
    const height = 180

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }

    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file))
    })

    try {
        await Promise.all(
            images.map(file => {
                const inputFile = path.join(inputFolder, file)
                const outputFile = path.join(outputFolder, file)
                return sharp(inputFile)
                    .resize(width, height, { position: 'center' })
                    .toFile(outputFile)
            })
        )
    } catch (error) {
        console.error(error)
    }
}

// Convert Images to Webp
export async function images(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        processImages(file, outputSubDir);
    });
    done();
}

function processImages(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

// Development Watchers
export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{png, jpg', images)
}


// Prod Build
export const build = series(crop, js, images, css)

// Dev Build
export default series(build, dev)
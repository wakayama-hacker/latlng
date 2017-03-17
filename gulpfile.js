'use strict'

const browserify  = require( 'browserify' )
const buffer      = require( 'vinyl-buffer' )
const gulp        = require( 'gulp' )
const riotify     = require( 'riotify' )
const uglify      = require( 'gulp-uglify' )
const source      = require( 'vinyl-source-stream' )
const sass        = require( 'gulp-sass' )

gulp.task( 'css', () => {
  gulp.src( [
    'node_modules/leaflet/dist/leaflet.css',
  ] )
		.pipe( gulp.dest( 'css' ) )
} )

gulp.task( 'css-images', () => {
  gulp.src( [
    'node_modules/leaflet/dist/images/*',
  ] )
		.pipe( gulp.dest( 'css/images/' ) )
} )

gulp.task( 'js', function ( cb ) {
  browserify( {
    entries: [ 'src/app.js' ]
  } )
  .transform( riotify )
  .bundle()
  .pipe( source( 'app.min.js' ) )
  .pipe( buffer() )
  .pipe( uglify() )
  .pipe( gulp.dest( 'js' ) )
  .on( 'end', cb )
} )

gulp.task( 'sass', () => {
  return gulp.src( './src/style.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './css' ) )
} )

gulp.task( 'default', [
  'js',
  'css',
  'css-images',
  'sass',
] )

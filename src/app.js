const config = require( '../config.json' )

require("babel-polyfill")

global.$ = global.jQuery = require('jquery');

const riot = require( 'riot' )
const L = require( 'leaflet' )
const bootstrap = require( 'bootstrap' )

const map = require( '../tags/map.tag' )

const latlng = localStorage.getItem( 'location' )
if ( location.hash ) {
  [ config.zoom, config.lat, config.lng ] = location.hash.replace( /^#/, '' ).split( ',' )
} else if ( latlng ) {
  [ config.zoom, config.lat, config.lng ] = latlng.split( ',' )
  location.hash = config.zoom + ',' + config.lat + ',' + config.lng
}

riot.mount( map, {
  lat: config.lat,
  lng: config.lng,
  zoom: config.zoom,
  layers: config.layers
} )

$( window ).on( 'hashchange', () => {
  const latlng = location.hash.replace( /^#/, '' )
  window.localStorage.setItem( 'location', latlng )
} )

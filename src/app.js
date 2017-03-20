const config = require( '../config.json' )

require("babel-polyfill")

const $ = require( 'jquery' )
const riot = require( 'riot' )
const L = require( 'leaflet' )

const map = require( '../tags/map.tag' )

const latlng = localStorage.getItem( 'location' )
if ( latlng ) {
  [ config.zoom, config.lat, config.lng ] = latlng.split( ',' )
  location.hash = config.zoom + ',' + config.lat + ',' + config.lng
} else if ( location.hash ) {
  [ config.zoom, config.lat, config.lng ] = location.hash.replace( /^#/, '' ).split( ',' )
}

$( '#map' ).on( 'click', '.latlng', ( e ) => {
  const r = document.createRange()
  r.selectNodeContents( e.target )
  window.getSelection().addRange( r )
} )

riot.mount( map, {
  lat: config.lat,
  lng: config.lng,
  zoom: config.zoom,
  "layers": config.layers
} )

$( window ).on( 'hashchange', () => {
  const latlng = location.hash.replace( /^#/, '' )
  window.localStorage.setItem( 'location', latlng )
} )

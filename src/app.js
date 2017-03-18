const config = require( '../config.json' )

require("babel-polyfill")

const $ = require( 'jquery' )
const riot = require( 'riot' )
const L = require( 'leaflet' )

const map = require( '../tags/map.tag' )

if ( location.hash ) {
  const hash = location.hash.replace( /^#/, '' )
  const [ zoom, lat, lng ] = hash.split( ',' )
  if ( zoom ) {
    config.zoom = zoom
  }
  if ( lat && lng ) {
    config.lat = lat
    config.lng = lng
  }
}

$( '#map' ).on( 'click', '.latlng', ( e ) => {
  const r = document.createRange();
  r.selectNodeContents( e.target );
  window.getSelection().addRange( r );
} )

riot.mount( map, {
  lat: config.lat,
  lng: config.lng,
  zoom: config.zoom,
  "layers": config.layers
} )

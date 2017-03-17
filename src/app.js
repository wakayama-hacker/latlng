const config = require( '../config.json' )

const $ = require( 'jquery' )
const riot = require( 'riot' )
const L = require( 'leaflet' )

const map = require( '../tags/map.tag' )

var lat = config.lat
var lng = config.lng
var zoom = config.zoom

if ( location.hash ) {
  const hash = location.hash.replace( /^#/, '' )
  const pos = hash.split( ',' )
  if ( 3 === pos.length ) {
    zoom = pos[0]
    lat = pos[1]
    lng = pos[2]
  }
}

$( '#map' ).on( 'click', '.latlng', function( e ) {
  const r = document.createRange();
  r.selectNodeContents( this );
  window.getSelection().addRange( r );
} )

riot.mount( map, {
  lat: lat,
  lng: lng,
  zoom: zoom,
  "layers": config.layers
} )

const config = require( '../config.json' )

const $ = require( 'jquery' )
const riot = require( 'riot' )
const L = require( 'leaflet' )

const map = require( '../tags/map.tag' )

if ( location.hash ) {
  const hash = location.hash.replace( /^#/, '' )
  const pos = hash.split( ',' )
  if ( 3 === pos.length ) {
    config.zoom = pos[0]
    config.lat = pos[1]
    config.lng = pos[2]
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

const $ = require( 'jquery' )
const riot = require( 'riot' )
const L = require( 'leaflet' )

const map = require( '../tags/map.tag' )

var lat = 35.7090
var lng = 139.7320
var zoom = 5

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
  "layers": [
    {
      "name": "Open Street Map",
      "tile": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "attribution": "OpenStreetMap Contributers",
      "attribution_url": "http://osm.org/copyright"
    },
  ]
} )

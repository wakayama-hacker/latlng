const $ = require( 'jquery' )
const riot = require( 'riot' )
const L = require( 'leaflet' )

const map = require( '../tags/map.tag' )

riot.mount( map, {
  lat: 35.7090,
  lng: 139.7320,
  zoom: 5,
  "layers": [
    {
      "name": "Open Street Map",
      "tile": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "attribution": "OpenStreetMap Contributers",
      "attribution_url": "http://osm.org/copyright"
    },
    {
      "name": "空中写真",
      "tile": "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
      "attribution": "GSI Japan",
      "attribution_url": "http://maps.gsi.go.jp/development/ichiran.html"
    },
  ]
} )

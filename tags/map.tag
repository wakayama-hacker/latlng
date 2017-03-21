<map class="map" style="width: 100%; height: 100%;">
  <script type="es6">
    const Clipboard = require( 'clipboard' )
    const div = document.createElement( 'div' )
    this.root.appendChild( div )
    div.style.width = '100%'
    div.style.height = '100%'

    if ( ! opts.zoom ) {
      opts.zoom = 14
    }

    const map = L.map( div ).setView( new L.LatLng( opts.lat, opts.lng ), opts.zoom )

    const layers = opts.layers

    const basemaps = {}
    for ( var i = 0; i < layers.length; i++ ) {
      const layer = L.tileLayer( layers[ i ].tile, {
        id: i,
        attribution: '<a href="' + layers[ i ].attribution_url + '" target="_blank">' + layers[ i ].attribution + '</a>'
      } )
      basemaps[ layers[ i ].name ] = layer
      if ( 0 === i ) {
        map.addLayer( layer )
      }
    }

    if ( layers.length > 1 ) {
      L.control.layers( basemaps, {}, { position: 'bottomleft' } ).addTo( map )
    }

    const marker = L.marker()
    map.on( 'click', ( e ) => {
      marker.setLatLng( [ e.latlng.lat, e.latlng.lng ] ).addTo( map )
        .bindPopup( '<table class="latlng">'
          + `<tr><td>Lat</td><td>${e.latlng.lng}</td><td><button class="copy" data-clipboard-text="${e.latlng.lat}"><i class="glyphicon glyphicon-copy"></i></button></td></tr>`
          + `<tr><td>Lng</td><td>${e.latlng.lng}</td><td><button class="copy" data-clipboard-text="${e.latlng.lng}"><i class="glyphicon glyphicon-copy"></i></button></td></tr></table>` )
        .openPopup()

      const clipboard = new Clipboard( '.copy' )

      $( '.copy' ).tooltip( {
        trigger: 'click',
        placement: 'bottom',
        title: "Copied"
      } )

      $( '.copy' ).on( 'show.bs.tooltip', ( e ) => {
        setTimeout( () => {
          $( e.target ).tooltip( 'hide' )
        }, 1000 )
      } )
    } )

    map.on( 'moveend', ( e ) => {
      const zoom = e.target._zoom
      const center = map.getCenter()
      const lat = center.lat
      const lng = center.lng
      location.hash = zoom + ',' + lat + ',' + lng
    } )
  </script>
</map>

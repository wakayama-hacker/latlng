<map class="map" style="width: 100%; height: 100%;">
  <script type="es6">
    const div = document.createElement( 'div' )
    this.root.appendChild( div )
    div.style.width = '100%'

    const map = L.map( div )

    const show_map = function() {
      div.style.height = '100%'

      if ( ! opts.zoom ) {
        opts.zoom = 14
      }

      map.setView( new L.LatLng( opts.lat, opts.lng ), opts.zoom )

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

      L.control.layers( basemaps, {}, { position: 'bottomleft' } ).addTo( map )

      map.on( 'click', function( e ) {
          L.marker( [ e.latlng.lat, e.latlng.lng ] ).addTo( map )
              .bindPopup( e.latlng.lat + ',' + e.latlng.lng )
              .openPopup();
      } )
    }

    window.addEventListener( 'resize', function() {
      if ( global.resizeTimer !== false ) {
        clearTimeout( global.resizeTimer )
      }
      global.resizeTimer = setTimeout( function() {
        show_map()
      }, Math.floor( 1000 / 60 * 10 ) )
    } )

    show_map()
  </script>
</map>

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

    if ( isNaN( parseInt( opts.zoom ) ) ) {
      opts.zoom = 0
    }

    if ( isNaN( parseFloat( opts.lat ) ) ) {
      opts.lat = 0
    }

    if ( isNaN( parseFloat( opts.lng ) ) ) {
      opts.lng = 0
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
      let lat = e.latlng.lat
      let lng = e.latlng.lng
      if ( lng > 180 ) {
        while( lng > 180 ) {
          lng = lng - 360
        }
      } else if ( lng < -180 ) {
        while( lng < -180 ) {
          lng = lng + 360
        }
      }
      marker.setLatLng( [ e.latlng.lat, e.latlng.lng ] ).addTo( map )
        .bindPopup( '<table class="latlng">'
          + `<tr><td>Latitude</td><td>${lat}</td><td><button class="copy" data-clipboard-text="${lat}"><i class="glyphicon glyphicon-copy"></i></button></td></tr>`
          + `<tr><td>Longitude</td><td>${lng}</td><td><button class="copy" data-clipboard-text="${lng}"><i class="glyphicon glyphicon-copy"></i></button></td></tr></table>` )
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
      let zoom = e.target._zoom
      const center = map.getCenter()
      let lat = center.lat
      let lng = center.lng
      if ( lng > 180 ) {
        while( lng > 180 ) {
          lng = lng - 360
        }
      } else if ( lng < -180 ) {
        while( lng < -180 ) {
          lng = lng + 360
        }
      }
      location.hash = zoom + ',' + lat + ',' + lng
    } )
  </script>
</map>

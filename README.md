# latlng

[![Build Status](https://travis-ci.org/wakayama-hacker/latlng.svg?branch=master)](https://travis-ci.org/wakayama-hacker/latlng)

It allows you to click to get the Lat & Lng with Open Street Map.

http://latlng.wacker.io/

## Getting Started

```
$ git clone git@github.com:wakayama-hacker/latlng.git
$ cd latlng
$ npm install
$ npm run build
$ npm start
```

## Configuration

Please edit `config.json`.

```
{
  "lat": "35.7090",
  "lng": "139.7320",
  "zoom": "5",
  "layers": [
    {
      "name": "Open Street Map",
      "tile": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "attribution": "OpenStreetMap Contributers",
      "attribution_url": "http://osm.org/copyright"
    },
  ]
}
```

Then run `npm run build`

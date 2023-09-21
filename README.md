Geo-XY
==========

A set of functions to translate spherical approximation of an earth
angular coordinates (lat, lng) to a cartesian coordinates (x, y) in meters on
an adjacent to sphere plane in some center point and then translate
back to display on a map.

Y axis points north, X axis points east and center point is (0, 0)

Works with good practical precission (displaying on a map [mapbox, leaflet, google]
with max zoom) within at least 20 miles from a center point.

installation:
```shell
npm install geo-xy
```

In nodejs:
```js
const { getDistance, getXY, getLoc, getCos, radius, equator } = require('geo-xy');
```

In ES:
```js
import { getDistance, getXY, getLoc, getCos, radius, equator } from 'geo-xy';
```

API
---
### getting distance between two points on a sphere
```js
const loc1 = { lat: 38.81386719961395, lng: -77.63939566803032 };
const loc2 = { lat: 38.81893787679193, lng: -77.64367520109566 };

const dist = getDistance(loc1, loc2);
```

### getting xy from loc {lat, lng}
```js
const center = { lat: 38.81386719961395, lng: -77.63939566803032 };
const loc = { lat: 38.81893787679193, lng: -77.64367520109566 };

const xy = getXY(loc, center); // meters from center
```

### getting loc from xy {x, y}
```js
const center = { lat: 38.81386719961395, lng: -77.63939566803032 };
const xy = { x: -500, y: 500}; // meters from center
const loc = getLoc(xy, center);
```

### getting cos between center->loc1 and center->loc2
```js
const center = { lat: 38.81386719961395, lng: -77.63939566803032 };
const loc1 = { lat: 38.81893787679193, lng: -77.64367520109566 };
const loc2 = { lat: 38.82125452560183, lng: -77.65106786822315 };

const xy1 = getXY(loc1, center);
const xy2 = getXY(loc2, center);

const cosValue = getCos(xy1, xy2);
```
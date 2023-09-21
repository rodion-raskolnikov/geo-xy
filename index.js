/**
 * Created by https://github.com/rodion-raskolnikov
 * 
 * set of functions to translate spherical approximation of an earth
 * angular coordinates (lat, lng) to a cartesian coordinates (x, y) on
 * an adjacent to sphere plane in some center point and then translate
 * back to display on a map
 * 
 */

const radius = 6378137;
const equator = radius * 2 * Math.PI;

const TO_RAD = Math.PI / 180;
const TO_DEG = 1 / TO_RAD;

const toRad = (deg) => deg * TO_RAD;
const toDeg = (rad) => rad * TO_DEG;

/**
 * 
 * distance between two points on a sphere
 * 
 * @param {{ lat: number, lng: number }} start 
 * @param {{ lat: number, lng: number }} end 
 * @returns { number }
 * 
 **/
const getDistance = (start, end) =>
    Math.round(
        Math.acos(
            Math.sin(toRad(end.lat)) * Math.sin(toRad(start.lat))
            + Math.cos(toRad(end.lat)) * Math.cos(toRad(start.lat)) * Math.cos(toRad(start.lng - end.lng)),
        ) * radius,
    );

/**
 * 
 * translates lat, lng to xy in meters with center being (0, 0)
 * and y points north and x points east
 * 
 * @param {{ lat: number, lng: number }} loc 
 * @param {{ lat: number, lng: number }} center 
 * @returns {{ x: number, y: number }}
 * 
 **/
const getXY = (loc, center) => {
    const x = toRad(loc.lng - center.lng) * radius * Math.cos(toRad(center.lat));
    const y = toRad(loc.lat - center.lat) * radius;
    return { x, y };
};

/**
 * 
 * translates xy off of a center to lat, lng
 * center should be the same point that were used to produce xy
 * 
 * @param {{ x: number, y: number }} xy 
 * @param {{ lat: number, lng: number }} center 
 * @returns {{ lat: number, lng: number }}
 * 
 **/
const getLoc = (xy, center) => {
    const lat = center.lat + toDeg(xy.y / radius);
    const lng = center.lng + toDeg(xy.x / (radius * Math.cos(toRad(center.lat))));
    return { lat, lng };
};

/**
 * 
 * cosine of an angle between center to xy1 and center to xy2
 * could be useful in determining if xy1 and xy2 are about in the
 * same direction from center
 * 
 * @param {{ x: number, y: number }} xy1
 * @param {{ x: number, y: number }} xy2 
 * @returns { number }
 * 
 **/
const getCos = (xy1, xy2) => {
    const scalarProduct = xy1.x * xy2.x + xy1.y * xy2.y;
    const mod1 = Math.sqrt(xy1.x * xy1.x + xy1.y * xy1.y);
    const mod2 = Math.sqrt(xy2.x * xy2.x + xy2.y * xy2.y);
    return scalarProduct / (mod1 * mod2);
};

module.exports = {
    getDistance,
    getXY,
    getLoc,
    getCos,
    radius,
    equator,
}

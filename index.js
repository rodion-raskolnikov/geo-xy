/**
 * Created by https://github.com/rodion-raskolnikov
 */

const radius = 6378137;
const equator = radius * 2 * Math.PI;

const TO_RAD = Math.PI / 180;
const TO_DEG = 1 / TO_RAD;

const toRad = (deg) => deg * TO_RAD;
const toDeg = (rad) => rad * TO_DEG;

/**
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

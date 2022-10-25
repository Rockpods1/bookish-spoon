const RADIUS = image.width / (2 * Math.PI);
const VERTICAL_ANGLE = Math.atan2(image.height / 2, RADIUS);

/*
function drawTarget(lon,lat) {
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;

  var x = (lon+Math.PI)*RADIUS;

  var y = (VERTICAL_ANGLE-lat)*image.height/2*VERTICAL_ANGLE;
  console.log(x,y);
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.stroke();
}
*/

class Coordinates {
  constructor(lon, lat) {
    this.lon = lon;
    this.lat = lat;
  }

  static radianToDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  static degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  static longitudeToX(lon) {
    return (lon + Math.PI) * RADIUS;
  }

  static latitudeToY(lat) {
    return (((VERTICAL_ANGLE - lat) * image.height) / 2) * VERTICAL_ANGLE;
  }

  static angularDistanceRadians(lon1, lat1, lon2, lat2) {
    return Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
    );
  }

  static angularDistanceDegrees(lon1, lat1, lon2, lat2) {
    var lon1Rad = this.degreesToRadians(lon1);
    var lat1Rad = this.degreesToRadians(lat1);
    var lon2Rad = this.degreesToRadians(lon2);
    var lat2Rad = this.degreesToRadians(lat2);
    return this.radianToDegrees(
      this.angularDistanceRadians(lon1Rad, lat1Rad, lon2Rad, lat2Rad)
    );
  }

  static getIntermediatePoint(lon1, lat1, lon2, lat2, f) {
    var delta = this.angularDistanceRadians(lon1, lat1, lon2, lat2);

    var a = Math.sin((1 - f) * delta) / Math.sin(delta);

    var b = Math.sin(f * delta) / Math.sin(delta);

    var x =
      a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2);

    var y =
      a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2);

    var z = a * Math.sin(lat1) + b * Math.sin(lat2);

    var lat = Math.atan2(z, Math.sqrt(x * x + y * y));

    var lon = Math.atan2(y, x);

    return new Coordinates(lon, lat);
  }

  static getBearing(lon1, lat1, lon2, lat2) {
    var y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    var x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    var brng = Math.atan2(y, x);
    return brng;
  }
}

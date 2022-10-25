//Silo Properties
const SILOS_NUM = 7;
const SILO_SIZE = 10;

class Silo {
  static silos = [
    new Silo(0.7, 0.55),
    new Silo(1.0, 0.5),
    new Silo(1.4, 0.6),
    new Silo(1.65, 0.35),
    new Silo(1.77, 0.23),
    new Silo(1.8, 0.5),
    new Silo(2, 0.6),
  ];

  constructor(lon, lat) {
    this.lon = lon;
    this.lat = lat;
  }

  static drawSilos() {
    ctx.strokeStyle = "darkred";
    ctx.lineWidth = LINE_WIDTH;
    for (var i = 0; i < Silo.silos.length; i++) {
      var x = Coordinates.longitudeToX(Silo.silos[i].lon);
      var y = Coordinates.latitudeToY(Silo.silos[i].lat);

      ctx.beginPath();
      ctx.rect(x, y, SILO_SIZE, SILO_SIZE);
      ctx.stroke();
    }
  }
}

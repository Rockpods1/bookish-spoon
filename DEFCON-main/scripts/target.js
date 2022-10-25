//Target Properties
const TARGET_SIZE = 30;
const TARGET_X = 470;
const TARGET_Y = 505;
const TARGET_RADIUS = 110;
const CRITICAL_RADIUS = 100;

class Target {
  static targets = [
    new Target(-1.68, 0.3),
    new Target(-1.55, 0.38),
    new Target(-1.35, 0.36),
    new Target(-1.93, 0.32),
    new Target(-1.97, 0.41),
    new Target(-2.4, 0.65),
    new Target(-1.39, 0.3),

  ];

  constructor(lon, lat) {
    this.lon = lon;
    this.lat = lat;
  }

  static drawTargets() {
    ctx.strokeStyle = "green";
    ctx.lineWidth = LINE_WIDTH;
    for (var i = 0; i < Target.targets.length; i++) {
      var x = Coordinates.longitudeToX(Target.targets[i].lon);
      var y = Coordinates.latitudeToY(Target.targets[i].lat);

      ctx.beginPath();
      ctx.rect(x, y, SILO_SIZE, SILO_SIZE);
      ctx.stroke();
    }
  }
}

function checkForCollisions() {
  for (var i = 0; i < nukes.length; i++) {
    if (
      distBetweenPoints(TARGET_X, TARGET_Y, nukes[i].x, nukes[i].y) <
      CRITICAL_RADIUS
    ) {
      isGameLost = true;
      return;
    }
  }
}

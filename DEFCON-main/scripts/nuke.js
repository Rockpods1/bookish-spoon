//Nuke Properties
var NUKES_NUM = 9; //Starting number of nukes
const NUKE_SIZE = 4; //Nuke size in pixels
var NUKE_SPEED = 0.0005; //Nuke speed
const NUKE_VERT = 3; //Nuke vertices
const NUKE_TIME = 30;

let nukeTimer = 0;

class Nuke {
  static nukes = [];

  static nukeTimer = 0;

  constructor(lon, lat, targetLon, targetLat) {
    this.lon = lon;
    this.lat = lat;
    this.targetLon = targetLon;
    this.targetLat = targetLat;
    this.pathProgress = 0;
    this.blinkTimer = 0;
    this.visible = true;
  }

  draw() {
    if(this.blinkTimer>0.3)
    {
      this.blinkTimer = 0;
      this.visible = !this.visible;
    }
    this.blinkTimer+=0.1;
    if(!this.visible)return;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    var coords = Coordinates.getIntermediatePoint(
      this.lon,
      this.lat,
      this.targetLon,
      this.targetLat,
      this.pathProgress
    );
    var x = (coords.lon + Math.PI) * RADIUS;

    var y =
      (((VERTICAL_ANGLE - coords.lat) * image.height) / 2) * VERTICAL_ANGLE;

    var angle =
      Coordinates.getBearing(
        coords.lon,
        coords.lat,
        this.targetLon,
        this.targetLat
      ) -
      Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(
      x + NUKE_SIZE * Math.cos(angle),
      y + NUKE_SIZE * Math.sin(angle)
    );
    ctx.lineTo(
      x + NUKE_SIZE * Math.cos(angle + 2.8),
      y + NUKE_SIZE * Math.sin(angle + 2.8)
    );
    ctx.lineTo(
      x + NUKE_SIZE * Math.cos(angle - 2.8),
      y + NUKE_SIZE * Math.sin(angle - 2.8)
    );
    ctx.closePath();
    ctx.stroke();
  }

  static addNuke() {
    for (var i = 0; i < Nuke.nukes.length; i++) {
      if (Nuke.nukes[i].pathProgress > 1) {
        Nuke.nukes.splice(i, 1);
      }
    }
    if (nukeTimer < NUKE_TIME) {
      nukeTimer++;
      return;
    } else {
      nukeTimer = 0;
      if (Nuke.nukes.length < NUKES_NUM) {
        var silo =
          Silo.silos[
            Math.abs(Math.floor(Math.random() * 1000)) % Silo.silos.length
          ];
        var targ =
          Target.targets[
            Math.abs(Math.floor(Math.random() * 1000)) % Target.targets.length
          ];
        Nuke.nukes.push(new Nuke(silo.lon, silo.lat, targ.lon, targ.lat));
      }
    }
  }

  static drawNukes() {
    for (var i = 0; i < Nuke.nukes.length; i++) {
      Nuke.nukes[i].draw();
    }
  }

  static moveNukes() {
    for (var i = 0; i < Nuke.nukes.length; i++) {
      Nuke.nukes[i].pathProgress += NUKE_SPEED;
    }
    this.destroyTargets();
  }

  static destroyNearestNuke()
  {
    if(Nuke.nukes.length <= 0)
    {
      return;
    }
    
    var nearestNukeIndex = 0;
    var greatestProgress = 0;
    for(var i = 0; i < Nuke.nukes.length; i++)
    {
      if(Nuke.nukes[i].pathProgress < greatestProgress)
      {
        nearestNukeIndex = i;
        greatestProgress = Nuke.nukes[i].pathProgress();
      }
    }
    console.log(nearestNukeIndex);
    NUKE_SPEED+=0.0001;
    NUKES_NUM++;
    Nuke.nukes.splice(nearestNukeIndex,1);
  }

  static destroyTargets()
  {
    if(Nuke.nukes.length >= 1 && Nuke.nukes[0].pathProgress>= 1)
    {
      var nuke = Nuke.nukes[0];
      for(var i = 0; i < Target.targets.length; i++)
      {
        if(Target.targets[i].lat == nuke.targetLat && Target.targets[i].lon == nuke.targetLon)
        {
          Target.targets.splice(i,1);
          return;
        }
      }
    }
    if(Target.targets.length == 0)
    {
      gameLost = true;
      gameOver();
    }
  }
}

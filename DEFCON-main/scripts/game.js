var gameLost = false;

//Initialise Game Objects

addWordToDOM();
//Game Loop
setInterval(update, 1000 / FPS);
function update() {
  ctx.drawImage(image, 0, 0);
  if(!gameLost)
  {
    Nuke.addNuke();
    Silo.drawSilos();
    Target.drawTargets();
    Nuke.drawNukes();
    Nuke.moveNukes();
  }
  
}

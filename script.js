window.onload = function createWorld() {
  var canvas = document.getElementById("wasabi");
  var ct = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("keyup", keyup, false);
  window.addEventListener("keydown", keydown, false);
  const RUNNING_FRAMES = 12;
  const STANDING_FRAMES = 1;
  var running = [];
  var standing = [];
  var frameCounter = 11;
  var moving = false;
  for (var x = 0; x < RUNNING_FRAMES; x++) {
    running[x] = new Image();
    running[x].src = "Animations/Running" + (x + 1) + ".png";
  }
  for (var x = 0; x < STANDING_FRAMES; x++) {
    standing[x] = new Image();
    standing[x].src = "Animations/Standing" + (x + 1) + ".png";
  }
  function clear() {
    ct.fillStyle = "#FFF";
    ct.fillRect(0,0,canvas.width, canvas.height);
  }
  function init() {}
  function keyup(e) {
    moving = false;
    frameCounter = 10;
  }
  function keydown(e) {
    moving = true;
    frameCounter += 1;
    frameCounter %= running.length;
  }
  function update() {
    draw();
  }
  function draw() {
    clear();
    if (moving)
      ct.drawImage(running[frameCounter], 10, 10, 300, 300);
    else
      ct.drawImage(standing[0], 10, 10, 300, 300);
  }
  running[11].onload = function() {
    setInterval(update , 1000/60);
  }
}

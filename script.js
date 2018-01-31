window.onload = function createWorld() {
  var canvas = document.getElementById("wasabi");
  var ct = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("keyup", keyup, false);
  window.addEventListener("keydown", keydown, false);
  const RUNNING_FRAMES = 12;
  const STANDING_FRAMES = 1;
  const SPRITE_WIDTH = 300;
  const SPRITE_HEIGHT = 300;

  var LEFT = 37;
  var RIGHT = 39;
  var UP = 38;
  var DOWN = 40;
  var SPACE = 32;
  var SHIFT = 16;

  var running = [];
  var standing = [];
  var frameCounter = 11;
  var movingRight = false;
  var movingLeft = false;
  var moving = false;
  var facing_right = true;
  var sprite_x = (canvas.width - SPRITE_WIDTH)/2;
  var sprite_y = (canvas.height - SPRITE_HEIGHT)/2;

  ct.translate(canvas.width/2 , canvas.height/2);

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
    ct.fillRect(-canvas.width/2,-canvas.height/2,canvas.width * 2, canvas.height * 2);
  }
  function init() {}
  function keyup(e) {
    movingLeft = false;
    movingRight = false;
    moving = false;
  }
  function keydown(e) {
    if(e.keyCode == LEFT) {
      movingLeft = true;
      if (facing_right) ct.scale(-1, 1);
      facing_right = false;
    }
    else if (e.keyCode == RIGHT) {
      movingRight = true;
      if (!facing_right) ct.scale(-1, 1);
      facing_right = true;
    }
    moving = true;
  }
  function update() {
    clear();
    draw();
  }
  function draw() {
    if (moving) {
      frameCounter += 1;
      frameCounter %= running.length;
      ct.drawImage(running[frameCounter], -SPRITE_WIDTH/2, -SPRITE_HEIGHT/2, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
    else {
      frameCounter = 10;
      ct.drawImage(standing[0], -SPRITE_WIDTH/2, -SPRITE_HEIGHT/2, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
  }
  running[11].onload = function() {
    setInterval(update , 1000/30);
  }
}

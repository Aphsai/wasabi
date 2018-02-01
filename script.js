window.onload = function createWorld() {
  var canvas = document.getElementById("wasabi");
  var ct = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("keyup", keyup, false);
  window.addEventListener("keydown", keydown, false);

  const RUNNING_FRAMES = 12;
  const STANDING_FRAMES = 1;
  const SPINNING_FRAMES = 7;
  const JUMPING_FRAMES = 13;

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
  var spinning = [];
  var jumping = [];
  var frameCounter = 11;
  var spinCounter = 0;
  var jumpCounter = 0;
  var movingRight = false;
  var movingLeft = false;
  var releasedLeft = false;
  var releasedRight = false;
  var jump = false;
  var spin = false;
  var power = 0;
  var facing_right = true;
  var sprite_x = -SPRITE_WIDTH/2;
  var sprite_y = -SPRITE_HEIGHT/2;
  var sprite_rel_x = 0;
  var sprite_rel_y = 0;

  ct.translate(canvas.width/2 , canvas.height/2);

  for (var x = 0; x < RUNNING_FRAMES; x++) {
    running[x] = new Image();
    running[x].src = "Animations/Running" + (x + 1) + ".png";
  }
  for (var x = 0; x < SPINNING_FRAMES; x++) {
    spinning[x] = new Image();
    spinning[x].src = "Animations/Spinning" + (x + 1) + ".png";
  }
  for (var x = 0; x < STANDING_FRAMES; x++) {
    standing[x] = new Image();
    standing[x].src = "Animations/Standing" + (x + 1) + ".png";
  }
  for (var x = 0; x < JUMPING_FRAMES; x++) {
    jumping[x] = new Image();
    jumping[x].src = "Animations/Jumping" + (x + 1) + ".png";
  }
  function clear() {
    ct.fillStyle = "#d0cd89";
    ct.fillRect(-canvas.width/2, -canvas.height/2, canvas.width * 2, canvas.height * 2);
    ct.fillStyle = "#333";
    ct.fillRect(-canvas.width/2, sprite_rel_y + SPRITE_HEIGHT/2 - 5, canvas.width * 2, canvas.height);
  }
  function init() {}
  function keyup(e) {
      if(e.keyCode == LEFT) {
    movingLeft = false;
    releasedLeft = true;
  }
      if(e.keyCode == RIGHT) {
    movingRight = false;
    releasedRight = true;
  }
      if(e.keyCode == SHIFT) {
        spinCounter = 0 ;
        spin = false;
        power = 0;
        if (!releasedLeft) movingLeft = true;
        if (!releasedRight) movingRight = true;
    }
  }
  function keydown(e) {
    if(e.keyCode == LEFT) {
      movingLeft = true;
      movingRight = false;
      releasedLeft = false;
      releasedRight = true;
      if (facing_right) {
        ct.scale(-1, 1);
        sprite_rel_x *= -1;
        sprite_rel_x -= 50;
      }
      facing_right = false;

    }
    else if (e.keyCode == RIGHT) {
      movingLeft = false;
      movingRight = true;
      releasedRight = false;
      releasedLeft = true;
      if (!facing_right) {
        ct.scale(-1, 1);
              sprite_rel_x *= -1;
                    sprite_rel_x -= 50;
      }
      facing_right = true;
    }
    if (e.keyCode == SHIFT) {
      movingLeft = false;
      movingRight = false;
      spin = true;
    }
    if (!spin && (e.keyCode == SPACE || e.keyCode == UP)) {
      console.log("ENTERED");
      jump = true;
    }
  }
  function update() {
    clear();
    draw();
  }
  function draw() {
    if (movingLeft) sprite_rel_x -= 10;
    if (movingRight) sprite_rel_x -= 10;
    ct.fillStyle = "#0b532e";
    ct.fillRect(sprite_rel_x, sprite_rel_y + 95, 50, 50);
    if (jump) {
      if (!spin)
      ct.drawImage(jumping[jumpCounter], sprite_x, sprite_y, SPRITE_WIDTH, SPRITE_HEIGHT);
      else {
        spinCounter += 1;
        power += 1;
        sprite_rel_x -= 20;
        if (spinCounter >= spinning.length) spinCounter = 4;
        ct.drawImage(spinning[spinCounter], sprite_x, sprite_y, SPRITE_WIDTH + 42, SPRITE_HEIGHT);
      }
      jumpCounter++;
      if (jumpCounter < JUMPING_FRAMES/2 && jumpCounter > 1)
      sprite_rel_y += 15;
      else if (jumpCounter > JUMPING_FRAMES/2 + 2)
      sprite_rel_y -= 15;
      if (movingLeft || movingRight)
              sprite_rel_x -= 10;
      if (jumpCounter == JUMPING_FRAMES) {
        jump = false;
        jumpCounter = 0;
      }
    }
    else if (movingLeft || movingRight) {
      frameCounter += 1;
      frameCounter %= running.length;
      ct.drawImage(running[frameCounter], sprite_x, sprite_y, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
    else if (spin) {
      spinCounter += 1;
      power += 1;
      sprite_rel_x -= 20;
      if (spinCounter >= spinning.length) spinCounter = 4;
      ct.drawImage(spinning[spinCounter], sprite_x, sprite_y, SPRITE_WIDTH + 42, SPRITE_HEIGHT);
    }
    else {
      frameCounter = 10;
      ct.drawImage(standing[0], sprite_x, sprite_y, SPRITE_WIDTH, SPRITE_HEIGHT);
    }
  }
  running[11].onload = function() {
    setInterval(update , 1000/20);
  }
}

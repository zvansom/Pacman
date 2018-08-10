function initProps(character) {
  character.prevX = null;
  character.prevY = null;
  character.queuedDirection = '';
  character.currentDirection;

  if (character.key !== 'pacman') {
    character.vulnerable = false;
    character.released = false;
    character.flashing = false;
  }
}

function move(character) {
  var speed = SPEED;
  if (character.queuedDirection === 'LEFT' || character.queuedDirection === 'UP') {
    speed = -speed;
  }
  if (character.queuedDirection === 'LEFT' || character.queuedDirection === 'RIGHT') {
    character.body.velocity.x = speed;
  } else if (character.queuedDirection === 'UP' || character.queuedDirection === 'DOWN') {
    character.body.velocity.y = speed;
  }
}

function collectDot(pacman, dot) {
  score += 10;
  dot.parent.remaining--;
  dot.kill();
}

function collectPill(pacman, pill) {
  clearTimeout(vulnerableTimer);
  score += 40;
  vulnerableTimer = setTimeout(flashingVulnerable, 5000);
  blinky.vulnerable = true;
  pinky.vulnerable = true;
  inky.vulnerable = true;
  clyde.vulnerable = true;
  blinky.flashing = false;
  pinky.flashing = false;
  inky.flashing = false;
  clyde.flashing = false;
  pill.kill();
}

function setCurrentDirection(character) {
  var direction;
  var prevX = Math.floor(character.prevX);
  var prevY = Math.floor(character.prevY);
  var currX = Math.floor(character.position.x);
  var currY = Math.floor(character.position.y);

  character.prevX = currX;
  character.prevY = currY;
  if(prevX > currX) {
    character.currentDirection = 'LEFT';
  } else if(prevY > currY) {
    character.currentDirection = 'UP';
  } else if(prevX < currX) {
    character.currentDirection = 'RIGHT';
  } else if(prevY < currY){
    character.currentDirection = 'DOWN';
  } else if (prevX === currX && prevY === currY) {
    character.currentDirection = 'STOPPED';
  }
}

function animate(character) {
  if (character.vulnerable === true && character.flashing === true) {
    character.animations.play('flashing');
  } else if (character.vulnerable === true) {
    character.animations.play('vulnerable');
  } else if (character.queuedDirection === character.currentDirection) {
    character.animations.play(character.currentDirection);
    character.queuedDirection = '';
  }
}

function handleOffscreen(character) {
  if(character.body.x < 0) {
    character.reset(450, 272);
    character.body.velocity.x = -SPEED;
  }
  if(character.body.x > 450) {
    character.reset(0, 272);
    character.body.velocity.x = SPEED;
  }
}

function handleCollision(pacman, ghost) {
  if (ghost.vulnerable === true) {
    score += 100;
    ghost.kill();
    resetGhost(ghost);
  } else {
    blinky.body.velocity.x = 0;
    blinky.body.velocity.y = 0;
    pacman.body.velocity.x = 0;
    pacman.body.velocity.y = 0;

    pacman.animations.play('death');
    pacman.lives--;

    restartTimer = setTimeout(restart, 3000);
  }
}

function resetGhost(ghost) {
  ghost.revive();
  ghost.position.x = 232;
  ghost.position.y = 288;
}

function restart() {
  clearTimeout(restartTimer);
  game.state.restart();
}

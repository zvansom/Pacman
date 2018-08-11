function initProps(character) {
  character.prevX = null;
  character.prevY = null;
  character.queuedDirection = '';
  character.currentDirection;

  if (character.key !== 'pacman') {
    character.vulnerable = false;
    character.released = false;
    character.flashing = false;
    character.released = false;
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
  addScore(10);
  dot.parent.remaining--;
  dot.kill();
}

function collectPill(pacman, pill) {
  clearTimeout(vulnerableTimer);
  addScore(40);
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
    addScore(100);
    ghost.kill();
    ghostsInPlay--;
    resetGhost(ghost);
  } else {
    pacman.currentDirection = '';
    pacman.body.enable = false;
    pacman.body.moves = false;
    pacman.animations.play('death');
    lives--;
    livesImage.children.pop();

    if (lives !== 0) {
      restartTimer = setTimeout(restart, 3000);
    } else {
      console.log('game over');
    }
  }
}

function resetGhost(ghost) {
  ghost.revive();
  ghost.position.x = 232;
  ghost.position.y = 288;
}

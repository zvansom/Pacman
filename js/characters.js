function initProps(character) {
  game.physics.arcade.enable(character);
  character.prevX = null;
  character.prevY = null;
  character.queuedDirection = '';
  character.currentDirection;

  if (character.key !== 'pacman') {
    character.vulnerable = false;
    character.released = false;
    character.flashing = false;
    character.released = false;
    character.body.setSize(15, 15, 0.5, 0.5);

    // Sets initial ghost movement
    character.body.velocity.x = Math.random() < 0.5 ? SPEED : -SPEED;

    //Add shared animations;
    character.animations.add('vulnerable', [64, 65], 10, true);
    character.animations.add('flashing', [64, 65, 66, 67], 10, true);
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
    ghost.body.enable = false;
    addScore(100);
    ghost.kill();
    ghostsInPlay--;
    buffer = setTimeout(function() {resetGhost(ghost)}, 1000);
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
      restartTimer = setTimeout(gameOver, 3000);
    }
  }
}

function resetGhost(ghost) {
  ghost.revive();
  ghost.body.enable = true;
  ghost.position.x = 232;
  ghost.position.y = 288;
}

function toggleFreeze(character) {
  character.body.moves = false;
}

function gameOver() {
  var gameOverText = game.add.text(150, 320, 'GAME OVER', {fill: '#ffffff'});
  gameOverText.fontSize = '16px';
  gameOverText.font = 'Press Start 2P';

  menuTimer = setInterval(function() {flashTitle(gameOverText)}, 1000);
}

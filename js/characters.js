function initProps(character) {
  game.physics.arcade.enable(character);
  character.prevX = null;
  character.prevY = null;
  character.queuedDirection = '';
  character.currentDirection = 'STOPPED';

  // Ghost only properties.
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

function checkAllCollisions(character) {
  if (character.key === 'pacman') {
    game.physics.arcade.overlap(character, dots, collectDot);
    game.physics.arcade.overlap(character, power_pills, collectPill);
  } else {
    game.physics.arcade.collide(character, ghostLayer);
    game.physics.arcade.collide(pacman, character, handleCollision);
  }
  game.physics.arcade.collide(character, dotLayer);
}

function setCharacterVelocity(character) {
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

function playActiveAnimation(character) {
  // Handle shared ghost animations
  if (character.vulnerable === true && character.flashing === true) {
    character.animations.play('flashing');
  } else if (character.vulnerable === true) {
    character.animations.play('vulnerable');
  }
  // All character animations
  else if (character.queuedDirection === character.currentDirection) {
    character.animations.play(character.currentDirection);
    character.queuedDirection = '';
  }
}

function handleOffscreen(character) {
  if(character.body.x < 0) {
    character.reset(449, 272);
    character.body.velocity.x = -SPEED;
  }
  if(character.body.x > 450) {
    character.reset(1, 272);
    character.body.velocity.x = SPEED;
  }
}

function handleCollision(pacman, ghost) {
  if (ghost.vulnerable === true) {
    eatGhost.play();
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
    chompSound.pause();
    deathSound.play();
    lives--;
    livesImage.children.pop();

    if (lives !== 0) {
      restartTimer = setTimeout(resetAll, 3000);
    } else {
      restartTimer = setTimeout(gameOver, 3000);
    }
  }
}

function toggleFreeze(character) {
  character.body.moves = false;
}

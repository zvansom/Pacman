function initProps(character) {
  character.prevX = null;
  character.prevY = null;
  character.queuedDirection;
  character.currentDirection;
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
  pacman.score += 10;
  dot.parent.remaining--;
  dot.kill();
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
  } else {
    // Do nothing.
    return;
  }
}

function animate(character) {
  character.animations.play(character.currentDirection);
  if (character.currentDirection === character.queuedDirection) {
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

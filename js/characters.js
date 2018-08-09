function initProps(character) {
  character.prevX = null;
  character.prevY = null;
  character.currentDirection = null;
}

function move(character) {
  var speed = SPEED;
  if (character.current === 'LEFT' || character.current === 'UP') {
    speed = -speed;
  }
  if (character.current === 'LEFT' || character.current === 'RIGHT') {
    character.body.velocity.x = speed;
  } else {
    character.body.velocity.y = speed;
  }
}

function collectDot(pacman, dot) {
  pacman.score += 10;
  dot.parent.remaining--;
  dot.kill();
}

function animate(character) {
  var prevX = Math.floor(character.prevX);
  var prevY = Math.floor(character.prevY);
  var currX = Math.floor(character.x);
  var currY = Math.floor(character.y);

  if(prevX > currX) {
    character.animations.play('left');
  } else if(prevY > currY) {
    character.animations.play('up');
  } else if(prevX < currX) {
    character.animations.play('right');
  } else if(prevY < currY){
    character.animations.play('down');
  } else {
    // Do nothing.
  }
  character.prevX = currX;
  character.prevY = currY;
}

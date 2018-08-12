function queueGhostMovement(ghost) {
  if(ghost.key === 'pacman') {
    return;
  } else {
    if (ghost.queuedDirection === '') {
      var direction = ghost.currentDirection;
      switch(direction) {
        case 'RIGHT':
        case 'LEFT':
          if (Math.random() > 0.5) {
            ghost.queuedDirection = 'UP';
          } else {
            ghost.queuedDirection = 'DOWN';
          }
          break;

        case 'DOWN':
        case 'UP':
        if (Math.random() > 0.5) {
          ghost.queuedDirection = 'LEFT';
        } else {
          ghost.queuedDirection = 'RIGHT';
        }
        break;

        default:
          break;
      }
    } else if (ghost.queudDirection === '' && ghost.currentDirection === 'STOPPED') {
      ghost.queudDirection = 'DOWN';
    } else if (ghost.currentDirection === 'STOPPED') {
      if (ghost.queuedDirection === 'LEFT' && ghost.body.blocked.left === true) {
        ghost.queuedDirection = 'RIGHT';
      } else if (ghost.queuedDirection === 'RIGHT' && ghost.body.blocked.right === true) {
        ghost.queuedDirection = 'LEFT';
      } else if (ghost.queuedDirection === 'UP' && ghost.body.blocked.up === true) {
        ghost.queuedDirection = 'DOWN';
      } else if (ghost.queuedDirection === 'DOWN' && ghost.body.blocked.down === true) {
        ghost.queuedDirection = 'UP';
      }
    }
  }
}

function flashingVulnerable() {
  clearTimeout(vulnerableTimer);
  vulnerableTimer = setTimeout(toggleVulnerable, 3000);
  blinky.flashing = true;
  pinky.flashing = true;
  inky.flashing = true;
  clyde.flashing = true;
}

function toggleVulnerable() {
  clearTimeout(vulnerableTimer);
  blinky.vulnerable = false;
  pinky.vulnerable = false;
  inky.vulnerable = false;
  clyde.vulnerable = false;
  blinky.flashing = false;
  pinky.flashing = false;
  inky.flashing = false;
  clyde.flashing = false;
}

function checkReleaseGhost() {
  if (ghostsInPlay < 4 && !releaseTimer) {
    releaseTimer = setTimeout(releaseGhost, 3500);
  }
}

function releaseGhost() {
  clearTimeout(releaseTimer);
  releaseTimer = 0;
  ghostsInPlay++;
  if (blinky.body.position.x >= 174 && blinky.body.position.x <= 276 &&
    blinky.body.position.y >= 253 && blinky.body.position.y <= 309) {
      blinky.reset(216, 224);
      blinky.body.velocity.x = 100;
  } else if (pinky.body.position.x >= 174 && pinky.body.position.x <= 276 &&
    pinky.body.position.y >= 253 && pinky.body.position.y <= 309) {
      pinky.reset(216, 224);
      pinky.body.velocity.x = 100;
  } else if (inky.body.position.x >= 174 && inky.body.position.x <= 276 &&
    inky.body.position.y >= 253 && inky.body.position.y <= 309) {
    inky.reset(216, 224);
    inky.body.velocity.x = 100;
  } else if (clyde.body.position.x >= 174 && clyde.body.position.x <= 276 &&
    clyde.body.position.y >= 253 && clyde.body.position.y <= 309) {
    clyde.reset(216, 224);
    clyde.body.velocity.x = 100;
  }
}

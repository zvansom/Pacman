// Randomize ghost movement.
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

    }
    // Don't let the ghosts stand still.
    else if (ghost.queudDirection === '' && ghost.currentDirection === 'STOPPED') {
      if (Math.random() > 0.5) {
        ghost.queudDirection = 'DOWN';
      } else {
        ghost.queudDirection = 'UP';
      }
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
  vulnerableTimer = setTimeout(removeVulnerable, 3000);
  ghosts = [blinky, pinky, inky, clyde];
  ghosts.forEach(ghost => {ghost.flashing = true});
}

function removeVulnerable() {
  clearTimeout(vulnerableTimer);
  ghosts = [blinky, pinky, inky, clyde];
  ghosts.forEach(ghost => {
    ghost.vulnerable = false;
    ghost.flashing = false;
  });
}

function checkReleaseGhost() {
  if (ghostsInPlay < 4 && !releaseTimer) {
    releaseTimer = setTimeout(releaseGhost, 3500);
  }
}

function releaseGhost() {
  clearTimeout(releaseTimer);
  releaseTimer = 0;
  var speed = SPEED;
  ghostsInPlay++;

  // Randomize left or right.
  if (Math.random > 0.5) {
    speed = -speed;
  }

  // Find a ghost in the center square and release.
  if (blinky.body.position.x >= 174 && blinky.body.position.x <= 276 &&
    blinky.body.position.y >= 253 && blinky.body.position.y <= 309) {
      blinky.reset(216, 224);
      blinky.body.velocity.x = speed;
  } else if (pinky.body.position.x >= 174 && pinky.body.position.x <= 276 &&
    pinky.body.position.y >= 253 && pinky.body.position.y <= 309) {
      pinky.reset(216, 224);
      pinky.body.velocity.x = speed;
  } else if (inky.body.position.x >= 174 && inky.body.position.x <= 276 &&
    inky.body.position.y >= 253 && inky.body.position.y <= 309) {
    inky.reset(216, 224);
    inky.body.velocity.x = speed;
  } else if (clyde.body.position.x >= 174 && clyde.body.position.x <= 276 &&
    clyde.body.position.y >= 253 && clyde.body.position.y <= 309) {
    clyde.reset(216, 224);
    clyde.body.velocity.x = speed;
  }
}

function resetGhost(ghost) {
  ghost.revive();
  ghost.body.enable = true;
  ghost.position.x = 232;
  ghost.position.y = 288;
}

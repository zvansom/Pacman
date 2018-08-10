function queueGhostMovement(ghost) {
  if(ghost.key === 'pacman') {
    return;
  } else {
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
  }

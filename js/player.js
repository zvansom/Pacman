function collectDot(pacman, dot) {
  addScore(10);
  dot.parent.remaining--;
  dot.kill();
}

function collectPill(pacman, pill) {
  clearTimeout(vulnerableTimer);
  addScore(40);
  ghosts = [blinky, pinky, inky, clyde];
  ghosts.forEach(ghost => {
    ghost.vulnerable = true;
    ghost.flashing = false;
  })
  vulnerableTimer = setTimeout(flashingVulnerable, 5000);

  pill.kill();
}

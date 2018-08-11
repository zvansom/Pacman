var menuState = {
  create: function() {
    bgImg = game.add.image(0, 0, 'bg');

    title = game.add.image(25, 75, 'title');
    startMessage = game.add.text(120, 420, 'Press spacebar', {fill: '#ffffff'});
    startMessage.fontSize = '16px';
    startMessage.font = 'Press Start 2P';

    menuTimer = setInterval(function() {flashTitle(startMessage);}, 1000);

    var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spacebar.onDown.addOnce(this.start, this);
  },

  start: function() {
    clearInterval(menuTimer);
    game.state.start('tutorial');
  }
}

var tutorialState = {
  create: function() {
    bgImg = game.add.image(0, 0, 'bg');

    var pressNext = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    pressEnter = game.add.text(92, 360, 'Press enter to skip', {fill: '#ffffff'});
    pressEnter.font = 'Press Start 2P';
    pressEnter.fontSize = '12px';

    // TODO: ANIMATION FOR tutorial
      // SCENE 1

      tutsBg = game.add.graphics(0, 100);
      tutsBg.beginFill(0x000000);
      tutsBg.lineTo(450, 100);
      tutsBg.lineTo(450, 400);
      tusBg.lineTo(0, 400);
      tutsBg.endFill();
      // SHOW ARROW keys lighting up
      // PACMAN MOVING AROUND SCREEN IN UNISON
      // MESSAGE: ARROW KEYS MOVE PACMAN

      // SCENE 2
      // PACMAN EATING TRAIL OF DOTS
      // MESSAGE: EAT DOTS TO SCORE POINTS

      // SCENE 3
      // GHOSTS CHASE Pacman
      // MESSAGE: DON'T GET TOUCHED BY THE ghosts

      // SCENE 4
      // PACMAN GETS BIG DOT AND CHASES THE GHOSTS
      // MESSAGE: TURN THE TABLES AND GET PAYBACK

      // END tutorial
      // START GAME

    pressNext.onDown.addOnce(this.play, this);
  },

  play: function() {
    game.state.start('play')
  }
}

function flashTitle(text) {
  text.visible ? text.visible = false : text.visible = true;
}

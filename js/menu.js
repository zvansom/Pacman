var menuState = {
  create: function() {
    bgImg = game.add.image(0, 0, 'bg');

    // TODO: PACMAN TITLE CARD
    var startMessage = game.add.text(92, 410, 'Press spacebar to play', {font: '26px Arial', fill: '#ffffff'});

    var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spacebar.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('tutorial');
  }
}

var tutorialState = {
  create: function() {
    bgImg = game.add.image(0, 0, 'bg');

    var pressNext = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    var pressEnter = game.add.text(92, 360, 'Press enter to skip', {font: '26px Arial', fill: '#ffffff'});

    // TODO: ANIMATION FOR tutorial
      // SCENE 1
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

var menuState = {
  create: function() {
    bgImg = game.add.image(0, 0, 'bg');

    // var logo = **GET LOGO TO USE AS BANNER HERE**
    var startMessage = game.add.text(92, 360, 'Press spacebar to play', {font: '26px Arial', fill: '#ffffff'});

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

    pressNext.onDown.addOnce(this.play, this);
  },

  play: function() {
    game.state.start('play')
  }
}

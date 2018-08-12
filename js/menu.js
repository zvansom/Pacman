var menuState = {
  create: function() {
    bgImg = game.add.image(0, 0, 'bg');

    title = game.add.image(25, 75, 'title');
    startMessage = game.add.text(120, 420, 'Press spacebar', {fill: '#ffffff'});
    startMessage.fontSize = '16px';
    startMessage.font = 'Press Start 2P';

    menuTimer = setInterval(function() {flashTitle(startMessage);}, 1000);

    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

    pressEnter = game.add.text(120, 420, 'Press enter to skip', {fill: '#ffffff'});
    pressEnter.font = 'Press Start 2P';
    pressEnter.fontSize = '12px';

    menuTimer = setInterval(function() {flashTitle(pressEnter);}, 1000);

    tutorial = game.add.image(0, 75, 'tutorial1');
    tutorialTimer = setTimeout(function() {nextTutorial(tutorial.key)}, 5000);

    pressNext.onDown.addOnce(this.play, this);
  },

  play: function() {
    clearTimeout(tutorialTimer);
    game.state.start('play')
  }
}

function flashTitle(text) {
  text.visible ? text.visible = false : text.visible = true;
}

function nextTutorial(key) {
  clearTimeout(tutorialTimer);
  var nextNum = parseInt(key.slice(-1), 10) + 1;
  if (nextNum > 4) {
    tutorialState.play();
    return;
  }
  var nextString = key.slice(0, -1) + nextNum
  tutorial.loadTexture(nextString);
  tutorialTimer = setTimeout(function() {nextTutorial(nextString)}, 5000);
}

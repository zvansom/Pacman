var game = new Phaser.Game(450, 600, Phaser.Auto, 'game');
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('tutorial', tutorialState);
game.state.add('play', PacmanGame);

game.state.start('boot');

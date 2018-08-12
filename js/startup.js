var bootState = {
  preload: function() {
    game.load.image('bg', './assets/bgMaze.png');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start('load');
  }
};

var loadState = {
  preload: function() {
    loadingText = game.add.text(175, 280, 'Loading...', {fill: '#ffffff'});
    loadingText.font = 'Press Start 2P';
    loadingText.fontSize = '14px';

    game.load.image('tutorial1', './assets/tuts1.png');
    game.load.image('tutorial2', './assets/tuts2.png');
    game.load.image('tutorial3', './assets/tuts3.png');
    game.load.image('tutorial4', './assets/tuts4.png');

    game.load.image('title', './assets/pacman_title.png');

    game.load.tilemap('map', './assets/pacman_tile_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('spritesheet', './assets/spritesheet.png');

    // Load pacman
    game.load.spritesheet('pacman', './assets/spritesheet.png', 16, 16);

    // Load ghosts
    game.load.spritesheet('blinky', './assets/spritesheet.png', 16, 16);
    game.load.spritesheet('pinky', './assets/spritesheet.png', 16, 16);
    game.load.spritesheet('inky', './assets/spritesheet.png', 16, 16);
    game.load.spritesheet('clyde', './assets/spritesheet.png', 16, 16);

    // Load dot
    game.load.spritesheet('dot', './assets/spritesheet.png', 16, 16);
    game.load.spritesheet('pill', './assets/spritesheet.png', 16, 16);
  },

  create: function() {
    game.state.start('menu');
  }
};

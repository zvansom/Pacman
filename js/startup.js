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
    var loadingText = game.add.text(80, 72, 'Loading...', {font: '30px Arial', fill: '#ffffff'});

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

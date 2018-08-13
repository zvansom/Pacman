// Initialize map objects
var map, sharedLayer, pacmanLayer, ghostLayer, ghostTurns;
var powerPillCoords = [[16, 96], [416, 96], [16, 416], [416, 416]];

// Initialize on-screen objects
var pacman, blinky, pinky, inky, clyde, dots, power_pills;
var characters;

// Initialize sounds.
var chomp, deathSound, openingSong, eatGhost;

// Initialize text-based displays
var scoreText, highScore, livesDisplay;

// Initialize event listener objects
var cursors, spaceKey;

// Initialize timers used throughout
var vulnerableTimer, restartTimer, releaseTimer, tuturialTimer, buffer;

//Initialize game wide variables
var SPEED = 100;
var lives = 3;
var score = 0;
var ghostsInPlay = 0;
var highScore;

var pacman, blinky, pinky, inky, clyde, dots, power_pills;
var ghosts = [blinky, pinky, inky, clyde];
var score = 0;
var lives = 3;
var cursors, spaceKey;

var vulnerableTimer, restartTimer;

var SPEED = 100;
//  Used in storing game assets.
var map, sharedLayer, pacmanLayer, ghostLayer, ghostTurns;

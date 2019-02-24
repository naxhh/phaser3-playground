const WIDTH = 800
const HEIGHT = 600

const MIDDLE_WIDTH = WIDTH / 2
const MIDDLE_HEIGHT = HEIGHT / 2

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config)

function preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
}

function create() {
    // Objects are positioned based on the center by default.
    // setOrigin changes their anchor point.
    this.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.add.image(MIDDLE_WIDTH, MIDDLE_HEIGHT, 'star')
}

function update() {

}

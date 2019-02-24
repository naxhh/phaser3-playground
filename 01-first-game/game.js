const WIDTH = 800
const HEIGHT = 600

const MIDDLE_WIDTH = WIDTH / 2
const MIDDLE_HEIGHT = HEIGHT / 2

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
}

var game = new Phaser.Game(config)

var platforms
var stars
var player
var cursors

var score = 0
var scoreText

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

    platforms = this.physics.add.staticGroup();

    platforms.create(MIDDLE_WIDTH, 568, 'ground').setScale(2).refreshBody()
    platforms.create(600, 400, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')

    player = this.physics.add.sprite(100, 450, 'dude')
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    })

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20,
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1,
    })

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms)

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70},
    })

    stars.children.iterate(child => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.collider(stars, platforms)
    this.physics.add.overlap(player, stars, collectStar, null, this)

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'})
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160)
        player.anims.play('left', true)

    } else if (cursors.right.isDown) {
        player.setVelocityX(160)
        player.anims.play('right', true)

    } else {
        player.setVelocityX(0)
        player.anims.play('turn')
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330)
    }
}

function collectStar(player, star) {
    star.disableBody(true, true)

    score += 10
    scoreText.setText('Score: ' + score)
}

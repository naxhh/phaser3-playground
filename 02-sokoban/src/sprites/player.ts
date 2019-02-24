import * as Phaser from 'phaser';

const START_FRAME = 'Player/player_05';

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'assets', START_FRAME);
        this.setOrigin(0, 0);
    }
}

export default Player;
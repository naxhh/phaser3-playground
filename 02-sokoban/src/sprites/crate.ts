import * as Phaser from 'phaser';

class Crate extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, private crateType: number) {
        super(scene, x, y, 'assets', getStartFrame(crateType));
        this.setOrigin(0,0);
    }
}

const getStartFrame = (crateType: number) : string => `Crates/crate_${crateType}`;

export default Crate;
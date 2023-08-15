export default class GrassBackground {
    constructor(scene) {
        this.scene = scene;
        this.grassSprites = [];

        this.scene.load.on('complete', () => {
            this.initGrassSprites();
            this.initGrassAnimation();
        });

        this.scene.load.start();
    }

    destroySprites() {
        this.grassSprites = []
    }

    initGrassSprites() {
        for (let i = 0; i < 25; i++) {
            const x = Phaser.Math.Between(0, this.scene.sys.game.config.width);
            const y = Phaser.Math.Between(0, this.scene.sys.game.config.height);
            const grassSprite = this.scene.add.sprite(x, Math.min(y, this.scene.sys.game.config.height / 2), 'grass');
            this.grassSprites.push(grassSprite);
        }
    }

    initGrassAnimation() {
        console.log('animou')
        this.scene.anims.create({
            key: 'grassAnimation',
            frames: this.scene.anims.generateFrameNumbers('background', { start: 20, end: 23 }),
            frameRate: 2,
            repeat: -1
        });

        this.grassSprites.forEach(sprite => {
            console.log(sprite)
            sprite.play('grassAnimation');
        });
    }
}

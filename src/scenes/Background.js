export default class GrassBackground {
  constructor(scene) {
      this.scene = scene;
      this.grassSprites = [];

      // Load the grass sprite sheet
      this.scene.load.spritesheet('grass', 'assets/sprites/grass.png', { frameWidth: 16, frameHeight: 16 });

      this.scene.load.on('complete', () => {
          this.initGrassSprites();
          this.initGrassAnimation();
      });

      this.scene.load.start();
  }

  initGrassSprites() {
      for (let i = 0; i < 15; i++) {
          const x = Phaser.Math.Between(0, this.scene.sys.game.config.width);
          const y = Phaser.Math.Between(0, this.scene.sys.game.config.height);
          const grassSprite = this.scene.add.sprite(x, y, 'grass');
          this.grassSprites.push(grassSprite);
      }
  }

  initGrassAnimation() {
      this.scene.anims.create({
          key: 'grassAnimation', // Animation key
          frames: this.scene.anims.generateFrameNumbers('grass', { start: 0, end: 1 }), // Adjust frame numbers
          frameRate: 10,
          repeat: -1 // Infinite loop
      });

      this.grassSprites.forEach(sprite => {
          sprite.play('grassAnimation');
      });
  }

  update() {
      // Add any update logic here if needed
  }
}

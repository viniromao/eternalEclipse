export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(gameOverSound) {
        this.gameOverSound = gameOverSound;
    }

    preload() {
        this.load.spritesheet('start_button', 'assets/ui/start_button.png', { frameWidth: 182, frameHeight: 60 });
    }

    create() {
        // Add a black background
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 120, centerY - 150, 'Game Over', { fontFamily: 'custom', fontSize: '70px' });

        const restartButton = this.add.sprite(centerX, centerY + 60, 'start_button', 0);
        restartButton.setInteractive();

        restartButton.on('pointerover', () => {
            restartButton.setFrame(2);
        });

        restartButton.on('pointerout', () => {
            restartButton.setFrame(0);
        });

        restartButton.on('pointerup', this.restartGame, this);
    }

    restartGame() {
        this.gameOverSound.stop();
        this.scene.start('MainScene');
    }
}
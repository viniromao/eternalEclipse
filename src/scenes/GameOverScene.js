export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(gameOverSound) {
        this.gameOverSound = gameOverSound;
    }

    preload() {
    }

    create() {
        // Add a black background
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 130, centerY - 150, 'Game Over', { fontFamily: 'custom', fontSize: '70px' });
        this.add.text(centerX - 90, centerY - 70, 'The King is Dead', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX - 60, centerY - 20, 'Gonna Give Up Already?', { fontFamily: 'custom', fontSize: '15px' });
        this.add.text(centerX + 85, centerY + 200, '2023 - Ivanez, Kessel Nebula, Eduga, Hallowk1d?', { fontFamily: 'custom', fontSize: '12px' , width: '280'});

        const button = this.add.sprite(centerX, centerY + 90, 'button', 0);

        button.setInteractive();

        button.on('pointerdown', () => {
            button.setFrame(1);
        });

        button.on('pointerup', () => {
            this.restartGame()
        });
    }

    restartGame() {
        this.gameOverSound.stop();
        this.scene.start('MainScene');
    }
}
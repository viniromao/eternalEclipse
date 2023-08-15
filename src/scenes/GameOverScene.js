export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(gameOverSound) {
        this.gameOverSound = gameOverSound;
    }

    preload() {
        this.load.spritesheet('button', 'assets/ui/start_button.png', { frameWidth: 182, frameHeight: 60 });
    }

    create() {
        // Add a black background
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 130, centerY - 150, 'Game Over', { fontFamily: 'custom', fontSize: '70px' });
        this.add.text(centerX - 90, centerY - 70, 'The King is Dead', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX - 60, centerY - 20, 'Gonna Give Up Already?', { fontFamily: 'custom', fontSize: '15px' });

        const button = this.add.sprite(centerX, centerY + 90, 'button', 0);

        button.setInteractive();

        button.on('pointerdown', () => {
            button.setFrame(1);
        });

        button.on('pointerup', () => {
            this.restartGame()
        });

        const credits = "2023 - Ivanez, Kessel Nebula, Eduga, Hallowk1d" 
        const creditsStyle = {
            fontFamily: 'custom',
            fill: '#fff',
            wordWrap: { width: 280, useAdvancedWrap: true },
            align: 'right',
            fontSize: 12
        };
        const joke = this.add.text(410, this.sys.game.config.height - 30, credits, creditsStyle);
        joke.setOrigin(0, 0.5);
    }

    restartGame() {
        this.gameOverSound.stop();
        this.scene.start('MainScene');
    }
}
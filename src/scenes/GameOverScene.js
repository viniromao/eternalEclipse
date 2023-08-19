export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.gameOverSound = data.gameOverSound;
        this.previousScene = data.previousScene;
    }

    create() {
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        this.add.image(this.cameras.main.width /2, this.cameras.main.height /2, 'border');

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 130, centerY - 150, 'Game Over', { fontFamily: 'custom', fontSize: '70px' });
        this.add.text(centerX - 90, centerY - 70, 'The King is Dead', { fontFamily: 'custom', fontSize: '30px' });
        // this.add.text(centerX - 60, centerY - 20, 'Gonna Give Up Already?', { fontFamily: 'custom', fontSize: '15px' });
        this.add.text(150, centerY + 200, '2023 - Ivanez, Neo32, Eduga, Hallowkid', { fontFamily: 'custom', fontSize: '24px', width: '280' });

        const button = this.add.sprite(centerX, centerY + 80, 'button', 0);

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
        this.scene.start(this.previousScene);
    }
}
export default StartScene;

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.spritesheet('start_button', 'assets/ui/start_button.png', { frameWidth: 182, frameHeight: 60 });
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX -150, centerY - 150, 'Game Title', { fontFamily: 'custom', fontSize: '70px',});

        const startButton = this.add.sprite(centerX, centerY + 60, 'start_button', 0);
        startButton.setInteractive();

        startButton.on('pointerover', () => {
            startButton.setFrame(2);
        });

        startButton.on('pointerout', () => {
            startButton.setFrame(0);
        });

        startButton.on('pointerup', this.startGame, this);
    }

    startGame() {
        this.scene.start('MainScene');
    }
}
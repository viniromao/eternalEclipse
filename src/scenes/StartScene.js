export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.spritesheet('button', 'assets/ui/start_button.png', { frameWidth: 192, frameHeight: 96 });
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 200, centerY - 150, 'Eternal Eclipse', { fontFamily: 'custom', fontSize: '70px', });
        const button = this.add.sprite(centerX, centerY, 'button', 0);

        // Make the button interactive if needed
        button.setInteractive();

        // Add an event listener for when the button is clicked if needed
        button.on('pointerdown', () => {
            button.setFrame(1);
        });

        button.on('pointerup', () => {
            this.startGame()
        });
    }


    startGame() {
        this.scene.start('MainScene');
    }
}
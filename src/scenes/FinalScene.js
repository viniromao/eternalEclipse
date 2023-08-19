export default class FinalScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FinalScene' });
    }

    create() {
        this.victorySound = this.sound.add('finalSong');
        this.victorySound.setVolume(.05);
        this.victorySound.play();

        this.victorySound.once('complete', () => {
            this.nextScene();
        });

        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.victoryText = this.add.text(centerX - 110, centerY - 70, 'The End', { fontFamily: 'custom', fontSize: '70px' });
    }

    nextScene() {
        this.victorySound.stop();
        this.scene.stop(); // Stop the sound when transitioning to the next scene
        this.scene.start('StartScene');
    }

    shutdown() {
        if (this.victoryText) {
            this.victoryText.destroy();
        }
        // Add any other cleanup code here if needed
    }
}

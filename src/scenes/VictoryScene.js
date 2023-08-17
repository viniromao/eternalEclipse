export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    init(data) {
        this.next = data.nextScene;
    }

    create() {
        this.victorySound = this.sound.add('victorySong');
        this.victorySound.setVolume(.4);
        this.victorySound.play();

        this.victorySound.once('complete', () => {
            this.nextScene();
        });

        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.victoryText = this.add.text(centerX - 110, centerY - 150, 'Victory!', { fontFamily: 'custom', fontSize: '70px' });
    }

    nextScene() {
        this.victorySound.stop();
        this.scene.stop(); // Stop the sound when transitioning to the next scene
        this.scene.start('LoreScene', {nextScene: this.next});
    }

    shutdown() {
        if (this.victoryText) {
            this.victoryText.destroy();
        }
        // Add any other cleanup code here if needed
    }
}

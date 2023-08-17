export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
        this.add.image(this.cameras.main.width /2, this.cameras.main.height /2, 'border');

        this.titleScreenSound = this.sound.add('titleScreenSound')
        this.titleScreenSound.setVolume(.6);
        this.titleScreenSound.play();
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 200, centerY - 150, 'Eternal Eclipse', { fontFamily: 'custom', fontSize: '70px', });
        this.add.text(centerX + 190, centerY - 140, '™', { fontFamily: 'arial', fontSize: '18px', });
        this.add.text(centerX - 310, centerY + 150, '© All Rights Reserved To You\n\t That is taking your time to read this\n little placeholder text in the corner of the screen ;)', { fontFamily: 'custom', fontSize: '20px', width: '390' });
        let text = this.add.text(centerX - 90, centerY, 'CLICK BUTTON', { fontFamily: 'custom', fontSize: '30px', });

        let isVisible = true;
        this.time.addEvent({
            delay: 500, // Time in milliseconds between each toggle; change as needed
            callback: () => {
                isVisible = !isVisible;
                text.setVisible(isVisible);
            },
            loop: true // Repeat indefinitely
        });

        const button = this.add.sprite(centerX, centerY + 70, 'button', 0);

        button.setInteractive();

        button.on('pointerdown', () => {
            button.setFrame(1);
        });

        button.on('pointerup', () => {
            this.startGame()
        });
    }
    startGame() {
        this.titleScreenSound.stop();

        this.scene.start('MainScene');
    }
}
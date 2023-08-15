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
        this.add.text(centerX + 190, centerY - 140, '™', { fontFamily: 'arial', fontSize: '12px', });
        this.add.text(centerX - 310, centerY + 200, '© All Rights Reserved To You, that is taking your time to read this little placeholder text in the corner of the screen ;)', { fontFamily: 'custom', fontSize: '11px' , width: '390'});

        const button = this.add.sprite(centerX, centerY, 'button', 0);

        button.setInteractive();

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
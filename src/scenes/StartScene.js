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
        const button = this.add.sprite(centerX, centerY, 'button', 0);

        button.setInteractive();

        button.on('pointerdown', () => {
            button.setFrame(1);
        });

        button.on('pointerup', () => {
            this.startGame()
        });

        const jokeText ="© All Rights Reserved To You, that is taking your time to read this little placeholder text in the corner of the screen  ;)";
        const jokeTextStyle = {
            fontFamily: 'custom',
            fill: '#fff',
            wordWrap: { width: 390, useAdvancedWrap: true },
            align: 'left',
            fontSize: 15
        };
        const joke = this.add.text(10, this.sys.game.config.height - 30, jokeText, jokeTextStyle);
        joke.setOrigin(0, 0.5);
    }


    startGame() {
        this.scene.start('MainScene');
    }
}
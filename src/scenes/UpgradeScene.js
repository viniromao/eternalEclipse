export default class UpgradeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UpgradeScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Set the background to black
        this.background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        // Add a key event listener
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
    
        const icons1 = this.add.sprite(centerX - 240, centerY - 100, 'upgradeIcons', 0).setInteractive().setScale(.3);
        const icons2 = this.add.sprite(centerX - 240, centerY +60, 'upgradeIcons', 1).setInteractive().setScale(.3);
        const icons3 = this.add.sprite(centerX + 100, centerY +60, 'upgradeIcons', 2).setInteractive().setScale(.3);
        const icons4 = this.add.sprite(centerX + 100, centerY - 100, 'upgradeIcons', 3).setInteractive().setScale(.3);

        this.add.image(centerX, centerY, 'border');

        this.add.text(centerX - 200, centerY - 100, '+ Life', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX - 200, centerY +60, '+ 5 Soldiers', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX + 130, centerY +60, 'Refuel', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX + 130, centerY - 100, '+ Soldier Life', { fontFamily: 'custom', fontSize: '30px' });
        
    }

    handleKeyDown(event) {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
            this.currentFrameIndex = (this.currentFrameIndex + 1) % 4; // Cycle through 0, 1, 2, 3
            this.icons.setFrame(this.currentFrameIndex);
        }

        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
            // Exit the UpgradeScene and return to MainScene
            this.scene.stop('UpgradeScene');
            this.scene.resume('MainScene');
        }
    }
}
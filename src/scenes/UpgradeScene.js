import UpgradeSystem from "../systems/UpgradeSystem.js";

export default class UpgradeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UpgradeScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Add a key event listener to apply upgrades
        this.input.keyboard.on('keydown', this.handleKeyDown, this);

        // Set the background to black
        this.background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        // Add a key event listener
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
    
        const lifeIcon = this.add.sprite(centerX - 230, centerY - 85, 'upgradeIcons', 6);
        const soldiersIcon = this.add.sprite(centerX - 230, centerY + 75, 'upgradeIcons', 18);
        const refuelIcon = this.add.sprite(centerX + 100, centerY + 70, 'upgradeIcons', 16);
        const soldiersLifeIcon = this.add.sprite(centerX + 100, centerY - 90, 'upgradeIcons', 0);

        this.add.image(centerX, centerY, 'border');

        this.add.text(centerX - 200, centerY - 100, '+ Life', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX - 200, centerY +60, '+ 5 Soldiers', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX + 130, centerY +60, 'Refuel', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX + 130, centerY - 100, '+ Soldier Life', { fontFamily: 'custom', fontSize: '30px' });
        
        // Set all sprites as interactive
        lifeIcon.setInteractive().setScale(1.2);
        soldiersIcon.setInteractive().setScale(1.2);
        refuelIcon.setInteractive().setScale(1.2);
        soldiersLifeIcon.setInteractive().setScale(1.2);
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
        
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
            const { gameData } = this.scene.settings.data; // Access gameData from scene settings
                const upgradeSystem = new UpgradeSystem(gameData);
                upgradeSystem.applyUpgrades();
                // Stop the game first (not pause) and then resume the MainScene
                this.scene.stop('UpgradeScene');
                const mainScene = this.scene.get('MainScene');
                this.scene.resume('MainScene');
        }
    }
}
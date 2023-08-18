import UpgradeSystem from "../systems/UpgradeSystem.js";

export default class UpgradeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UpgradeScene' });
    }

    init(data) {
        this.currentScene = data.scene
        this.fogOfWar = data.fogOfWar;
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        this.input.keyboard.on('keydown', this.handleKeyDown, this);

        this.background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);
    
        const lifeIcon = this.add.sprite(centerX - 230, centerY - 85, 'upgradeIcons', 6);
        const soldiersIcon = this.add.sprite(centerX - 230, centerY + 75, 'upgradeIcons', 18);
        const refuelIcon = this.add.sprite(centerX + 80, centerY + 70, 'upgradeIcons', 16);
        const soldiersLifeIcon = this.add.sprite(centerX + 80, centerY - 90, 'upgradeIcons', 0);

        this.add.image(centerX, centerY, 'border');

        this.add.text(centerX - 200, centerY - 100, '+ Life', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX - 200, centerY +60, '+ 5 Soldiers', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX + 110, centerY +60, 'Refuel', { fontFamily: 'custom', fontSize: '30px' });
        this.add.text(centerX + 110, centerY - 100, '+ Soldier Damage', { fontFamily: 'custom', fontSize: '30px' });
        

        const { gameData } = this.scene.settings.data;
        const fogOfWar = this.currentScene.FogOfWar;
        const upgradeSystem = new UpgradeSystem(gameData, fogOfWar,this.currentScene.entityDeployer);

        lifeIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
            upgradeSystem.SoldierHealthUpgrade();
            this.scene.stop('UpgradeScene');
            this.scene.resume(this.currentScene);
        });
    
        soldiersIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
            upgradeSystem.BuySoldiers();
            this.scene.stop('UpgradeScene');
            this.scene.resume(this.currentScene);
        });
    
        refuelIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
            upgradeSystem.IncreaseLightRadius();
            this.scene.stop('UpgradeScene');
            this.scene.resume(this.currentScene);
        });
    
        soldiersLifeIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
            upgradeSystem.SoldierDamageUpgrade();
            this.scene.stop('UpgradeScene');
            this.scene.resume(this.currentScene);
        });
    }

    handleKeyDown(event) {

        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
            this.currentFrameIndex = (this.currentFrameIndex + 1) % 4; 
            this.icons.setFrame(this.currentFrameIndex);
        }

        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
            this.scene.stop('UpgradeScene');
            this.scene.resume(this.currentScene);
        }
        
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
            const { gameData } = this.scene.settings.data;
                    
            const upgradeSystem = new UpgradeSystem(gameData, this.currentScene, this.currentScene.entityDeployer);
            upgradeSystem.SoldierHealthUpgrade();
                    
            this.scene.stop('UpgradeScene');
            this.scene.resume(this.currentScene);
        }
        
    }
}
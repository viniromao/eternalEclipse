import UpgradeSystem from "../systems/UpgradeSystem.js";

export default class UpgradeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UpgradeScene' });
    }

    init(data) {
        this.currentScene = data.scene
        this.fogOfWar = data.fogOfWar;
        this.soldierManagementSystem = data.soldierManagementSystem;
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        this.input.keyboard.on('keydown', this.handleKeyDown, this);

        this.background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);
    
        // const lifeIcon = this.add.sprite(centerX - 230, centerY - 85, 'upgradeIcons', 6);
        // const soldiersIcon = this.add.sprite(centerX - 230, centerY + 75, 'upgradeIcons', 18);
        // const refuelIcon = this.add.sprite(centerX + 80, centerY + 70, 'upgradeIcons', 16);
        // const soldiersLifeIcon = this.add.sprite(centerX + 80, centerY - 90, 'upgradeIcons', 0);

        // this.add.text(centerX - 200, centerY - 100, '+ Life', { fontFamily: 'custom', fontSize: '30px' });
        // this.add.text(centerX - 200, centerY +60, '+ Soldiers', { fontFamily: 'custom', fontSize: '30px' });
        // this.add.text(centerX + 110, centerY +60, 'Refuel Fire', { fontFamily: 'custom', fontSize: '30px' });
        // this.add.text(centerX + 110, centerY - 100, '+ Soldier Damage', { fontFamily: 'custom', fontSize: '30px' });

        this.add.image(centerX, centerY, 'border');

        const upgradeSystem = new UpgradeSystem(
            this.currentScene
        );

        // lifeIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
        //     upgradeSystem.SoldierHealthUpgrade();
        //     this.scene.stop();
        //     this.currentScene.togglePause();
        // });
    
        // soldiersIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
        //     upgradeSystem.BuySoldiers();
        //     this.scene.stop();
        //     this.currentScene.togglePause();

        // });
    
        // refuelIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
        //     upgradeSystem.IncreaseLightRadius();
        //     this.scene.stop();
        //     this.currentScene.togglePause();
        // });
    
        // soldiersLifeIcon.setInteractive().setScale(1.2).on('pointerdown', () => {
        //     upgradeSystem.SoldierDamageUpgrade();
        //     this.scene.stop();
        //     this.currentScene.togglePause();
        // });



        const upgradeOptions = [
            { function: 'SoldierHealthUpgrade', iconFrame: 9, text: 'Increase Soldier Health' },
            { function: 'BuySoldiers', iconFrame: 18, text: 'Buy Extra Soldiers' },
            { function: 'SoldierDamageUpgrade', iconFrame: 0, text: 'Increase Soldier Damage' },
            { function: 'ArcherDamageUpgrade', iconFrame: 2, text: 'Increase Archer Damage' },
            { function: 'IncreaseLightRadius', iconFrame: 7, text: 'Increase Light Circle' },
            { function: 'BuyMages', iconFrame: 18, text: 'Buy Extra Mages' },
            { function: 'BuyArchers', iconFrame: 18, text: 'Buy Extra Archers' },
            { function: 'RestoreSoldiersHealth', iconFrame: 19, text: 'Restore Soldiers Health' },
            { function: 'DecreaseSoldiersRadius', iconFrame: 11, text: 'Decrease Soldiers Circle' },
            { function: 'MageDamageUpgrade', iconFrame: 1, text: 'Increase Mage Damage' },

            // ... add other upgrade options here
        ];

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleArray(upgradeOptions);

        const upgradePositions = [
            { x: centerX - 270, y: centerY + 75 },
            { x: centerX + 80, y: centerY + 70 },
            { x: centerX + 80, y: centerY - 90 },
            { x: centerX - 270, y: centerY - 85 },
        ];

        const iconScale = 1.5;
        const textOffsetY = 25; // Adjust this value to change the vertical separation between icon and text

        for (let i = 0; i < 4; i++) {
            const upgradeOption = upgradeOptions[i];
            const position = upgradePositions[i];

            const icon = this.add.sprite(position.x, position.y, 'upgradeIcons', upgradeOption.iconFrame);
            icon.setInteractive().setScale(iconScale).on('pointerdown', () => {
                upgradeSystem[upgradeOption.function]();
                this.scene.stop();
                this.currentScene.togglePause();
            });

            const text = this.add.text(position.x, position.y + textOffsetY, upgradeOption.text, {
                fontFamily: 'custom',
                fontSize: '21px',
                align: 'right',
                color: '#ffffff'
            });
            text.setOrigin(-0.17, 1.5); // Set text origin to center horizontally and top vertically
            text.setInteractive().on('pointerdown', () => {
                upgradeSystem[upgradeOption.function]();
                this.scene.stop();
                this.currentScene.togglePause();
            });
        }

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
                    
            const upgradeSystem = new UpgradeSystem(this.currentScene);
            upgradeSystem.RestoreSoldiersHealth();
                    
            this.scene.stop('UpgradeScene');
            this.scene.resume(this.currentScene);
        }
        
    }
}
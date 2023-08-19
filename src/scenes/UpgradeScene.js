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
        this.currentScene.levelUpSound.play();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        this.background = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        this.add.image(centerX, centerY, 'border');

        const upgradeSystem = new UpgradeSystem(
            this.currentScene
        );

        const upgradeOptions = [
            { function: 'SoldierHealthUpgrade', iconFrame: 9, text: 'Increases Soldier\n Health by 20%' },
            { function: 'BuySoldiers', iconFrame: 18, text: ' Buy Extra\n Soldiers' },
            { function: 'SoldierDamageUpgrade', iconFrame: 0, text: 'Increases Soldier\n Damage by 20%' },
            { function: 'ArcherDamageUpgrade', iconFrame: 2, text: 'Increases Archer\n Damage by 20%' },
            { function: 'IncreaseLightRadius', iconFrame: 7, text: 'Increases Light\n Circle ' },
            { function: 'BuyMages', iconFrame: 18, text: 'Buy 2\n Extra Mages' },
            { function: 'BuyArchers', iconFrame: 18, text: 'Buy 5\n Extra Archers' },
            { function: 'RestoreSoldiersHealth', iconFrame: 19, text: 'Restore Total\n Health' },
            { function: 'DecreaseSoldiersRadius', iconFrame: 11, text: 'Decrease Soldiers\n Circle by 20%' },
            { function: 'MageDamageUpgrade', iconFrame: 1, text: 'Increase Mage\n Damage by 30%' },
            { function: 'MageAttackSpeed', iconFrame: 1, text: 'Increase Mage\n Attack\n Speed by 30%' },

        ];

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleArray(upgradeOptions);

        const upgradePositions = [
            { x: centerX - 220, y: centerY + 90 },
            { x: centerX + 80, y: centerY + 90 },
            { x: centerX + 80, y: centerY - 90 },
            { x: centerX - 220, y: centerY - 90 },
        ];

        const iconScale = 1.8;
        const textOffsetY = 20; // Adjust this value to change the vertical separation between icon and text

        for (let i = 0; i < 4; i++) {
            const upgradeOption = upgradeOptions[i];
            const position = upgradePositions[i];

            const icon = this.add.sprite(position.x, position.y, 'upgradeIcons', upgradeOption.iconFrame);
            icon.setInteractive().setScale(iconScale).on('pointerdown', () => {
                upgradeSystem[upgradeOption.function]();
                this.currentScene.upgradeSound.play();
                this.scene.stop();
                this.currentScene.togglePause();
            });

            const text = this.add.text(position.x, position.y + textOffsetY, upgradeOption.text, {
                fontFamily: 'custom',
                fontSize: '25px',
                align: 'center',
                color: '#ffffff'
            });
            text.setOrigin(-0.3, 1); // Set text origin to center horizontally and top vertically
            text.setInteractive().on('pointerdown', () => {
                upgradeSystem[upgradeOption.function]();
                this.scene.stop();
                this.currentScene.togglePause();
            });
        }

    }
}
export default class UpgradeSystem {
    constructor(currentScene) {
        this.currentScene = currentScene;
    }

    MageDamageUpgrade() {
        const upgradeModifier = 1;

        this.currentScene.gameData.mageStats.damage += upgradeModifier;
    }

    ArcherDamageUpgrade() {
        const upgradeModifier = 2;

        this.currentScene.gameData.archerStats.damage += upgradeModifier;
    }

    SoldierDamageUpgrade() {
        const upgradeModifier = 2;

        this.currentScene.gameData.meleeSoldierStats.damage += upgradeModifier;
    }

    SoldierHealthUpgrade() {
        const upgradeModifier = 2;

        this.currentScene.gameData.meleeSoldierStats.health *= upgradeModifier;
    }

    IncreaseLightRadius() {
        this.currentScene.fogOfWar.sightRadius = Math.min(this.currentScene.fogOfWar.sightRadius + 150, 250)
    }

    DecreaseSoldiersRadius() {
        this.currentScene.soldierManagementSystem.radius = Math.max(this.currentScene.soldierManagementSystem.radius - 20, 100);
    }

    BuySoldiers() {
        const numberOfSoldiersOptions = [10, 15, 20];
        const randomIndex = Math.floor(Math.random() * numberOfSoldiersOptions.length);
        const numberOfSoldiers = numberOfSoldiersOptions[randomIndex];

        for (let i = 0; i < numberOfSoldiers; i++) {
            if (this.currentScene.sys.config.key == 'Level2Scene') {
                this.currentScene.entityDeployer.deploySoldier(this.currentScene.gameData.meleeSoldierStats, true);
            } else {
                this.currentScene.entityDeployer.deploySoldier(this.currentScene.gameData.meleeSoldierStats);
            }
        }
    }

    BuyMages() {
        for (let i = 0; i < 2; i++) {
            if (this.currentScene.sys.config.key == 'Level2Scene') {
                this.currentScene.entityDeployer.deployMage(this.currentScene.gameData.mageStats, true);
            } else {
                this.currentScene.entityDeployer.deployMage(this.currentScene.gameData.mageStats);
            }
        }
    }

    BuyArchers() {
        for (let i = 0; i < 5; i++) {
            if (this.currentScene.sys.config.key == 'Level2Scene') {
                this.currentScene.entityDeployer.deployArcher(this.currentScene.gameData.archerStats, true);
            } else {
                this.currentScene.entityDeployer.deployArcher(this.currentScene.gameData.archerStats);
            }
        }
    }

    RestoreSoldiersHealth() {
        this.currentScene.soldierList.forEach(soldier => {
            soldier.health.setCurrentHealthToMax();
        });
    }
}

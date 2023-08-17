export default class UpgradeSystem {
    constructor(gameData) {
        this.gameData = gameData;
    }

    applyUpgrades() {
        const upgradeModifier = 2; 

        this.gameData.meleeSoldierStats.health *= upgradeModifier;
        this.gameData.meleeSoldierStats.damage += upgradeModifier;
    }
}

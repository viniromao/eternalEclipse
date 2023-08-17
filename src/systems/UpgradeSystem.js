export default class UpgradeSystem {
    constructor(gameData) {
        this.gameData = gameData;
    }

    applyUpgrades() {
        const upgradeModifier = 2; // Upgrade modifier


        console.log("Health before upgrades:", this.gameData.meleeSoldierStats.health);
        console.log("Damage before upgrades:", this.gameData.meleeSoldierStats.damage);
    
        // Apply upgrades to soldiers
        this.gameData.meleeSoldierStats.health += Math.round(this.gameData.meleeSoldierStats.health * upgradeModifier);
        this.gameData.meleeSoldierStats.damage += Math.round(this.gameData.meleeSoldierStats.damage * upgradeModifier);

        console.log("Upgrades applied");

        console.log("Health after upgrades:", this.gameData.meleeSoldierStats.health);
        console.log("Damage after upgrades:", this.gameData.meleeSoldierStats.damage);
    
        
    }
}

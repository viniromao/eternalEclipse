export default class UpgradeSystem {
    constructor(gameData, fogOfWar, entityDeployer) {
        this.gameData = gameData;
        fogOfWar = fogOfWar;
        this.entityDeployer = entityDeployer;
    }

    applyUpgrades() {
        const upgradeModifier = 2; 

        this.gameData.meleeSoldierStats.health *= upgradeModifier;
        this.gameData.meleeSoldierStats.damage += upgradeModifier;
    }

    SoldierDamageUpgrade() {
        const upgradeModifier= 2; 

        console.log("dam before:" + this.gameData.meleeSoldierStats.damage)

        this.gameData.meleeSoldierStats.damage += upgradeModifier;

        console.log("dam after:" + this.gameData.meleeSoldierStats.damage)
    }
    
    SoldierHealthUpgrade(){
        const upgradeModifier= 2; 

        console.log("health before:" + this.gameData.meleeSoldierStats.health)

        this.gameData.meleeSoldierStats.health *= upgradeModifier;
    
        console.log("health after:" + this.gameData.meleeSoldierStats.health)

    }

    IncreaseLightRadius() {
        console.log("old light radius:", this.fogOfWar.sightRadius);
    
        this.fogOfWar.sightRadius *= 2;
    
        console.log("increased");
    
        console.log("new light radius:", this.fogOfWar.sightRadius);
    }
    

    LongerLightDuration(){
        console.log("refueling")
    }

    BuySoldiers() {

        const entityDeployer = new EntityDeployer(this.scene);

        for (let i = 0; i < 5; i++) {
            entityDeployer.deploySoldier();
        }

        console.log("Buying soldiers")

    }   
}

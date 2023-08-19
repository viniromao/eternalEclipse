export default class UpgradeSystem {
    constructor(currentScene) {
        this.currentScene = currentScene;
    }
    
    MageAttackSpeed(){
        console.log(this.currentScene.levelProgressionSystem.initShootSystem());
        this.currentScene.levelProgressionSystem.initShootSystem(2000); // Call initShootSystem with the desired period
        console.log(this.currentScene.levelProgressionSystem.initShootSystem());
    }

    MageDamageUpgrade() {
        const upgradeModifier= 1; 

        this.currentScene.gameData.mageStats.damage += upgradeModifier;

        console.log("MageDamageUpgrade")
    }

    ArcherDamageUpgrade() {
        const upgradeModifier= 2;

        this.currentScene.gameData.archerStats.damage += upgradeModifier;
        console.log("ArcherDamageUpgrade")
    }

    SoldierDamageUpgrade() {
        const upgradeModifier= 2;

        this.currentScene.gameData.meleeSoldierStats.damage += upgradeModifier;
        console.log("SoldierDamageUpgrade")

    }
    
    SoldierHealthUpgrade(){
        const upgradeModifier= 2;

        this.currentScene.gameData.meleeSoldierStats.health *= upgradeModifier;
        console.log("SoldierHealthUpgrade")

    }

    IncreaseLightRadius() {
        this.currentScene.fogOfWar.sightRadius = Math.min(this.currentScene.fogOfWar.sightRadius + 150, 250)
        console.log("IncreaseLightRadius")

    }

    DecreaseSoldiersRadius(){
        console.log("before: " + this.currentScene.soldierManagementSystem.radius)
        this.currentScene.soldierManagementSystem.radius = Math.max(this.currentScene.soldierManagementSystem.radius -20 , 100);
        console.log("after: " + this.currentScene.soldierManagementSystem.radius)
    }
    
    BuySoldiers() {
        const numberOfSoldiersOptions = [10, 15, 20];
        const randomIndex = Math.floor(Math.random() * numberOfSoldiersOptions.length);
        const numberOfSoldiers = numberOfSoldiersOptions[randomIndex];
    
        for (let i = 0; i < numberOfSoldiers; i++) {
            this.currentScene.entityDeployer.deploySoldier(this.currentScene.gameData.meleeSoldierStats);
        }
        console.log("BuySoldiers")

    }   

    BuyMages(){
        for (let i = 0; i < 2; i++) {
            this.currentScene.entityDeployer.deployMage(this.currentScene.gameData.mageStats);
        }
        console.log("BuyMages")

    }

    BuyArchers(){
        for (let i = 0; i < 5; i++) {
            this.currentScene.entityDeployer.deployArcher(this.currentScene.gameData.archerStats);
        }
        console.log("BuyArchers")

    }

    RestoreSoldiersHealth(){
        this.currentScene.soldierList.forEach(soldier => {
            soldier.health.setCurrentHealthToMax();
        });
        console.log("RestoreSoldiersHealth")
    }
}

import TimerManager from "./TimeManager.js"
import GameDataComponent from "../components/GameDataComponent.js";

export default class LevelProgressionSystem {
    constructor(scene) {
        this.scene = scene
        this.gameData = this.scene.gameData
        this.initTimers();
        this.initShootSystem(3000);
    }

    level1() {
        this.elapsedTime = 0;
        this.monsterDeployTimer.start();
        this.monsterSwarm.start();
        this.skeletonDeployTimer.start();
        this.acherDeployTimer.start();
        this.archersShootTimer.start();

        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.elapsedTime += 1;

                if (this.elapsedTime === 30) {
                    this.monsterSwarm.stop();
                    this.wormDeployTimer.start()
                }

                if (this.elapsedTime === 60) {
                    this.scorpionDeployTimer.start()

                }

                if (this.elapsedTime === 90) {
                    this.batDeployTimer.start();
                }


                if (this.elapsedTime === 120) {
                    this.monsterDeployTimer.stop();
                    this.scorpionDeployTimer.stop();
                    this.wormDeployTimer.stop();
                    this.batDeployTimer.stop();
                    this.skeletonDeployTimer.stop();
                    this.monsterSwarm.stop();
                    this.acherDeployTimer.stop();
                    this.archersShootTimer.stop();
                    this.scene.stopScene();
                    this.verifyEndLevelTimer.start();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    level2() {
        this.piggyTimer.start();
        this.acherDeployTimer.start();

        this.elapsedTime = 0;

        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.elapsedTime += 1;

                if (this.elapsedTime == 5) {
                    this.piggySwarm.start();
                }

                if (this.elapsedTime == 10) {
                    this.piggySwarm.stop();
                    this.piggyChariotTimer.start();
                }


                if (this.elapsedTime === 30) {
                }

                if (this.elapsedTime === 60) {

                }

                if (this.elapsedTime === 90) {
                }

            },
            callbackScope: this,
            loop: true
        });
    }


    initTimers() {

        this.monsterDeployTimer = new TimerManager(this.scene, this, 1000, this.createMonster);

        this.scorpionDeployTimer = new TimerManager(this.scene, this, 1000, this.createScorpion);

        this.wormDeployTimer = new TimerManager(this.scene, this, 3000, this.createWorm);

        this.batDeployTimer = new TimerManager(this.scene, this, 500, this.createBat);

        // this.archersShootTimer = new TimerManager(this.scene, this, 3000, this.shootArrows)

        this.piggyTimer = new TimerManager(this.scene, this, 1000, this.createPiggy);

        this.piggySwarm = new TimerManager(this.scene, this, 1000, this.createPiggySwarm);

        this.piggyChariotTimer = new TimerManager(this.scene, this, 3000, this.createPiggyChariot);

        this.dinossaurTimer = new TimerManager(this.scene, this, 500, this.createDinossaur);

        this.mageDinossaurTimer = new TimerManager(this.scene, this, 1000, this.createMageDinossaur);

        this.beeTimer = new TimerManager(this.scene, this, 3000, this.createBee);

        this.darkLordRatTimer = new TimerManager(this.scene, this, 500, this.createDarkLordRat);

        this.slimeTimer = new TimerManager(this.scene, this, 1000, this.createSlime);

        this.skeletonDeployTimer = new TimerManager(this.scene, this, 3000, this.createMonster);

        this.monsterSwarm = new TimerManager(this.scene, this, 10000, this.createSwarm);

        this.acherDeployTimer = new TimerManager(this.scene, this, 300, this.createSoldier);

        this.verifyEndLevelTimer = new TimerManager(this.scene, this, 1000, this.verifyEndLevel);

    }

    initShootSystem(period){
        if (!this.archersShootTimer) {
            this.archersShootTimer = new TimerManager(this.scene, this, period, this.shootArrows);
            this.archersShootTimer.start();
        }
    }
    

    shootArrows() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.soldierManagementSystem.shootArchersArrows()
        this.scene.soldierManagementSystem.castFireballs()
        this.scene.animationSystem.addGoodGuyCustomAnimation(this.scene.player, this.scene.player.attackAnimation, null, 4)
    }

    createScorpion() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.scorpionStats)
    }

    verifyEndLevel() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.monstersList.length == 0) {
            this.scene.stopScene();
            this.scene.scene.stop('MainScene');
            this.scene.scene.start('VictoryScene', { nextScene: 'Level2Scene' });
        }
    }

    createWorm() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.wormStats)
    }

    createPiggy() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.piggyStats)
    }

    createPiggySwarm() {
        if (this.scene.isPaused) {
            return;
        }
        for (let i = 0; i < 5; i++)
            this.scene.entityDeployer.deployMonster(this.gameData.piggyStats)
    }

    createPiggyChariot() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.piggyChariotStats)
    }

    createDinossaur() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.dinosaurStats)
    }

    createMageDinossaur() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.mageDinosaurStats)
    }

    createBee() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.beeStats)
    }

    createDarkLordRat() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.ratDarkLordStats)
    }

    createSlime() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.slimeStats)
    }

    createBat() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.batStats)
    }


    createMonster() {

        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.skeletonStats)
    }


    createSwarm() {
        if (this.scene.isPaused) {
            return;
        }
        for (let i = 0; i < 20; i++) {
            this.scene.entityDeployer.deployMonster(this.gameData.skeletonStats)
        }
    }

    createSoldier() {
        if (this.scene.isPaused) {
            return;
        }

        while (this.scene.archersList.length < 10)
            this.scene.entityDeployer.deployArcher(this.gameData.archerStats)

        while (this.scene.soldierList.length < 18)
            this.scene.entityDeployer.deploySoldier(this.gameData.meleeSoldierStats)

        while (this.scene.mages.length < 4)
            this.scene.entityDeployer.deployMage(this.gameData.mageStats)

        this.acherDeployTimer.stop();

    }

}
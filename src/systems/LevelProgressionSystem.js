import TimerManager from "./TimeManager.js"
import GameDataComponent from "../components/GameDataComponent.js";

export default class LevelProgressionSystem {
    constructor(scene) {
        this.scene = scene
        this.gameData = this.scene.gameData
        this.initTimers();
    }

    level1() {
        this.elapsedTime = 0;
        this.monsterDeployTimer.start();
        this.monsterSwarm.start();
        this.skeletonDeployTimer.start();
        this.acherDeployTimer.start();
        this.initShootSystem(2000)

        this.mainTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.elapsedTime += 1;

                if (this.elapsedTime == 5) {
                    this.monsterSwarm.start()
                }

                if (this.elapsedTime === 30) {
                    this.monsterSwarm.stop()
                    this.wormDeployTimer.start()
                }



                if (this.elapsedTime === 60) {
                    this.scorpionDeployTimer.start()

                }

                if (this.elapsedTime === 90) {
                    this.batDeployTimer.start();
                    this.monsterSwarm.start()
                }

                if (this.elapsedTime === 120) {
                    this.eyeDeployTimer.start()
                    this.monsterSwarm.stop()
                    this.monsterHandDeployTimer.start()
                }


                if (this.elapsedTime === 150) {
                    this.monsterSwarm.start()
                    // this.ghostDeployTimer.start()
                }


                if (this.elapsedTime === 180) {
                    this.monsterSwarm.stop()
                    // this.ghostDeployTimer.start()
                    this.beeTimer.start()
                }


                if (this.elapsedTime === 240) {
                    // this.ghostDeployTimer.stop();
                    this.monsterDeployTimer.stop();
                    this.beeTimer.stop()
                    this.scorpionDeployTimer.stop();
                    this.wormDeployTimer.stop();
                    this.batDeployTimer.stop();
                    this.skeletonDeployTimer.stop();
                    this.monsterHandDeployTimer.stop();
                    this.eyeDeployTimer.stop();
                    this.acherDeployTimer.stop();
                    this.verifyEndLevelTimer.start();
                }
            },
            callbackScope: this,
            loop: true
        });
    }


    level3() {

        this.elapsedTime = 0;
        this.piggyTimer.start();
        this.acherDeployTimer.start();
        this.initShootSystem(2000)

        this.mainTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.elapsedTime += 1;

                if (this.elapsedTime == 5) {
                    this.piggySwarm.start();
                }

                if (this.elapsedTime == 10) {
                    this.piggyChariotTimer.start();
                }

                if (this.elapsedTime === 60) {
                    this.piggySwarm.stop();
                    this.piggyChariotTimer.stop();
                    this.piggyTimer.stop();

                }

                if (this.elapsedTime === 70) {
                    this.piggySwarm.start();
                    this.piggyChariotTimer.start();
                    this.piggyTimer.start();
                }

                if (this.elapsedTime === 120) {
                    this.piggySwarm.stop()
                    this.dinossaurTimer.start();

                }


                if (this.elapsedTime === 150) {
                    this.mageDinossaurTimer.start()
                }


                if (this.elapsedTime === 180) {
                    this.darkLordRatTimer.start()
                }


                if (this.elapsedTime === 210) {
                    this.piggySwarm.start()
                }

                if (this.elapsedTime === 240) {
                    this.darkLordRatTimer.stop()
                    this.piggyChariotTimer.stop()
                    this.piggySwarm.stop()
                    this.piggyTimer.stop()
                    this.mageDinossaurTimer.stop()
                    this.dinossaurTimer.stop();
                    this.verifyEndLevelTimer.start();
                }

            },
            callbackScope: this,
            loop: true
        });
    }

    level2() {

        this.elapsedTime = 0;
        this.ghostDeployTimer.start();
        this.acherDeployTimer.start();
        this.initShootSystem(2000)

        this.mainTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.elapsedTime += 1;

                if(this.elapsedTime === 30) {
                    this.darkLordRatTimer.start()
                }

                if (this.elapsedTime === 60) {
                    this.demonDeployTimer.start();
                }

                if(this.elapsedTime === 90) {
                    this.darkLordRatTimer.stop()
                }

                if(this.elapsedTime === 120) {
                    this.ghostSwarm.start()
                }


                if(this.elapsedTime === 150) {
                    this.ghostSwarm.stop()
                    this.slimeTimer.start();
                    this.darkLordRatTimer.start()
                }

                if (this.elapsedTime === 190) {
                    this.darkLordRatTimer.stop()
                    this.ghostDeployTimer.stop();
                    this.demonDeployTimer.stop();
                    this.acherDeployTimer.stop();
                    this.slimeTimer.stop()
                    this.verifyEndLevelTimer.start();
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

        this.eyeDeployTimer = new TimerManager(this.scene, this, 1000, this.createEye);

        this.monsterHandDeployTimer = new TimerManager(this.scene, this, 1500, this.createMonsterHand);

        this.ghostDeployTimer = new TimerManager(this.scene, this, 300, this.createGhost);

        this.ghostSwarm = new TimerManager(this.scene, this, 10000, this.createGhostSwarm);

        this.demonDeployTimer = new TimerManager(this.scene, this, 1500, this.createDemon);

        // this.archersShootTimer = new TimerManager(this.scene, this, 3000, this.shootArrows)

        this.piggyTimer = new TimerManager(this.scene, this, 500, this.createPiggy);

        this.piggySwarm = new TimerManager(this.scene, this, 1000, this.createPiggySwarm);

        this.piggyChariotTimer = new TimerManager(this.scene, this, 1000, this.createPiggyChariot);

        this.dinossaurTimer = new TimerManager(this.scene, this, 500, this.createDinossaur);

        this.mageDinossaurTimer = new TimerManager(this.scene, this, 1000, this.createMageDinossaur);

        this.beeTimer = new TimerManager(this.scene, this, 3000, this.createBee);

        this.darkLordRatTimer = new TimerManager(this.scene, this, 500, this.createDarkLordRat);

        this.slimeTimer = new TimerManager(this.scene, this, 3000, this.createSlime);

        this.skeletonDeployTimer = new TimerManager(this.scene, this, 3000, this.createMonster);

        this.monsterSwarm = new TimerManager(this.scene, this, 10000, this.createSwarm);

        this.acherDeployTimer = new TimerManager(this.scene, this, 300, this.createSoldier);

        this.verifyEndLevelTimer = new TimerManager(this.scene, this, 1000, this.verifyEndLevel);

    }

    initShootSystem(period) {
        if (!this.archersShootTimer) {
            this.archersShootTimer = new TimerManager(this.scene, this, period, this.shootArrows);
            this.archersShootTimer.start();
        }
    }

    decreaseTimerDelay(amount) {
        const newDelay = Math.max(this.archersShootTimer.delay - amount, 0); // Make sure the delay doesn't go negative
        this.createTimer(newDelay);
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
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.scorpionStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.scorpionStats)
        }
    }

    createEye() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.eyeStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.eyeStats)
        }
    }

    createGhost() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.ghostStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.ghostStats)
        }
    }

    createDemon() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.demonStats)

        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.demonStats)

        }
    }

    createMonsterHand() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.monsterHandStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.monsterHandStats)
        }
    }

    verifyEndLevel() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.monstersList.length == 0) {
            this.scene.stopScene();
            this.scene.scene.stop();
            this.scene.scene.start('VictoryScene', { nextScene: this.scene.nextScene });
        }
    }

    createWorm() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.wormStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.wormStats)
        }
    }

    createPiggy() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.piggyStats)

        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.piggyStats)

        }
    }

    createPiggySwarm() {
        if (this.scene.isPaused) {
            return;
        }
        for (let i = 0; i < 5; i++) {
            if (this.scene.sys.config.key == 'Level2Scene') {
                this.scene.entityDeployer.deployMonster2(this.gameData.piggyStats)
            } else {
                this.scene.entityDeployer.deployMonster(this.gameData.piggyStats)
            }
        }
    }

    createGhostSwarm() {
        if (this.scene.isPaused) {
            return;
        }
        for (let i = 0; i < 15; i++) {
            if (this.scene.sys.config.key == 'Level2Scene') {
                this.scene.entityDeployer.deployMonster2(this.gameData.ghostStats)
            } else {
                this.scene.entityDeployer.deployMonster(this.gameData.ghostStats)
            }
        }
    }



    createPiggyChariot() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.piggyChariotStats)

        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.piggyChariotStats)

        }
    }

    createDinossaur() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.dinosaurStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.dinosaurStats)
        }
    }

    createMageDinossaur() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.mageDinosaurStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.mageDinosaurStats)
        }
    }

    createBee() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.beeStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.beeStats)
        }
    }

    createDarkLordRat() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.ratDarkLordStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.ratDarkLordStats)
        }
    }

    createSlime() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.slimeStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.slimeStats)
        }
    }

    createBat() {
        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.batStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.batStats)
        }
    }


    createMonster() {

        if (this.scene.isPaused) {
            return;
        }
        if (this.scene.sys.config.key == 'Level2Scene') {
            this.scene.entityDeployer.deployMonster2(this.gameData.skeletonStats)
        } else {
            this.scene.entityDeployer.deployMonster(this.gameData.skeletonStats)
        }
    }


    createSwarm() {
        if (this.scene.isPaused) {
            return;
        }
        for (let i = 0; i < 20; i++) {
            if (this.scene.sys.config.key == 'Level2Scene') {
                this.scene.entityDeployer.deployMonster2(this.gameData.skeletonStats)

            } else {
                this.scene.entityDeployer.deployMonster(this.gameData.skeletonStats)

            }
        }
    }

    createSoldier() {
        if (this.scene.isPaused) {
            return;
        }

        if (this.scene.sys.config.key == 'Level2Scene') {
            while (this.scene.archersList.length < 20)
                this.scene.entityDeployer.deployArcher(this.gameData.archerStats, true)

            while (this.scene.soldierList.length < 35)
                this.scene.entityDeployer.deploySoldier(this.gameData.meleeSoldierStats, true)

            while (this.scene.mages.length < 8)
                this.scene.entityDeployer.deployMage(this.gameData.mageStats, true)
        } else if (this.scene.sys.config.key == 'Level3Scene') {
            while (this.scene.archersList.length < 30)
                this.scene.entityDeployer.deployArcher(this.gameData.archerStats)

            while (this.scene.soldierList.length < 60)
                this.scene.entityDeployer.deploySoldier(this.gameData.meleeSoldierStats)

            while (this.scene.mages.length < 12)
                this.scene.entityDeployer.deployMage(this.gameData.mageStats)

        } else {
            while (this.scene.archersList.length < 5)
                this.scene.entityDeployer.deployArcher(this.gameData.archerStats)

            while (this.scene.soldierList.length < 10)
                this.scene.entityDeployer.deploySoldier(this.gameData.meleeSoldierStats)

            while (this.scene.mages.length < 5)
                this.scene.entityDeployer.deployMage(this.gameData.mageStats)
        }

        this.acherDeployTimer.stop();

    }

}
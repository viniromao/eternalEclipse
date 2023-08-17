import TimerManager from "./TimeManager.js"
import GameDataComponent from "../components/GameDataComponent.js";

export default class LevelProgressionSystem {
    constructor(scene) {
        this.scene = scene
        this.gameData = new GameDataComponent()
        this.initTimers();
    }

    level1() {
        this.elapsedTime = 0;

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

                
                // if (this.elapsedTime === 5) {
                //     this.monsterDeployTimer.stop();
                //     this.scorpionDeployTimer.stop();
                //     this.wormDeployTimer.stop();
                //     this.batDeployTimer.stop();
                //     this.skeletonDeployTimer.stop();
                //     this.monsterSwarm.stop();
                //     this.soldierDeployTimer.stop();
                //     this.acherDeployTimer.stop();
                //     this.scene.stopScene();
                //     this.scene.scene.stop('MainScene');
                //     this.scene.scene.launch('Level2Scene');

                // }
            },
            callbackScope: this,
            loop: true
        });
    }

    level2() {
        this.elapsedTime = 0;

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

            },
            callbackScope: this,
            loop: true
        });
    }


    initTimers() {

        this.monsterDeployTimer = new TimerManager(this.scene, this, 1000, this.createMonster);
        this.monsterDeployTimer.start();

        this.scorpionDeployTimer = new TimerManager(this.scene, this, 1000, this.createScorpion);

        this.wormDeployTimer = new TimerManager(this.scene, this, 3000, this.createWorm);

        this.batDeployTimer = new TimerManager(this.scene, this, 500, this.createBat);

        this.skeletonDeployTimer = new TimerManager(this.scene, this, 3000, this.createMonster);
        this.skeletonDeployTimer.start();

        this.monsterSwarm = new TimerManager(this.scene, this, 10000, this.createSwarm);
        this.monsterSwarm.start();

        this.soldierDeployTimer = new TimerManager(this.scene, this, 300, this.createSoldier);
        this.soldierDeployTimer.start();

        this.acherDeployTimer = new TimerManager(this.scene, this, 300, this.createSoldier);
        this.acherDeployTimer.start();

        // this.archerFireTimer = new TimerManager(this, 300, this.archerFire);
        // this.archerFireTimer.start();
    }

    createScorpion() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.scorpionStats)
    }

    createWorm() {
        if (this.scene.isPaused) {
            return;
        }
        this.scene.entityDeployer.deployMonster(this.gameData.wormStats)
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
        if (this.scene.archersList.length < 4) {
            this.scene.entityDeployer.deployArcher()
        } else {
            this.soldierDeployTimer.stop()
        }

        if (this.scene.soldierList.length < 12) {
            this.scene.entityDeployer.deploySoldier()
        }
        else {
            this.acherDeployTimer.stop()
        }
    }




}

import Line from "./components/Line.js"
import ArcherRange from "./components/ArcherRange.js"

import TimerManager from "./systems/TimeManager.js"
import SoldierManagementSystem from "./systems/SoldierManagementSystem.js"
import MovementSystem from "./systems/MovementSystem.js"
import AnimationSystem from "./systems/AnimationSystem.js"
import EntityDeployer from "./systems/EntityDeployer.js"
import CollisionSystem from "./systems/CollisionSystem.js"
import DeathSystem from "./systems/DeathSystem.js"
import FogOfWar from "./systems/FogOfWar.js"
import LevelProgressionSystem from "./systems/LevelProgressionSystem.js"

import StartScene from "./scenes/StartScene.js"
import GameOverScene from "./scenes/GameOverScene.js"
import GrassBackground from "./components/Background.js"
import LoadingScene from "./scenes/Loading.js"
import UpgradeScene from "./scenes/UpgradeScene.js"


class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.createSystems();
        this.createPlayer();
        this.initInputs();
        this.initData();
        this.initTimers();
        this.initSounds();
        this.loadProgressBar();
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.physics.world.timeScale = this.isPaused ? 0 : 1;
    }

    upgrade() {
        this.scene.launch('UpgradeScene');
        this.togglePause(); // Pause the game
    }
    
    gameOver() {
        this.grassBackground.destroySprites()
        this.togglePause();
        this.themeSound.stop();
        this.gameOverSound.play();
        this.scene.launch('GameOverScene', this.gameOverSound);
    }

    update() {

        this.inputListener();

        // If the game is paused, don't execute further update logic
        if (this.isPaused) {
            return;
        }

        this.counter++

        if (this.counter % 10 == 0) {
            this.soldierManagementSystem.updateSemiCirclePositions()
            this.soldierManagementSystem.updateArchersSemiCirclePositions()
        }

        if (this.counter % 5 == 0) {
            this.collisionSystem.update();
        }

        this.monstersList.forEach(monster => {
            this.movementSystem.update(monster, this);
            this.fogOfWar.isHidden(this.firePlace, monster, this.fogOfWar.sightRadius)
        });
        this.soldierList.forEach(soldier => {
            this.movementSystem.update(soldier, this);
        });
        this.archersList.forEach(archer => {
            this.movementSystem.update(archer, this);
        });
        this.movementSystem.update(this.player, this);

        if (this.counter % 5 == 0) {
            this.deathSystem.update(this.monstersList);
            this.deathSystem.update(this.archersList);
            this.deathSystem.update(this.soldierList);
        }

        this.draw();
    }

    createMonster() {
        if (this.isPaused) {
            return;
        }
        this.entityDeployer.deployMonster(10, 1, 1)
    }

    createSoldier() {
        if (this.isPaused) {
            return;
        }
        if (this.archersList.length < 4) {
            this.entityDeployer.deployArcher()
        } else {
            this.soldierDeployTimer.stop()
        }

        if (this.soldierList.length < 12) {
            this.entityDeployer.deploySoldier()
        }
        else {
            this.acherDeployTimer.stop()
        }
    }

    createPlayer() {
        this.entityDeployer.deployTheKing();
    }

    createSystems() {
        this.targetSystem = []
        this.levelProgressionSystem = new LevelProgressionSystem(this)
        this.fogOfWar = new FogOfWar(this, this.sys.game.config.width, this.sys.game.config.height, 250)
        this.soldierManagementSystem = new SoldierManagementSystem(this, 150)
        this.collisionSystem = new CollisionSystem(this, 30, 15)
        this.entityDeployer = new EntityDeployer(this);
        this.animationSystem = new AnimationSystem(this);
        this.movementSystem = new MovementSystem(1);
        this.deathSystem = new DeathSystem(this)
    }

    initInputs() {
        this.input.on('pointerdown', () => {
            this.entityDeployer.deploySoldier(this.soldierManagementSystem);
        });

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.gameOverKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        
        this.upgradeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

        // this.input.on('pointermove', (pointer) => {
        //     if (this.archerRange != null) {
        //         this.archerRange.draw(pointer.x, pointer.y);
        //     }
        // });
    }

    inputListener() {
        if (Phaser.Input.Keyboard.JustDown(this.upgradeKey)) {
            this.upgrade();
        }

        if (Phaser.Input.Keyboard.JustDown(this.gameOverKey)) {
            this.gameOver();
        }

        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.togglePause();
        }
    }

    initData() {
        this.grassBackground = new GrassBackground(this);
        this.isPaused = false;
        this.entityDeployer.deployFireplace()
        this.archerRange = new ArcherRange(this, 50);
        this.line = new Line(this, this.player.position.x, this.player.position.y, 150);
        this.soldierList = []
        this.monstersList = []
        this.archersList = []
        this.counter = 0
    }

    initTimers() {
        this.monsterDeployTimer = new TimerManager(this, 1000, this.createMonster);
        this.monsterDeployTimer.start();

        this.soldierDeployTimer = new TimerManager(this, 300, this.createSoldier);
        this.soldierDeployTimer.start();

        this.acherDeployTimer = new TimerManager(this, 300, this.createSoldier);
        this.acherDeployTimer.start();

        // this.archerFireTimer = new TimerManager(this, 300, this.archerFire);
        // this.archerFireTimer.start();
    }

    initSounds() {
        this.themeSound = this.sound.add('themeSound');
        this.themeSound.setVolume(.1);
        this.themeSound2 = this.sound.add('themeSound2');
        this.themeSound2.setVolume(.4);
        this.themeSound.play();

        this.themeSound.once('complete', () => {
            this.themeSound2.play();
        });

        this.soldierDeathSound = this.sound.add('death')
        this.soldierDeathSound.setVolume(.6);

        this.monsterDeathSound = this.sound.add('monsterDeath')
        this.monsterDeathSound.setVolume(.1);

        this.gameOverSound = this.sound.add('gameOver')
        this.gameOverSound.setVolume(.2);

        this.attackHumanSound = this.sound.add('attackHuman')
        this.attackHumanSound.setVolume(.06);
    }

    draw() {
        // this.targetSystem.forEach(target => target.draw())
        this.fogOfWar.drawFog([this.firePlace])
        this.line.drawLine();
    }

    archerFire() {

    }

    loadProgressBar() {
        this.progressBar = this.add.image(this.sys.game.config.width / 2, 20, 'progress_bar');
        this.progressBar.setScale(1);
    }
}

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 448,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },  
    scene: [LoadingScene,StartScene, MainScene, UpgradeScene, GameOverScene],
    backgroundColor: '#000'
};

var game = new Phaser.Game(config);
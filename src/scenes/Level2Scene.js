import Line from "../components/Line.js"
import ArcherRange from "../components/ArcherRange.js"

import SoldierManagementSystem from "../systems/SoldierManagementSystem.js"
import MovementSystem from "../systems/MovementSystem.js"
import AnimationSystem from "../systems/AnimationSystem.js"
import EntityDeployer from "../systems/EntityDeployer.js"
import CollisionSystem from "../systems/CollisionSystem.js"
import DeathSystem from "../systems/DeathSystem.js"
import FogOfWar from "../systems/FogOfWar.js"
import LevelProgressionSystem from "../systems/LevelProgressionSystem.js"

import ProgressBarManager from '../systems/ProgressBarManager.js';
import GameDataComponent from '../components/GameDataComponent.js';
import OverlapSystem from "../systems/OverlapSystem.js"


export default class Level2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2Scene' });
        this.gameData = new GameDataComponent();
        this.progressBarManager = null; // Add this line
    }

    upgrade() {
        this.scene.launch('UpgradeScene', { gameData: this.gameData, fogOfWar: this.fogOfWar, scene: this }, this.soldierManagementSystem);
        this.togglePause(); // Pause the game
    }

    init() {
        this.initData();
    }

    create() {
        this.fogOfWar = new FogOfWar(this, this.sys.game.config.width, this.sys.game.config.height, 250)

        this.progressBarManager = new ProgressBarManager(this, 80, 10, 490, 20, 53)

        this.initSounds();
        this.initInputs();
        this.loadProgressBar();

        this.createSystems();
        this.createPlayer();
        this.line = new Line(this, this.player.position.x, this.player.position.y, 150);
        this.entityDeployer.deployFireplace()

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'border');

        this.levelProgressionSystem.createSoldier();
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.levelProgressionSystem.mainTimer.paused = !this.levelProgressionSystem.mainTimer.paused
        this.physics.world.timeScale = this.isPaused ? 0 : 1;
    }

    createPlayer() {
        this.entityDeployer.deployTheKingLvl2();
    }


    stopScene() {
        this.themeSound.stop();
    }

    gameOver() {
        this.isPaused = true
        this.themeSound.stop();
        this.gameOverSound.play();
        this.scene.launch('GameOverScene', { gameOverSound: this.gameOverSound, previousScene: 'Level2Scene' });
    }

    update() {

        this.inputListener();

        // If the game is paused, don't execute further update logic
        if (this.isPaused) {
            return;
        }

        this.counter++

        if (this.counter % 10 == 0) {
            this.soldierManagementSystem.updateCirclePositions()
            this.soldierManagementSystem.updateArchersCirclePositions()
            this.soldierManagementSystem.updateMagesCirclePositions()
        }

        if (this.counter % 5 == 0) {
            this.collisionSystem.update();
        }

        this.monstersList.forEach(monster => {
            this.movementSystem.update(monster, this);
            this.fogOfWar.isHidden(this.firePlace, monster, this.fogOfWar.sightRadius)
            this.overlapSystem.drawWater(monster)
        });
        this.soldierList.forEach(soldier => {
            this.movementSystem.update(soldier, this);
            this.overlapSystem.drawWater(soldier)

        });
        this.archersList.forEach(archer => {
            this.movementSystem.update(archer, this);
            this.overlapSystem.drawWater(archer)
        });
        this.mages.forEach(mage => {
            this.movementSystem.update(mage, this);
            this.overlapSystem.drawWater(mage)
        });

        this.overlapSystem.drawWater(this.player)
        this.movementSystem.update(this.player, this);

        this.arrows.forEach(arrow => {
            this.movementSystem.updateArrow(arrow)
            arrow.outOfBoundsOrDealtDamage();
        })

        this.fireBalls.forEach(fireBall => {
            this.movementSystem.updateArrow(fireBall)
            fireBall.outOfBounds()
        })

        if (this.counter % 5 == 0) {
            this.deathSystem.update(this.monstersList);
            this.deathSystem.update(this.archersList);
            this.deathSystem.update(this.soldierList);
            this.deathSystem.update(this.mages);
        }

        this.draw();
    }

    createSystems() {
        this.targetSystem = []
        this.soldierManagementSystem = new SoldierManagementSystem(this, 150)
        this.collisionSystem = new CollisionSystem(this, 30, 15)
        this.entityDeployer = new EntityDeployer(this);
        this.animationSystem = new AnimationSystem(this);
        this.movementSystem = new MovementSystem(1);
        this.movementSystem = new MovementSystem(1);
        this.deathSystem = new DeathSystem(this);
        this.overlapSystem = new OverlapSystem()
        this.levelProgressionSystem = new LevelProgressionSystem(this);
        this.levelProgressionSystem.level2()
    }

    initInputs() {
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.upgradeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    }

    inputListener() {
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.togglePause()
        }


        if (Phaser.Input.Keyboard.JustDown(this.upgradeKey)) {
            this.upgrade();
        }
    }


    initData() {
        this.nextScene = 'LoreScene2'
        this.isPaused = false;
        this.archerRange = new ArcherRange(this, 50);
        this.arrows = []
        this.fireBalls = []
        this.soldierList = []
        this.monstersList = []
        this.archersList = []
        this.mages = []
        this.counter = 0
        this.gameIsOver = false;
    }

    initSounds() {
        this.clickSound = this.sound.add('clickSound');
        this.clickSound.setVolume(.2);

        this.upgradeSound = this.sound.add('upgradeSound');
        this.upgradeSound.setVolume(.2);

        this.levelUpSound = this.sound.add('levelUpSound');
        this.levelUpSound.setVolume(.2);

        this.themeSound = this.sound.add('swampTheme', { loop: true });
        this.themeSound.setVolume(.1);
        this.themeSound.play();

        this.soldierDeathSound = this.sound.add('death')
        this.soldierDeathSound.setVolume(.4);

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
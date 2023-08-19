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


export default class Level3Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3Scene' });
        this.gameData = new GameDataComponent();
        this.progressBarManager = null; // Add this line
    }

    upgrade() {
        this.scene.launch('UpgradeScene', { gameData: this.gameData, fogOfWar: this.fogOfWar, scene: this }, this.soldierManagementSystem);
        this.togglePause(); // Pause the game
    }

    init() {
        this.initData();
        this.flag1 = this.add.sprite(50, 50, 'background');
        this.flag2 = this.add.sprite(50, 100, 'background');
        this.flag3 = this.add.sprite(50, 150, 'background');
        this.flag4 = this.add.sprite(50, 200, 'background');
        this.flag5 = this.add.sprite(50, 250, 'background');
        this.flag6 = this.add.sprite(50, 300, 'background');
        this.flag7 = this.add.sprite(50, 350, 'background');
        this.flag8 = this.add.sprite(50, 400, 'background');

        this.flag9 = this.add.sprite(this.cameras.main.width - 50, 50, 'background');
        this.flag10 = this.add.sprite(this.cameras.main.width - 50, 100, 'background');
        this.flag11 = this.add.sprite(this.cameras.main.width - 50, 150, 'background');
        this.flag12 = this.add.sprite(this.cameras.main.width - 50, 200, 'background');
        this.flag13 = this.add.sprite(this.cameras.main.width - 50, 250, 'background');
        this.flag14 = this.add.sprite(this.cameras.main.width - 50, 300, 'background');
        this.flag15 = this.add.sprite(this.cameras.main.width - 50, 350, 'background');
        this.flag16 = this.add.sprite(this.cameras.main.width - 50, 400, 'background');

        this.pentagram = this.add.sprite(80, 80, 'background');
        this.pentagram2 = this.add.sprite(80, 370, 'background');
        this.pentagram3 = this.add.sprite(this.cameras.main.width - 80, 80, 'background');
        this.pentagram4 = this.add.sprite(this.cameras.main.width - 80, 370, 'background');


        this.something = this.add.sprite(this.cameras.main.width - 80, 130, 'background');
        this.something2 = this.add.sprite(this.cameras.main.width - 80, 320, 'background');
        this.something3 = this.add.sprite( 80, 130, 'background');
        this.something4 = this.add.sprite( 80, 320, 'background');


        this.anims.create({
            key: 'flag',
            frames: this.anims.generateFrameNumbers('background', { start: 32, end: 35 }),
            frameRate: 7,
            repeat: -1 // Loop the animation
        });

        this.anims.create({
            key: 'pentagram',
            frames: this.anims.generateFrameNumbers('background', { start: 36, end: 39 }),
            frameRate: 2,
            repeat: -1 // Loop the animation
        });

        this.anims.create({
            key: 'something',
            frames: this.anims.generateFrameNumbers('background', { start: 24, end: 27 }),
            frameRate: 2,
            repeat: -1 // Loop the animation
        });

        this.something.anims.play('something', true)
        this.something2.anims.play('something', true)
        this.something3.anims.play('something', true)
        this.something4.anims.play('something', true)


        this.pentagram.anims.play('pentagram', true)
        this.pentagram2.anims.play('pentagram', true)
        this.pentagram3.anims.play('pentagram', true)
        this.pentagram4.anims.play('pentagram', true)

        this.flag1.anims.play('flag', true);
        this.flag2.anims.play('flag', true);
        this.flag3.anims.play('flag', true);
        this.flag4.anims.play('flag', true);
        this.flag5.anims.play('flag', true);
        this.flag6.anims.play('flag', true);
        this.flag7.anims.play('flag', true);
        this.flag8.anims.play('flag', true);
        this.flag9.anims.play('flag', true);
        this.flag10.anims.play('flag', true);
        this.flag11.anims.play('flag', true);
        this.flag12.anims.play('flag', true);
        this.flag13.anims.play('flag', true);
        this.flag14.anims.play('flag', true);
        this.flag15.anims.play('flag', true);
        this.flag16.anims.play('flag', true);
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
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.levelProgressionSystem.mainTimer.paused = !this.levelProgressionSystem.mainTimer.paused
        this.physics.world.timeScale = this.isPaused ? 0 : 1;
    }

    createPlayer() {
        this.entityDeployer.deployTheKingLvl3();
    }


    stopScene() {
        this.themeSound.stop();
    }

    gameOver() {
        this.isPaused = true
        this.themeSound.stop();
        this.gameOverSound.play();
        this.scene.launch('GameOverScene', { gameOverSound: this.gameOverSound, previousScene: 'Level3Scene' });
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
        this.levelProgressionSystem.level3()
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
        this.nextScene = 'FinalScene'
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

        this.themeSound = this.sound.add('finalTheme', { loop: true });
        this.themeSound.setVolume(.05);
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
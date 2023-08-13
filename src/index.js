
import Line from "./components/Line.js"
import ArcherRange from "./components/ArcherRange.js"
import Target from "./components/Target.js"

import TimerManager from "./systems/TimeManager.js"
import SoldierManagementSystem from "./systems/SoldierManagementSystem.js"
import MovementSystem from "./systems/MovementSystem.js"
import AnimationSystem from "./systems/AnimationSystem.js"
import EntityDeployer from "./systems/EntityDeployer.js"
import CollisionSystem from "./systems/CollisionSystem.js"
import DeathSystem from "./systems/DeathSystem.js"
import PositionComponent from "./components/PositionComponent.js"
import FogOfWar from "./systems/FogOfWar.js"

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
        // this.targetSystem.push(new Target(this, 5, this.archerRange.getRandomTargetsInRange(3)))

    }

    update() {
        let startTime
        let endTime
        let timeTaken

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

        this.line.drawLine();
        this.draw();
    }

    createMonster() {
        this.entityDeployer.deployMonster()
    }

    createSoldier() {
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
        this.fogOfWar = new FogOfWar(this, this.sys.game.config.width, this.sys.game.config.height, 150)
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

        // this.input.on('pointermove', (pointer) => {
        //     if (this.archerRange != null) {
        //         this.archerRange.draw(pointer.x, pointer.y);
        //     }
        // });
    }

    initData() {
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

        this.archerFireTimer = new TimerManager(this, 300, this.archerFire);
        this.archerFireTimer.start();
    }

    initSounds() {
        this.themeSound = this.sound.add('themeSound');
        this.themeSound.setVolume(.1);
        this.themeSound.play();

        this.soldierDeathSound = this.sound.add('death')
        this.soldierDeathSound.setVolume(.5);

        this.monsterDeathSound = this.sound.add('monsterDeath')
        this.monsterDeathSound.setVolume(1);
    }

    draw() {
        this.targetSystem.forEach(target => target.draw())
        this.fogOfWar.drawFog([this.firePlace])
    }

    archerFire() {

    }

    preload() {
        this.load.spritesheet('monster_sprites', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('background', 'assets/sprites/backgroundSpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bigMonster', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('goodGuys', 'assets/sprites/goodGuysSprites.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('skeleton', 'assets/sprites/skeleton.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player', 'assets/sprites/slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audio('themeSound', 'assets/music/mistOfMiseryV2.mp3');
        this.load.audio('death', 'assets/sfx/death2.mp3');
        this.load.audio('monsterDeath', 'assets/sfx/death.wav');
    }
}



var config = {
    type: Phaser.AUTO,
    width: 512,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: MainScene,
    backgroundColor: '#000'
};

var game = new Phaser.Game(config);

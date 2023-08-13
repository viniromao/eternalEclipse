import Entity from "./components/Entity.js"
import Line from "./components/Line.js"
import SpriteAnimationComponent from "./components/SpriteAnimationComponent.js"
import PositionComponent from "./components/PositionComponent.js"
import VelocityComponent from "./components/VelocityComponent.js"
import Soldier from "./components/Soldier.js"

import TimerManager from "./systems/TimeManager.js"
import SoldierManagementSystem from "./systems/SoldierManagementSystem.js"
import MovementSystem from "./systems/MovementSystem.js"
import AnimationSystem from "./systems/AnimationSystem.js"
import EntityDeployer from "./systems/EntityDeployer.js"
import CollisionSystem from "./systems/CollisionSystem.js"

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.spritesheet('monster_sprites', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bigMonster', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('goodGuys', 'assets/sprites/goodGuysSprites.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('skeleton', 'assets/sprites/skeleton.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player', 'assets/sprites/slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audio('themeSound', 'assets/music/mistOfMiseryV2.mp3');
    }

    create() {

        this.themeSound = this.sound.add('themeSound');
        this.themeSound.setVolume(.1)
        this.themeSound.play();

        this.soldierManagementSystem = new SoldierManagementSystem(this, 100)
        this.collisionSystem = new CollisionSystem(this, 30, 15)
        this.entityDeployer = new EntityDeployer(this);
        this.animationSystem = new AnimationSystem(this);
        this.movementSystem = new MovementSystem(1);

        this.monsterDeployTimer = new TimerManager(this, 1000, this.createMonster);
        this.monsterDeployTimer.start();

        this.soldierDeployTimer = new TimerManager(this, 300, this.createSoldier);
        this.soldierDeployTimer.start();


        const sprite = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'player');
        const position = new PositionComponent(this.sys.game.config.width / 2, this.sys.game.config.height - 25);
        const velocity = new VelocityComponent(0, 0);
        const finalPosition = position;

        this.player = new Entity(sprite, position, velocity, null, finalPosition)

        this.line = new Line(this, this.player.position.x, this.player.position.y, 150);

        this.soldierList = []
        this.monstersList = []

        this.input.on('pointerdown', (pointer) => {
            this.entityDeployer.deploySoldier(this.soldierManagementSystem);
        });

        this.counter = 0
    }

    update() {
        this.counter++
        if (this.counter % 10 == 0)
            this.soldierManagementSystem.updateSemiCirclePositions(this.line)

        this.collisionSystem.update();

        this.monstersList.forEach(monster => {
            this.movementSystem.update(monster, this);
        });

        this.soldierList.forEach(soldier => {
            this.movementSystem.update(soldier, this);
        });

        this.movementSystem.update(this.player, this);

        this.line.drawLine();
    }

    createMonster() {
        this.entityDeployer.deployMonster()
    }

    createSoldier() {

        if (this.soldierList.length < 8)
            this.entityDeployer.deploySoldier(this.soldierManagementSystem)
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

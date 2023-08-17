
import Line from "./components/Line.js"
import ArcherRange from "./components/ArcherRange.js"

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
import Level2Scene from "./scenes/Level2Scene.js"
import VictoryScene from "./scenes/VictoryScene.js"
import LoreScene from "./scenes/LoreScene.js"


class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    init() {
        this.initData();

    }

    create() {
        this.initSounds();
        this.initInputs();
        this.loadProgressBar();


        this.createSystems();
        this.createPlayer();
        this.line = new Line(this, this.player.position.x, this.player.position.y, 150);
        this.entityDeployer.deployFireplace()


    }

    togglePause() {
        this.isPaused = !this.isPaused;
    }

    createPlayer() {
        this.entityDeployer.deployTheKing();
    }


    stopScene() {
        this.themeSound.stop();
        this.themeSound2.stop();
    }

    gameOver() {
        this.grassBackground.destroySprites()
        this.togglePause();
        this.themeSound.stop();
        this.themeSound2.stop();
        this.gameOverSound.play();
        this.scene.launch('GameOverScene', { gameOverSound: this.gameOverSound, previousScene: 'MainScene' });
    }

    update() {

        this.inputListener()

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

    createSystems() {
        this.targetSystem = []
        this.fogOfWar = new FogOfWar(this, this.sys.game.config.width, this.sys.game.config.height, 200)
        this.soldierManagementSystem = new SoldierManagementSystem(this, 150)
        this.collisionSystem = new CollisionSystem(this, 30, 15)
        this.entityDeployer = new EntityDeployer(this);
        this.animationSystem = new AnimationSystem(this);
        this.movementSystem = new MovementSystem(1);
        this.deathSystem = new DeathSystem(this);
        this.levelProgressionSystem = new LevelProgressionSystem(this);
        this.levelProgressionSystem.level1()
    }

    initInputs() {
        this.input.on('pointerdown', () => {
            this.entityDeployer.deploySoldier(this.soldierManagementSystem);
        });

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.gameOverKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        // this.input.on('pointermove', (pointer) => {
        //     if (this.archerRange != null) {
        //         this.archerRange.draw(pointer.x, pointer.y);
        //     }
        // });
    }

    inputListener() {
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
        this.archerRange = new ArcherRange(this, 50);
        this.soldierList = []
        this.monstersList = []
        this.archersList = []
        this.counter = 0
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
    }, scene: [LoadingScene, StartScene, MainScene, Level2Scene, VictoryScene, LoreScene, GameOverScene],
    backgroundColor: '#000'
};

var game = new Phaser.Game(config);
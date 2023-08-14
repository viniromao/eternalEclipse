
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

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        this.load.spritesheet('start_button', 'assets/ui/start_button.png', { frameWidth: 182, frameHeight: 60 });
    }

    create() {
        // Add a black background
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000).setOrigin(0, 0);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 120, centerY - 150, 'Game Over', { fontFamily: 'custom', fontSize: '70px' });

        const restartButton = this.add.sprite(centerX, centerY + 60, 'start_button', 0);
        restartButton.setInteractive();

        restartButton.on('pointerover', () => {
            restartButton.setFrame(2);
        });

        restartButton.on('pointerout', () => {
            restartButton.setFrame(0);
        });

        restartButton.on('pointerup', this.restartGame, this);
    }

    restartGame() {
        this.scene.start('MainScene');
    }
}
class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.spritesheet('start_button', 'assets/ui/start_button.png', { frameWidth: 182, frameHeight: 60 });
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX - 150, centerY - 150, 'Game Title', { fontFamily: 'custom', fontSize: '70px', });

        const startButton = this.add.sprite(centerX, centerY + 60, 'start_button', 0);
        startButton.setInteractive();

        startButton.on('pointerover', () => {
            startButton.setFrame(2);
        });

        startButton.on('pointerout', () => {
            startButton.setFrame(0);
        });

        startButton.on('pointerup', this.startGame, this);
    }

    startGame() {
        this.scene.start('MainScene');
    }
}

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

        this.gameOverKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
    }



    gameOver() {
        this.togglePause();
        this.scene.launch('GameOverScene');
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.togglePause();
        }

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

        //if condition to gameOver
        if (Phaser.Input.Keyboard.JustDown(this.gameOverKey)) {
            this.gameOver();
        }

        this.draw();
    }

    createMonster() {
        if (this.isPaused) {
            return;
        }
        this.entityDeployer.deployMonster()
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
        this.fogOfWar = new FogOfWar(this, this.sys.game.config.width, this.sys.game.config.height, 200)
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

        // this.input.on('pointermove', (pointer) => {
        //     if (this.archerRange != null) {
        //         this.archerRange.draw(pointer.x, pointer.y);
        //     }
        // });
    }

    initData() {
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
        this.themeSound.play();

        this.soldierDeathSound = this.sound.add('death')
        this.soldierDeathSound.setVolume(.6);

        this.monsterDeathSound = this.sound.add('monsterDeath')
        this.monsterDeathSound.setVolume(.1);
    }

    draw() {
        // this.targetSystem.forEach(target => target.draw())
        this.fogOfWar.drawFog([this.firePlace])
        this.line.drawLine();
    }

    archerFire() {

    }

    preload() {
        this.load.spritesheet('progress_bar', 'assets/ui/progress_bar.png', { frameWidth: 32, frameHeight: 1000 });
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
    loadProgressBar() {
        this.progressBar = this.add.image(this.sys.game.config.width / 2, 20, 'progress_bar');
        this.progressBar.setScale(1);
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
    scene: [StartScene, MainScene, GameOverScene],
    backgroundColor: '#000'
};

var game = new Phaser.Game(config);

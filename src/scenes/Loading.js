export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        this.load.spritesheet('progress_bar', 'assets/ui/progress_bar.png', { frameWidth: 32, frameHeight: 1000 });
        this.load.spritesheet('monster_sprites', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('background', 'assets/sprites/backgroundSpriteSheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bigMonster', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('goodGuys', 'assets/sprites/goodGuysSprites.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('skeleton', 'assets/sprites/skeleton.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('player', 'assets/sprites/slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audio('startSound', 'assets/music/startScreen.mp3');
        this.load.audio('themeSound', 'assets/music/mistOfMiseryV2.mp3');
        this.load.audio('themeSound2', 'assets/music/mistOfMiseryV4.mp3');
        this.load.audio('gameOver', 'assets/music/gameOverTheme.mp3');
        this.load.audio('death', 'assets/sfx/death2.mp3');
        this.load.audio('monsterDeath', 'assets/sfx/death.wav');
        this.load.audio('attackHuman', 'assets/sfx/attackHuman.mp3');
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        // Display "Loading..." text
        this.add.text(centerX -110, centerY -50, 'Loading...', { fontFamily: 'custom', fontSize: '50px', });

    }

    update() {
        console.log('LoadingScene update:', this.load.isComplete);

        if (this.load.isComplete) {
            console.log('Transitioning to MainScene');
            this.scene.start('MainScene');
        }
    }
}

// ... rest of the code ...

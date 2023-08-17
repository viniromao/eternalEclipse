export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    init() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        let dots = 0;
        const baseText = 'Loading';
        const loadingText = this.add.text(centerX - 100, centerY - 50, baseText, { fontFamily: 'custom', fontSize: '50px' });

        this.time.addEvent({
            delay: 50,
            callback: () => {
                dots = (dots + 1) % 4;
                const text = baseText + '.'.repeat(dots);
                loadingText.setText(text);
            },
            callbackScope: this,
            loop: true
        });
    }

    preload() {
        this.load.spritesheet('progress_bar', 'assets/ui/progress_bar.png', { frameWidth: 32, frameHeight: 1000 });
        this.load.spritesheet('monster_sprites', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('background', 'assets/sprites/backgroundSpriteSheet.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('bigMonster', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('goodGuys', 'assets/sprites/goodGuysSprites.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('button', 'assets/ui/start_button.png', { frameWidth: 182, frameHeight: 60 });
        this.load.audio('typewriter', 'assets/sfx/typewriter.mp3');
        this.load.audio('victorySong', 'assets/music/victory.mp3');
        this.load.audio('startSound', 'assets/music/startScreen.mp3');
        this.load.audio('themeSound', 'assets/music/mistOfMiseryV2.mp3');
        this.load.audio('themeSound2', 'assets/music/mistOfMiseryV4.mp3');
        this.load.audio('titleScreenSound', 'assets/music/titleScreen.mp3');
        this.load.audio('gameOver', 'assets/music/gameOverTheme.mp3');
        this.load.audio('death', 'assets/sfx/death2.mp3');
        this.load.audio('monsterDeath', 'assets/sfx/death.wav');
        this.load.audio('attackHuman', 'assets/sfx/attackHuman.mp3');
        this.load.spritesheet('button', 'assets/ui/start_button.png', { frameWidth: 192, frameHeight: 96 });
    }

    update() {
        this.scene.start('StartScene');
    }
}
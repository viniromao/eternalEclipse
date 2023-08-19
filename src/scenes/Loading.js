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
        this.load.spritesheet('border', 'assets/ui/border.png', { frameWidth: 660, frameHeight: 458 });
        this.load.spritesheet('progress_bar', 'assets/ui/progress_bar.png', { frameWidth: 32, frameHeight: 1000 });
        this.load.spritesheet('monster_sprites', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('background', 'assets/sprites/backgroundSpriteSheet.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('bigMonster', 'assets/sprites/monstersSpriteSheet.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('arrow', 'assets/sprites/arrow.png', { frameWidth: 36, frameHeight: 37 });
        this.load.spritesheet('hit', 'assets/sprites/hit.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('drowned', 'assets/sprites/underwater.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('goodGuys', 'assets/sprites/goodGuysSprites.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('lore', 'assets/sprites/lore.png', { frameWidth: 320, frameHeight: 226 });
        this.load.spritesheet('button', 'assets/ui/start_button.png', { frameWidth: 192, frameHeight: 96 });
        this.load.audio('typewriter', 'assets/sfx/typewriter.mp3');
        this.load.audio('victorySong', 'assets/music/victory.mp3');
        this.load.audio('finalSong', 'assets/music/finalSong.mp3');
        this.load.audio('finalTheme', 'assets/music/finalTheme.mp3');
        this.load.audio('swampTheme', 'assets/music/swampTheme.mp3');
        this.load.audio('startSound', 'assets/music/startScreen.mp3');
        this.load.audio('themeSound', 'assets/music/mistOfMiseryV2.mp3');
        this.load.audio('themeSound2', 'assets/music/mistOfMiseryV4.mp3');
        this.load.audio('titleScreenSound', 'assets/music/titleScreen.mp3');
        this.load.audio('gameOver', 'assets/music/gameOverTheme.mp3');
        this.load.audio('death', 'assets/sfx/death2.mp3');
        this.load.audio('monsterDeath', 'assets/sfx/death.wav');
        this.load.audio('attackHuman', 'assets/sfx/attackHuman.mp3');
        this.load.audio('levelUpSound', 'assets/sfx/levelup.mp3');
        this.load.audio('upgradeSound', 'assets/sfx/upgrade.mp3');
        this.load.audio('clickSound', 'assets/sfx/click.mp3');

        this.load.spritesheet('button', 'assets/ui/start_button.png', { frameWidth: 192, frameHeight: 96 });
        this.load.spritesheet('upgradeIcons', 'assets/ui/upgrades_sheet.png', { frameWidth: 36, frameHeight: 36 });

        // console.log('%c   Join our Game Development Team!   ', 'background: #222; color: #bada55; font-size: 20px;');
        // console.log('%c        We are looking for passionate developers like you!', 'font-style: italic; font-size: 14px;');
        // console.log('%c        ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄', 'color: #33cc33');
        // console.log('%c        █░░░█░░░█░░░█░░░█░░░█', 'color: #33cc33');
        // console.log('%c        ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀', 'color: #33cc33');
        // console.log('%cVisit our website: %chttps://www.example.com', 'color: #555', 'color: blue; text-decoration: underline;');
    }

    update() {
        this.scene.start('StartScene');
    }
}
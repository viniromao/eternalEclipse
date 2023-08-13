export default class AnimationSystem {
    constructor(scene) {
        this.scene = scene;
    }

    addMonsterAnimation(entity) {
        if (entity.spriteAnimation) {
            this.scene.anims.create({
                key: entity.spriteAnimation.key,
                frames: this.scene.anims.generateFrameNumbers('monster_sprites', entity.spriteAnimation.frameConfig),
                frameRate: 5,
                repeat: -1,
            });
            entity.sprite.anims.play(entity.spriteAnimation.key);
        }
    }

    addGoodGuyAnimation(entity) {
        if (entity.spriteAnimation) {
            this.scene.anims.create({
                key: entity.spriteAnimation.key,
                frames: this.scene.anims.generateFrameNumbers('goodGuys', entity.spriteAnimation.frameConfig),
                frameRate: 5,
                repeat: -1,
            });
            entity.sprite.anims.play(entity.spriteAnimation.key);
        }
    }

    addSoldierAnimation(entity) {
        if (entity.spriteAnimation) {
            this.scene.anims.create({
                key: 'skeleton',
                frames: this.scene.anims.generateFrameNumbers('skeleton', { start: 0, end: 2 }),
                frameRate: 5,
                repeat: -1,
            });
            entity.sprite.anims.play('skeleton');
        }
    }
}
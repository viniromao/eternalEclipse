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

    addHiddenMonsterAnimation(entity) {
        if (entity.spriteAnimation) {
            const hiddenFrameConfig = {start: entity.spriteAnimation.frameConfig.start + 4, end: entity.spriteAnimation.frameConfig.end + 4}
            this.scene.anims.create({
                key: entity.spriteAnimation.key + '-hidden',
                frames: this.scene.anims.generateFrameNumbers('monster_sprites', hiddenFrameConfig),
                frameRate: 5,
                repeat: -1,
            });
            entity.sprite.anims.play(entity.spriteAnimation.key +  '-hidden');
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

    addBackGroundAnimation(entity) {
        if (entity.spriteAnimation) {
            this.scene.anims.create({
                key: entity.spriteAnimation.key,
                frames: this.scene.anims.generateFrameNumbers('background', entity.spriteAnimation.frameConfig),
                frameRate: 2,
                repeat: -1,
            });
            entity.sprite.anims.play(entity.spriteAnimation.key);
        }
    }

    addGoodGuyCustomAnimation(entity, customAnimation, callback, frameRate) {
        this.scene.anims.create({
            key: customAnimation.key,
            frames: this.scene.anims.generateFrameNumbers('goodGuys', customAnimation.frameConfig),
            frameRate: frameRate,
            repeat: 0,
        });

        entity.sprite.anims.play(customAnimation.key);

        entity.sprite.on('animationcomplete', () => {
            entity.sprite.anims.play(entity.spriteAnimation.key);

            if (callback)
                callback();


        }, this.scene);
    }


}
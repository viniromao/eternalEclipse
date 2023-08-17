import Soldier from "../components/Soldier.js"
import Monster from "../components/Monster.js"

export default class DeathSystem {
    constructor(scene) {
        this.scene = scene;
    }

    update(entities) {
        if (entities == null)
            return

        entities.forEach(entity => {
            if (entity.markedForDestruction) {
                entity.markedForDestruction = false;
                entity.dying = true;
                this.playDeathSounds(entity);

                if (entity instanceof Monster) {
                    this.scene.progressBarManager.gainXP(entity.xp);
                }
                
                this.animateDeath(entity, () => {
                    entity.destroy();
                    const index = entities.indexOf(entity);
                    if (index !== -1) {
                        entities.splice(index, 1);
                    }
                });
            }
        });
    }

    animateDeath(entity, callback) {
        if (entity.deathAnimation != null) {
            this.scene.animationSystem.addGoodGuyCustomAnimation(entity, entity.deathAnimation, () => {callback()}, 3)
        } else {
            callback()
        }
    }

    playDeathSounds(entity) {
        if(entity instanceof Soldier) {
            this.scene.soldierDeathSound.play();
        } else {
            // this.scene.monsterDeathSound.play();
        }
    }
}
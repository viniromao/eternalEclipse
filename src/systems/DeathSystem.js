import Soldier from "../components/Soldier.js"

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

                // Update XP bar when a monster dies
                if (!(entity instanceof Soldier) && entity.stats && entity.stats.monsterType) {
                    const monsterType = entity.monsterType; // Assuming your entity structure has a monsterType property
                    const xpFromMonster = this.scene.gameData[monsterType].xp;
                    this.scene.progressBarManager.gainXP(xpFromMonster);
                }

                this.animateDeath(entity, () => {
                    entity.destroy();
                    // Remove the entity from the entities array if needed
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
import PositionComponent from "../components/PositionComponent.js"
import VelocityComponent from "../components/VelocityComponent.js"
import SpriteAnimationComponent from "../components/SpriteAnimationComponent.js"
import Soldier from "../components/Soldier.js"
import Mage from "../components/Mage.js"
import Entity from "../components/Entity.js"
import Monster from "../components/Monster.js"
import HealthSystem from "../systems/HealthSystem.js"
import FirePlace from "../components/FirePlace.js"


export default class EntityDeployer {
    constructor(scene) {
        this.scene = scene;
    }

    deployMonster(stats) {
        let randomSide = Phaser.Math.Between(1, 3);
        let randomCharacter = (Phaser.Math.Between(1, 10) * 8) - 8;

        let randomX = Phaser.Math.Between(0, this.scene.game.config.width);
        let randomY = Phaser.Math.Between(0, this.scene.game.config.height - 50);

        switch (randomSide) {
            case 1:
                randomX = 0
                break;
            case 2:
                randomY = 70
                break;
            case 3:
                randomX = this.scene.game.config.width
                break;

            default:
                randomX = 0
                randomY = 0
        }

        randomCharacter = stats.monsterType ? stats.monsterType * 8 - 8 : randomCharacter

        const sprite = this.scene.add.sprite(randomX, randomY, 'monster_sprites');
        const position = new PositionComponent(randomX, randomY);
        const velocity = new VelocityComponent(0, 0);
        const spriteAnimation = new SpriteAnimationComponent(`${randomCharacter}`, { start: randomCharacter, end: randomCharacter + 3 });
        const healthSystem = new HealthSystem(this.scene, position, stats.health ? stats.health : 3)
        const drownedSprite = this.scene.add.sprite(100, 100, 'drowned');
        const drownedAnimation = new SpriteAnimationComponent('drowned', { start: 0, end: 3 });
        const entity = new Monster(sprite, position, velocity, spriteAnimation, null, null, this.scene.player.position, healthSystem, stats.damage ? stats.damage : 1, true, stats.xp ? stats.xp : 1, true, drownedSprite, drownedAnimation)

        this.scene.animationSystem.addHiddenMonsterAnimation(entity);
        this.scene.animationSystem.addDrownedAnimation(drownedSprite, drownedAnimation, 2);

        this.scene.monstersList.push(entity)

        return entity;
    }

    deploySoldier(stats) {
        let randomCharacter = (Phaser.Math.Between(1, 2) * 2) - 2;

        const sprite = this.scene.add.sprite(0, 0, 'soldier');
        const position = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const finalPosition = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const velocity = new VelocityComponent(0, 0);
        const spriteAnimation = new SpriteAnimationComponent('soldier', { start: 12, end: 15 });
        const deathAnimation = new SpriteAnimationComponent('soldierDeath', { start: 20, end: 23 });
        const attackAnimation = new SpriteAnimationComponent('soldierAttack', { start: 16, end: 19 });
        const drownedSprite = this.scene.add.sprite(100, 100, 'drowned');
        const drownedAnimation = new SpriteAnimationComponent('drowned', { start: 0, end: 3 });
        const health = new HealthSystem(this.scene, position, stats.health ? stats.health : 10);
        const entity = new Soldier(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, 0, health, stats.damage ? stats.damage : 1, false, drownedSprite, drownedAnimation)

        this.scene.animationSystem.addGoodGuyAnimation(entity);
        this.scene.animationSystem.addDrownedAnimation(drownedSprite, drownedAnimation, 2);

        const positionToInsert = Math.floor(Math.random() * (this.scene.soldierList.length + 1));

        this.scene.soldierList.splice(positionToInsert, 0, entity);

        this.scene.soldierManagementSystem.updateSemiCirclePositions();

        return entity;
    }

    deployArcher(stats) {

        const sprite = this.scene.add.sprite(100, 100, 'archer');
        const position = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const finalPosition = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const velocity = new VelocityComponent(0, 0);
        const spriteAnimation = new SpriteAnimationComponent('archer', { start: 28, end: 31 });
        const attackAnimation = new SpriteAnimationComponent('archer-attack', { start: 24, end: 27 });
        const deathAnimation = new SpriteAnimationComponent('archerDeath', { start: 20, end: 23 });
        const drownedSprite = this.scene.add.sprite(100, 100, 'drowned');
        const drownedAnimation = new SpriteAnimationComponent('drowned', { start: 0, end: 3 });
        const health = new HealthSystem(this.scene, position, stats.health ? stats.health : 3)

        const entity = new Soldier(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, 0, health, stats.damage ? stats.damage : 2, false, drownedSprite, drownedAnimation)

        this.scene.animationSystem.addGoodGuyAnimation(entity);
        this.scene.animationSystem.addDrownedAnimation(drownedSprite, drownedAnimation, 2);

        // Add the new soldier to the list and then update all positions
        let positionToInsert = Math.floor(Math.random() * (this.scene.archersList.length + 1));

        this.scene.archersList.splice(positionToInsert, 0, entity);

        this.scene.soldierManagementSystem.updateArchersSemiCirclePositions();

        return entity;
    }

    deployMage(stats) {

        const sprite = this.scene.add.sprite(100, 100, 'mage');
        const position = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const finalPosition = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y);
        const velocity = new VelocityComponent(0, 0);
        const spriteAnimation = new SpriteAnimationComponent('mage', { start: 36, end: 39 });
        const attackAnimation = new SpriteAnimationComponent('mage-attack', { start: 40, end: 43 });
        const deathAnimation = new SpriteAnimationComponent('mage-death', { start: 20, end: 23 });
        const drownedSprite = this.scene.add.sprite(100, 100, 'drowned');
        const drownedAnimation = new SpriteAnimationComponent('drowned', { start: 0, end: 3 });
        const health = new HealthSystem(this.scene, position, stats.health ? stats.health : 3)
        const entity = new Mage(sprite, position, velocity, spriteAnimation, deathAnimation, attackAnimation, finalPosition, 0, health, stats.damage ? stats.damage : 1, false, drownedSprite, drownedAnimation)

        this.scene.animationSystem.addGoodGuyAnimation(entity);
        this.scene.animationSystem.addDrownedAnimation(drownedSprite, drownedAnimation, 2);

        let positionToInsert = Math.floor(Math.random() * (this.scene.mages.length + 1));

        this.scene.mages.splice(positionToInsert, 0, entity);

        this.scene.soldierManagementSystem.updateMagesSemiCirclePositions();

        return entity;
    }


    deployTheKing() {
        const sprite = this.scene.add.sprite(this.scene.sys.game.config.width / 2, this.scene.sys.game.config.height / 2, 'king');
        const position = new PositionComponent(this.scene.sys.game.config.width / 2, this.scene.sys.game.config.height - 25);
        const velocity = new VelocityComponent(0, 0);
        const health = new HealthSystem(this.scene, position, 15)
        const finalPosition = position;
        const spriteAnimation = new SpriteAnimationComponent('king', { start: 4, end: 7 });
        const attackAnimation = new SpriteAnimationComponent('king-order', { start: 0, end: 4 });
        const drownedSprite = this.scene.add.sprite(100, 100, 'drowned');
        const drownedAnimation = new SpriteAnimationComponent('drowned', { start: 0, end: 3 });
        this.scene.player = new Entity(sprite, position, velocity, spriteAnimation, null, attackAnimation, finalPosition, health, 0, false, drownedSprite, drownedAnimation)

        this.scene.animationSystem.addDrownedAnimation(drownedSprite, drownedAnimation, 2);
        this.scene.animationSystem.addGoodGuyAnimation(this.scene.player);
    }

    deployTheKingLvl2() {
        const sprite = this.scene.add.sprite(this.scene.sys.game.config.width / 2, this.scene.sys.game.config.height / 2, 'king');
        const position = new PositionComponent(this.scene.sys.game.config.width / 2, this.scene.sys.game.config.height / 2 + 50);
        const velocity = new VelocityComponent(0, 0);
        const health = new HealthSystem(this.scene, position, 5)
        const finalPosition = position;
        const spriteAnimation = new SpriteAnimationComponent('king', { start: 4, end: 7 });

        this.scene.player = new Entity(sprite, position, velocity, spriteAnimation, null, null, finalPosition, health, 0)

        this.scene.animationSystem.addGoodGuyAnimation(this.scene.player);
    }

    deployFireplace() {
        const spriteAnimation = new SpriteAnimationComponent('firePlace', { start: 12, end: 15 });
        const position = new PositionComponent(this.scene.player.position.x, this.scene.player.position.y - 45)
        const sprite = this.scene.add.sprite(position.x, position.y, 'firePlace');

        const fireplace = new FirePlace(position, sprite, spriteAnimation)
        this.scene.firePlace = fireplace

        this.scene.animationSystem.addBackGroundAnimation(fireplace);
    }

}
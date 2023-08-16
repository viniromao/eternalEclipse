import EntityStats from "../components/EntityStats.js"

export default class GameDataComponent {
    constructor() {
        this.meleeSoldierStats = new EntityStats(10, 1, null);
        this.archerStats = new EntityStats(3, 2, null);

        this.skeletonStats = new EntityStats(1, 1, 1);
        this.ghostStats = new EntityStats(8, 2, 2);
        this.demonStats = new EntityStats(5, 1, 3);
        this.dragonStats = new EntityStats(25, 5, 5);
        this.batStats = new EntityStats(3, 1, 6);
        this.eyeStats = new EntityStats(15, 3, 7);
        this.monsterHandStats = new EntityStats(10, 3, 8);
        this.wormStats = new EntityStats(3, 1, 9);
        this.scorpionStats = new EntityStats(2, 1, 10);
    }

}
import EntityStats from "../components/EntityStats.js"
export default class GameDataComponent {
    constructor() {


        this.sightRadius = 200;

        this.meleeSoldierStats = new EntityStats(10, 1, 0, 0);
        this.archerStats = new EntityStats(3, 2, 0, 0);
        this.mageStats =  new EntityStats(3, 1, 0, 0);

        this.skeletonStats = new EntityStats(1, 1, 1, 1);
        this.ghostStats = new EntityStats(8, 2, 2, 2);
        this.demonStats = new EntityStats(5, 1, 3, 3);
        this.dragonStats = new EntityStats(25, 5, 5, 5);
        this.batStats = new EntityStats(3, 1, 6, 1);
        this.eyeStats = new EntityStats(15, 3, 7, 3);
        this.monsterHandStats = new EntityStats(10, 3, 8, 3);
        this.wormStats = new EntityStats(3, 1, 9, 1);
        this.scorpionStats = new EntityStats(2, 1, 10, 1);
        this.piggyStats = new EntityStats(6, 1, 11, 1);
        this.piggyChariotStats = new EntityStats(10, 2, 12, 3);
        this.dinosaurStats = new EntityStats(12, 3, 13, 3);
        this.mageDinosaurStats = new EntityStats(16, 3, 14, 3);
        this.beeStats = new EntityStats(20, 4, 15, 5);
        this.ratDarkLordStats = new EntityStats(26, 3, 16, 6);
        this.slimeStats = new EntityStats(40, 5, 17, 10);
    }

}
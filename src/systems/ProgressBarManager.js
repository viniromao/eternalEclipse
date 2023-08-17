// ProgressBarManager.js
class ProgressBarManager {
    constructor(scene, x, y, width, height, maxXP) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.currentXP = 0;
        this.maxXP = maxXP;

        // Create a background rectangle for the XP bar
        this.xpBarBg = this.scene.add.graphics();
        this.xpBarBg.fillStyle(0x000000);
        this.xpBarBg.fillRect(this.x, this.y, this.width, this.height);

        // Create a fill rectangle for the XP bar (the part that grows)
        this.xpBarFill = this.scene.add.graphics();
    }

    gainXP(amount) {
        this.currentXP += amount;
        if (this.currentXP > this.maxXP) {
            this.currentXP = this.maxXP;
        }
    
        // Update the width of the fill rectangle based on the gained XP
        const fillWidth = (this.currentXP / this.maxXP) * this.width;
        this.xpBarFill.clear(); // Clear the previous fill
        this.xpBarFill.fillStyle(0xFFFFFF); // Choose a color for the fill
        this.xpBarFill.fillRect(this.x, this.y, fillWidth, this.height);
    }    
}

export default ProgressBarManager;

export default class GreenFilterPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game) {
        super({
            game: game,
            renderer: game.renderer,
            fragShader: `
                precision mediump float;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                void main(void) {
                    vec4 color = texture2D(uMainSampler, outTexCoord);
                    gl_FragColor = vec4(0.0, color.g, 0.0, 1.0);
                }`
        });
    }
}
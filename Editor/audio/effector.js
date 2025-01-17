import { getSprite, getSprites } from "../app.js";
import { getArp } from "./arpeggiator.js";

let effectWetness = 0;
let bitCrusherSprite = undefined;
let sprite = undefined;

//TODO: get the effect name from the scene data and load it here
const crusher = new Tone.BitCrusher(2).toDestination();
crusher.wet.value = 0;

//TODO: get the shader name from the scene data and load it here
const bitCrusherFragmentShader = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float pixelSize; // The size of each pixel block

    void main() {
        // Calculate the block position by snapping the texture coordinates to the nearest "pixelSize"
        vec2 blockCoord = vec2(
            floor(vTextureCoord.x / pixelSize) * pixelSize,
            floor(vTextureCoord.y / pixelSize) * pixelSize
        );

    // Sample the texture color at the block position
    vec4 color = texture2D(uSampler, blockCoord);

    // Output the color for the entire block
    gl_FragColor = color;
}
`;

//TODO: this needs to be generic
let bitCrusherFilter = new PIXI.Filter(null, bitCrusherFragmentShader, {
    pixelSize: .001, // Initial pixel size
});

export function setEffect(id) {
    let arp = getArp(id);   //affect the audio
    sprite = getSprite(id); //affect the visual

    //TODO: provide an option for simple overlap or distance based activation
    if(distance(sprite.x, sprite.y, bitCrusherSprite.x, bitCrusherSprite.y) < 200) { 
        crusher.wet.value = effectWetness;
        arp.synth.connect(crusher);
        sprite.filters = [bitCrusherFilter];
        sprite.effectActive = true;
    }
    else {
        arp.synth.disconnect(crusher);
        sprite.filters = [];
        sprite.effectActive = false;
    }
}

export function startModulator() {
    console.log("Modulator started");
}

export function initEffector(app) {
    //TODO: show a static image or animation for the effect

    // const bitCrusherTexture = PIXI.Texture.from('./images/effects/bitCrusher.png'); 
    // bitCrusherSprite = new PIXI.Sprite(bitCrusherTexture);
    // bitCrusherSprite.scale.set(.25);
    // bitCrusherSprite.anchor.set(0.5);
    // bitCrusherSprite.x = app.screen.width / 2;
    // bitCrusherSprite.y = app.screen.height / 2;
    // bitCrusherSprite.filters = [bitCrusherFilter];
    // app.stage.addChild(bitCrusherSprite);

    // effectSlider.addEventListener('input', (e) => {
    //     effectWetness = parseFloat(e.target.value);
    //     if(sprite) {
    //         if(sprite.effectActive) {
    //             crusher.wet.value = effectWetness; //affect the sound
    //         } else{
    //             crusher.wet.value = 0;
    //         }
    //     }
    //     bitCrusherFilter.uniforms.pixelSize = (effectWetness + .01) / 10; // Animate effect, preventing it from going to zero

    //     wetnessLabel.innerText = `Effect Wetness: ${effectWetness}`;
    // });
}

export function update() {

}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
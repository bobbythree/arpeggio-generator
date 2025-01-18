import { getSprite, getSprites } from "../app.js";
import { getArp } from "./arpeggiator.js";

//TODO: A map (or other data structure) containing the effect and wetness for the target sprites
let effectWetness = 0;
let bitCrusherSprite = undefined;
let sprite = undefined;
let effect = undefined;
let fragmentShader = undefined;

//TODO: this needs to be generic
let effectFilter = new PIXI.Filter(null, fragmentShader, {
    pixelSize: .001, // Initial pixel size
});

//TODO: review...
export function setEffect(spriteId) {
    let arp = getArp(spriteId);   //affect the audio
    sprite = getSprite(spriteId); //affect the visual

    //TODO: provide an option for simple overlap or distance based activation
    if(distance(sprite.x, sprite.y, bitCrusherSprite.x, bitCrusherSprite.y) < 200) { 
        crusher.wet.value = effectWetness;
        arp.synth.connect(crusher);
        sprite.filters = [effectFilter];
        sprite.effectActive = true;
    }
    else {
        arp.synth.disconnect(crusher);
        sprite.filters = [];
        sprite.effectActive = false;
    }
}

export function initEffector(app, effect, shader, position, size) {
    //load the shader from the shader file
    

}

export function updateEffector(delta) {
    console.log("Updating effector");
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
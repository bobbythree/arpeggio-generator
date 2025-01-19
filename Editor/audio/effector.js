import { scenes } from '../data/scenes.js';
import { settings } from '../settings.js';
import { getArp } from '../audio/arpeggiator.js';
import { bloomShader } from '../shaders/bloom.js';
import { glitchShader } from '../shaders/glitch.js';
import { noiseShader } from '../shaders/noise.js';
import { pixelateShader } from '../shaders/pixelate.js';
import { rippleShader } from '../shaders/ripple.js';
import { trailsShader } from '../shaders/trails.js';
import { waveShader } from '../shaders/wave.js';

//#region Effectors
let effectors = [];
const maxEffectDistance = 300; 

export function setEffects(sprite) {
    var effFilters = [];

    //add the effect to the synth and the shader to the sprite
    effectors.forEach(eff => {
        //add the effect to the synth
        var arp = getArp(sprite.id);
        arp.synth.connect(eff.effect).toDestination();
        
        effFilters.push(eff.effectFilter);
    });

    sprite.filters = effFilters;
    console.log(sprite.filters);
}

export function initEffectors(app, transport, sceneName) {
    const effectorDefinitions = scenes[sceneName].effectors;
    effectors.forEach(rect => app.stage.removeChild(rect)); // Clear existing rectangles
    effectors = [];

    //Load the effects, shaders and rectangle
    effectorDefinitions.forEach((effectorDefinition) => {
        const rectangle = new PIXI.Graphics();
        rectangle.beginFill(0x66CCFF);
        rectangle.x = effectorDefinition.position[0];
        rectangle.y = effectorDefinition.position[1];
        rectangle.width = effectorDefinition.size[0];
        rectangle.height = effectorDefinition.size[1];
        rectangle.drawRect(0, 0, effectorDefinition.size[0], effectorDefinition.size[1]);
        rectangle.alpha = settings.debugMode ? 0.5 : 0;

        const effectText = new PIXI.Text(effectorDefinition.effect, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xffffff,
            align: 'center'
        });
        
        // Center the text on the sprite
        effectText.anchor.set(0.5);
        effectText.x = rectangle.width / 2;
        effectText.y = rectangle.height / 2;
            
        rectangle.addChild(effectText);

        app.stage.addChild(rectangle);

        var effect = lookUpEffect(effectorDefinition.effect);

        // Load the shader file and create a PIXI filter
        let shaderFile = lookUpShader(effectorDefinition.shader);
        let effectFilter = new PIXI.Filter(null, shaderFile, {
            uIntensity: 1.0,
            iTime: 0.0
        });

        // Add the effector to the list
        effectors.push({
            effect: effect,
            effectFilter: effectFilter,
            rectangle: rectangle
        });
    });

    //PIXI update loop
    app.ticker.add((delta) => {
        const sprites = app.stage.children.filter(child => child instanceof PIXI.Sprite);
        sprites.forEach(sprite => {
            //scale the intensity of the shader and effect based on the distance the sprite is from the effector center with no effect > maxEffectDistance
            effectors.forEach(eff => {
                var dist = Math.sqrt(Math.pow(sprite.x - eff.rectangle.x, 2) + Math.pow(sprite.y - eff.rectangle.y, 2));
                var intensity = Math.max(0, 1 - (dist / maxEffectDistance));

                //apply to shader
                if (sprite.filters) {
                    sprite.filters.forEach(filter => {
                        filter.uniforms.uIntensity = intensity;
                        filter.uniforms.iTime += delta / 1000;
                    });
                }

                //apply to audio effect - TEST
                var currentArp = getArp(sprite.id);
                if (currentArp) {
                    currentArp.synth.volume.value = intensity * -12; // Example: scale volume based on intensity
                }
            });
        });
    });
}

export function updateEffectorVisibility() {
    effectors.forEach(eff => {
        eff.rectangle.alpha = settings.debugMode ? 0.5 : 0;
    });
}
//#endregion

//#region Utilities
//TODO: Do we need to control the initial parameters
function lookUpEffect(effectName) {
    switch (effectName) {
        
        case "chorus":
            return new Tone.Chorus(4, 2.5, 0.5); 
        case "bitCrusher":
            return new Tone.BitCrusher(4);
        case "reverb":
            return new Tone.Reverb(1.5);
        case "delay":
            return new Tone.FeedbackDelay("8n", 1);
        case "distortion":
            return new Tone.Distortion(0.4);
        case "phaser":
            return new Tone.Phaser(15, 5, 1000);
        case "tremolo":
            return new Tone.Tremolo(9, 0.75);
    }
}

function lookUpShader(effectorName) {
    switch (effectorName) {
        case "bloomShader":
            return bloomShader;
        case "glitchShader":
            return glitchShader;
        case "noiseShader":
            return noiseShader;
        case "pixelateShader":
            return pixelateShader;
        case "rippleShader":
            return rippleShader;
        case "trailsShader":
            return trailsShader;
        case "waveShader":
            return waveShader;
    }
}
//#endregion
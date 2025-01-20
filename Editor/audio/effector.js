import { scenes } from '../data/scenes.js';
import { settings } from '../settings.js';
import { getArp } from '../audio/arpeggiator.js';

//#region Effectors
let effectors = [];
const maxEffectDistance = 200; 

//Setup the effectors based on the scene
export function initEffectors(app, transport, sceneName) {
    const effectorDefinitions = scenes[sceneName].effectors;
    effectors.forEach(rect => app.stage.removeChild(rect)); // Clear existing rectangles
    effectors = []; //reset

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
        let pixiFilter = lookUpFilter(effectorDefinition.shader);
        
        // Add the effector to the list
        effectors.push({
            effect: effect,
            effectFilter: pixiFilter,
            rectangle: rectangle
        });
    });

    // PIXI update loop
    app.ticker.add((delta) => {
        const sprites = app.stage.children.filter(child => child instanceof PIXI.Sprite);
        sprites.forEach(sprite => {
            // Scale the intensity of the shader and effect based on the distance the sprite is from the effector center with no effect > maxEffectDistance
            effectors.forEach(eff => {
                var rectCenterX = eff.rectangle.x + eff.rectangle.width / 2;
                var rectCenterY = eff.rectangle.y + eff.rectangle.height / 2;
                var spriteCenterX = sprite.x;
                var spriteCenterY = sprite.y;
                var dist = Math.sqrt(Math.pow(spriteCenterX - rectCenterX, 2) + Math.pow(spriteCenterY - rectCenterY, 2));
                var intensity = Math.max(0, 1 - (dist / maxEffectDistance));

                // Apply to shader
                if (sprite.filters) {
                    sprite.filters.forEach(filter => {
                        if (filter === eff.effectFilter) {
                            console.log("Updating filter intensity for filter: " + filter.name + " with intensity: " + intensity);
                            filter.uniforms.uIntensity = intensity;
                            filter.uniforms.iTime += delta / 1000;
                        }
                    });
                }

                // Apply to audio effect
                var currentArp = getArp(sprite.id);
                if (currentArp) {
                    console.log(`Adjusting wetness for effect: ${eff.effect.name} with intensity: ${intensity}`);
                    eff.effect.wet.value = intensity; // Adjust the wetness based on intensity
                }
            });
        });
    });
}


//called when a sprite is added to the stage
export function setEffects(sprite) {
    var effFilters = [];

    //add the effect to the synth and the shader to the sprite
    effectors.forEach(eff => {
        //add the effect to the synth
        var arp = getArp(sprite.id);
        arp.synth.connect(eff.effect).toDestination();
        eff.effectFilter.name = eff.effect.name; // Assign a name to the effect for debugging
        effFilters.push(eff.effectFilter);
    });

    //TODO: uncomment to work on shaders again
    sprite.filters = effFilters;
    console.log(sprite.filters);
}

export function updateEffectorVisibility() {
    effectors.forEach(eff => {
        eff.rectangle.alpha = settings.debugMode ? 0.5 : 0;
    });
}
//#endregion



//#region Utilities

//TODO: Do we need to control the initial parameters
let effectMap = new Map();
effectMap.set("chorus", new Tone.Chorus(1000, 200, 1).toDestination().start());
effectMap.set("bitCrusher", new Tone.BitCrusher(4).toDestination());
effectMap.set("reverb", new Tone.Reverb().toDestination());
effectMap.set("delay", new Tone.FeedbackDelay("8n", 1).toDestination());  
effectMap.set("distortion", new Tone.Distortion(1).toDestination());
effectMap.set("phaser", new Tone.Phaser(15, 3, 4000).toDestination());
effectMap.set("vibrato", new Tone.Vibrato(400, 0.75).toDestination());

function lookUpEffect(effectName) {
    return effectMap.get(effectName);
}

let filterMap = new Map();
filterMap.set("bloomShader", new PIXI.filters.BloomFilter());
filterMap.set("glitchShader", new PIXI.filters.GlitchFilter());
filterMap.set("noiseShader", new PIXI.NoiseFilter());
filterMap.set("pixelateShader", new PIXI.filters.PixelateFilter());
filterMap.set("rippleShader", new PIXI.filters.ShockwaveFilter());
filterMap.set("trailsShader", new PIXI.filters.RGBSplitFilter());
filterMap.set("waveShader", new PIXI.filters.TwistFilter());

function lookUpFilter(effectorName) {
    return filterMap.get(effectorName);
}
//#endregion
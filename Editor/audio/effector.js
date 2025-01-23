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
        rectangle.beginFill(0x000000);
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

        // Add the effector to the list
        effectors.push({
            effect: effect,
            //effectFilter: pixiFilter,
            rectangle: rectangle
        });
    
    });
}


//called when a sprite is added to the stage
export function setEffects(sprite) {
    var effFilters = [];
    sprite.filters = [];

    //add the effect to the synth and the shader to the sprite
    effectors.forEach(eff => {
        //add the effect to the synth
        var arp = getArp(sprite.id);
        arp.synth.connect(eff.effect).toDestination();
        
        //check distance to the effector and apply the filter
        var rectCenterX = eff.rectangle.x + eff.rectangle.width / 2;
        var rectCenterY = eff.rectangle.y + eff.rectangle.height / 2;
        var spriteCenterX = sprite.x;
        var spriteCenterY = sprite.y;
        var dist = Math.sqrt(Math.pow(spriteCenterX - rectCenterX, 2) + Math.pow(spriteCenterY - rectCenterY, 2));
        var intensity = Math.max(0, 1 - (dist / maxEffectDistance));

        //Apply the shader effect
        if(dist < maxEffectDistance) {            
            if (sprite.filters) {   
                console.log(sprite.filters);       
                sprite.filters.push(lookUpFilter(eff.effect.name));
            }
        }

        // Apply to audio effect
        if (arp) {
            eff.effect.wet.value = intensity; // Adjust the wetness based on intensity
        }
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
filterMap.set("chorus", new PIXI.filters.BloomFilter());
filterMap.set("bitCrusher", new PIXI.filters.GlitchFilter());
filterMap.set("reverb", new PIXI.NoiseFilter());
filterMap.set("delay", new PIXI.filters.PixelateFilter());
filterMap.set("distortion", new PIXI.filters.ShockwaveFilter());
filterMap.set("phaser", new PIXI.filters.RGBSplitFilter());
filterMap.set("vibrato", new PIXI.filters.TwistFilter());

function lookUpFilter(effectorName) {
    //switch based on effector name
    console.log("Effector name: " + effectorName);
    switch (effectorName.toLowerCase()) {
        case "chorus":
            return new PIXI.filters.BloomFilter();
        case "bitcrusher":
            return new PIXI.filters.GlitchFilter();
        case "reverb":
            return new PIXI.NoiseFilter();
        case "feedbackdelay":
            return new PIXI.filters.PixelateFilter();
        case "distortion":
            return new PIXI.filters.ShockwaveFilter();
        case "phaser":
            return new PIXI.filters.RGBSplitFilter();
        case "vibrato":
            return new PIXI.filters.AsciiFilter();
        default:
            return null;
    }
}
//#endregion
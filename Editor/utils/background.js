import { scenes } from '../data/scenes.js';
import { settings } from '../settings.js';
import { getArp } from '../audio/arpeggiator.js';
import { initEffector, updateEffector } from '../audio/effector.js';
import { bloomShader } from '../shaders/bloom.js';
import { glitchShader } from '../shaders/glitch.js';
import { noiseShader } from '../shaders/noise.js';
import { pixelateShader }   from '../shaders/pixelate.js';
import { rippleShader } from '../shaders/ripple.js';
import { trailsShader } from '../shaders/trails.js';
import { waveShader } from '../shaders/wave.js';

let effectors = [];

export function setBackround(app, transport, sceneName) {
    const scene = scenes[sceneName];
    if (!scene) return;

    // Set the background image
    const background = PIXI.Sprite.from(scene.backgroundImage);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

    initParticles(app, sceneName);
    initEffectors(app, transport, sceneName);
}

//#region Particles
function initParticles(app, sceneName) {
    // Particle Effect
    const particleContainer = new PIXI.ParticleContainer(500, {
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true,
    });
    app.stage.addChild(particleContainer);

    // Particle texture 
    const textPath = scenes[sceneName].particles.texture;
    const particleTexture = PIXI.Texture.from(textPath); 

    // Particle array
    const particles = [];
    for (let i = 0; i < 100; i++) {
        const particle = new PIXI.Sprite(particleTexture);
        particle.anchor.set(0.5);
        particle.tint = scenes[sceneName].particles.color;
        particle.scale.set(Math.random() * 0.5 + 0.5); // Random size
        particle.x = Math.random() * app.screen.width;
        particle.y = Math.random() * app.screen.height;
        particle.vx = (Math.random() - 0.5) * 2; // Random horizontal speed
        particle.vy = (Math.random() - 1) * 2; // Random vertical speed
        particle.alpha = Math.random() * 0.5 + 0.5; // Random transparency
        particleContainer.addChild(particle);
        particles.push(particle);
    }

    // Animate particles
    app.ticker.add((delta) => {
        particles.forEach((particle) => {
            particle.x += particle.vx * delta;
            particle.y += particle.vy * delta;

            // Wrap around screen edges
            if (particle.x < 0) particle.x = app.screen.width;
            if (particle.x > app.screen.width) particle.x = 0;
            if (particle.y < 0) particle.y = app.screen.height;
            if (particle.y > app.screen.height) particle.y = 0;

            // Slowly fade particles in and out
            particle.alpha += Math.sin(app.ticker.lastTime / 1000) * 0.01;
        });
    });
}
//#endregion

//#region Effectors
function initEffectors(app, transport, sceneName) {
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

        //load the shader file
        let shaderFile = lookUpShader(effectorDefinition.shader);
        let effectFilter = new PIXI.Filter(null, shaderFile, {
            pixelSize: .001, // TODO: use a common parameter for all shaders
        });

        effectors.push({rectangle, effect, effectFilter});
    });

    //PIXI update loop
    app.ticker.add((delta) => {
        effectors.forEach(eff => {
            //eff.rectangle.alpha = settings.debugMode ? 0.5 : 0;
            const sprites = app.stage.children.filter(child => child instanceof PIXI.Sprite);
            sprites.forEach(sprite => {
                
                //If the sprite is within the rectangle - TODO: distance based falloff
                if (sprite.x > eff.rectangle.x && sprite.x < eff.rectangle.x + eff.rectangle.width &&
                    sprite.y > eff.rectangle.y && sprite.y < eff.rectangle.y + eff.rectangle.height) {
                    // Apply the effect
                    console.log("Setting effect");
                    eff.rectangle.tint = 0xFF0000;
                    const arp = getArp(sprite.id);
                    arp.synth.connect(eff.effect);
                    sprite.filters = [eff.effectFilter];
                } else {
                    // Remove the effect
                    eff.rectangle.tint = 0xFFFFFF;
                    const arp = getArp(sprite.id);
                    //arp.synth.disconnect(eff.effect);
                    //sprite.filters = [];
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
            return new Tone.FeedbackDelay("8n", 0.5);
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
//import { app } from '../app.js'; // Import the PixiJS app from app.js
//TODO: Turn this into a module, exporting functions and controlled from app.js

//Include PixiJS and Tone.js
//document.body.appendChild(app.view);

// Add a background water sprite 
let modApp = undefined;
const modulators = [];

export function addModulator(id) {
    console.log("Modulator added with id: " + id);
    modulators.push(id);
}

export function startModulator() {
    console.log("Modulator started");
}

export function init(app) {
    const waterTexture = PIXI.Texture.from('./images/water/water.png'); 
const waterSprite = new PIXI.Sprite(waterTexture);
waterSprite.anchor.set(0.5);
waterSprite.x = app.screen.width / 2;
waterSprite.y = app.screen.height / 2;
app.stage.addChild(waterSprite);

// Create a displacement map
const displacementTexture = PIXI.Texture.from('./images/water/waveDisplacement.png'); 
const displacementSprite = new PIXI.Sprite(displacementTexture);
displacementSprite.anchor.set(0.5);
displacementSprite.x = app.screen.width / 2;
displacementSprite.y = app.screen.height / 2;
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
//displacementSprite.scale.set(2, 2);
app.stage.addChild(displacementSprite);

// Create a Displacement Filter
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
waterSprite.filters = [displacementFilter];

//TODO: control this from tone.js draw function to sync to LFO
// Animate the displacement map
let scaleDirectionX = 1;
let scaleDirectionY = 1;

app.ticker.add((delta) => {
    displacementSprite.scale.x += scaleDirectionX * delta;
    displacementSprite.scale.y += scaleDirectionY * delta;

    if (displacementSprite.scale.x >= 10 || displacementSprite.scale.x <= 1) {
        scaleDirectionX *= -1;
    }
    if (displacementSprite.scale.y >= 10 || displacementSprite.scale.y <= 1) {
        scaleDirectionY *= -1;
    }
});

// Tone.js LFO for displacement control
const meter = new Tone.DCMeter();
const lfo = new Tone.LFO({
    frequency: 0.5,
    min: 0,
    max: 100,
});
lfo.connect(meter);
lfo.start();

//TODO: route this effect to a parameter of an arp synth that, controlling the wet value from distance to the center of the LFO

//TODO: control frequency and amplitude of the LFO from interacting with it on screen (rotate and scale)
// UI to control LFO frequency
const frequencySlider = document.createElement('input');
frequencySlider.type = 'range';
frequencySlider.min = '0.1';
frequencySlider.max = '5';
frequencySlider.step = '0.1';
frequencySlider.value = lfo.frequency.value;
document.body.appendChild(frequencySlider);

const frequencyLabel = document.createElement('label');
frequencyLabel.innerText = `LFO Frequency: ${lfo.frequency.value} Hz`;
document.body.appendChild(frequencyLabel);

frequencySlider.addEventListener('input', (e) => {
    const frequency = parseFloat(e.target.value);
    lfo.frequency.value = frequency;
    frequencyLabel.innerText = `LFO Frequency: ${frequency} Hz`;
});

// Particle Effect
const particleContainer = new PIXI.ParticleContainer(500, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true,
});
app.stage.addChild(particleContainer);

//TODO: move this into its own module?
// Particle texture 
const particleTexture = PIXI.Texture.from('./images/particles/particle.png'); 

// Particle array
const particles = [];
for (let i = 0; i < 100; i++) {
    const particle = new PIXI.Sprite(particleTexture);
    particle.anchor.set(0.5);
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
    const currentValue = meter.getValue();
        displacementFilter.scale.set(currentValue, currentValue / 2);
        
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
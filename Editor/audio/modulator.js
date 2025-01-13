import { getArp } from "./arpeggiator.js";

const modulators = [];
const lfo = new Tone.LFO({
    frequency: 0.5,
    min: 0,
    max: 100,
});

export function addModulator(id) {
    console.log("Modulator added with id: " + id);
    modulators.push(id);

    var testArp = getArp(id);
    lfo.connect(testArp.synth.volume);
}

export function startModulator() {
    console.log("Modulator started");
}

export function init(app) {
    const waterTexture = PIXI.Texture.from('./images/water/water.png'); 
    const waterSprite = new PIXI.Sprite(waterTexture);
    waterSprite.scale.set(.5);
    waterSprite.anchor.set(0.5);
    waterSprite.x = app.screen.width / 2;
    waterSprite.y = app.screen.height / 2;
    app.stage.addChild(waterSprite);

    // Create a displacement map
    const displacementTexture = PIXI.Texture.from('./images/water/waveDisplacement.png'); 
    const displacementSprite = new PIXI.Sprite(displacementTexture);
    displacementSprite.scale.set(.5);
    displacementSprite.anchor.set(0.5);
    displacementSprite.x = app.screen.width / 2;
    displacementSprite.y = app.screen.height / 2;
    //displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    app.stage.addChild(displacementSprite);

    // Create a Displacement Filter
    //const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    //waterSprite.filters = [displacementFilter];

    //TODO: control this from tone.js draw function to sync to LFO
    // Animate the displacement map
    let scaleDirectionX = 1;
    let scaleDirectionY = 1;


    app.ticker.add((delta) => {
        
        displacementSprite.scale.x += scaleDirectionX * lfo.frequency.value;
        displacementSprite.scale.y += scaleDirectionY * lfo.frequency.value;

        if (displacementSprite.scale.x >= 10 || displacementSprite.scale.x <= 1) {
            scaleDirectionX *= -1;
        }
        if (displacementSprite.scale.y >= 10 || displacementSprite.scale.y <= 1) {
            scaleDirectionY *= -1;
        }

        displacementSprite.x = app.screen.width / 2;
        displacementSprite.y = app.screen.height / 2;

        console.log(displacementSprite.scale.y);
    });

    // Tone.js LFO for displacement control
    lfo.sync().start();

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
}
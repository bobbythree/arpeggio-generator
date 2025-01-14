import { getArp } from "./arpeggiator.js";

const crusher = new Tone.BitCrusher(2).toDestination();
var arp = undefined;

const vertexShader = `
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat3 projectionMatrix;

    varying vec2 vTextureCoord;

    void main() {
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
    }
`;

const fragmentShader = `
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

let bitCrusherFilter = new PIXI.Filter(null, fragmentShader, {
    pixelSize: .01, // Initial pixel size
});

export function addModulator(id) {
    console.log("Modulator added with id: " + id);
    //effects.push(id);

    arp = getArp(id);
    arp.synth.connect(crusher);
}

export function startModulator() {
    console.log("Modulator started");
}

export function init(app) {
    const bitCrusherTexture = PIXI.Texture.from('./images/effects/bitCrusher.png'); 
    const bitCrusherSprite = new PIXI.Sprite(bitCrusherTexture);
    bitCrusherSprite.scale.set(.5);
    bitCrusherSprite.anchor.set(0.5);
    bitCrusherSprite.x = app.screen.width / 2;
    bitCrusherSprite.y = app.screen.height / 2;
    bitCrusherSprite.filters = [bitCrusherFilter];
    app.stage.addChild(bitCrusherSprite);

    app.ticker.add((delta) => {
        
    });

    // TEST UI - NO SLIDERS!!
    const effectSlider = document.createElement('input');
    effectSlider.type = 'range';
    effectSlider.min = '0';
    effectSlider.max = '1';
    effectSlider.step = '0.01';
    effectSlider.value = '0';
    document.body.appendChild(effectSlider);

    const wetnessLabel = document.createElement('label');
    wetnessLabel.innerText = `Effect Wetness: ${effectSlider.value}`;
    document.body.appendChild(wetnessLabel);

    effectSlider.addEventListener('input', (e) => {
        const wetness = parseFloat(e.target.value);
        crusher.wet.value = wetness; //affect the sound
        bitCrusherFilter.uniforms.pixelSize = (wetness + .01) / 10; // Animate effect, preventing it from going to zero

        wetnessLabel.innerText = `Effect Wetness: ${wetness}`;
    });
}
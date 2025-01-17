// Wave Fragment Shader for PIXI.js

precision mediump float;

// Input texture (rendered scene)
uniform sampler2D uSampler;
// Texture coordinates
varying vec2 vTextureCoord;

// Uniforms for controlling wave effect
uniform float uTime;          // Time uniform for animation
uniform float uWaveFrequency; // Frequency of the waves
uniform float uWaveAmplitude; // Amplitude of the waves

void main() {
    vec2 uv = vTextureCoord;

    // Calculate wave offset along the y-axis based on sine wave
    float wave = sin(uv.x * uWaveFrequency + uTime) * uWaveAmplitude;

    // Apply wave effect to the texture coordinates
    vec2 waveUV = vec2(uv.x, uv.y + wave);

    // Fetch the base scene color with modified UVs
    vec4 sceneColor = texture2D(uSampler, waveUV);

    // Output the final color
    gl_FragColor = sceneColor;
}

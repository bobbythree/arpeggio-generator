// Bloom Fragment Shader for PIXI.js

precision mediump float;

// Input texture (rendered scene)
uniform sampler2D uSampler;
// Texture coordinates
varying vec2 vTextureCoord;

// Uniforms for controlling bloom
uniform float uBloomIntensity; // Scalar to control bloom intensity
uniform float uThreshold;      // Brightness threshold for bloom

// Helper function to extract brightness
float brightness(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114)); // Standard luminance formula
}

void main() {
    // Fetch the scene color
    vec4 sceneColor = texture2D(uSampler, vTextureCoord);

    // Extract brightness and apply threshold
    float sceneBrightness = brightness(sceneColor.rgb);
    float bloomFactor = max(sceneBrightness - uThreshold, 0.0);

    // Scale the bloom factor with intensity
    bloomFactor *= uBloomIntensity;

    // Apply bloom effect
    vec3 bloomColor = sceneColor.rgb * bloomFactor;

    // Combine original color and bloom color
    vec3 finalColor = sceneColor.rgb + bloomColor;

    // Output the final color
    gl_FragColor = vec4(finalColor, sceneColor.a);
}

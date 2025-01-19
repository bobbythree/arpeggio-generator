export const noiseShader = `

precision mediump float;

// Input texture (rendered scene)
uniform sampler2D uSampler;
// Texture coordinates
varying vec2 vTextureCoord;

// Uniforms for controlling noise
uniform float uTime;          // Time uniform for animation
uniform float uNoiseIntensity; // Intensity of the noise effect

// Random noise function
float random(vec2 uv) {
    return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vTextureCoord;

    // Fetch the base scene color
    vec4 sceneColor = texture2D(uSampler, uv);

    // Generate noise based on UV and time
    float noise = random(uv + uTime);

    // Adjust noise intensity
    noise = noise * 2.0 - 1.0; // Convert to range [-1, 1]
    noise *= uNoiseIntensity;

    // Apply noise to the color
    vec3 noisyColor = sceneColor.rgb + vec3(noise);

    // Output the final color
    gl_FragColor = vec4(noisyColor, sceneColor.a);
}`;

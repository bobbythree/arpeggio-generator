export const glitchShader = `

precision mediump float;

// Input texture (rendered scene)
uniform sampler2D uSampler;
// Texture coordinates
varying vec2 vTextureCoord;

// Uniforms for controlling glitch
uniform float uTime;          // Time uniform for animation
uniform float uIntensity;     // Intensity of the glitch effect

// Random function based on UV coordinates and time
float random(vec2 uv) {
    return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // Fetch the base scene color
    vec2 uv = vTextureCoord;
    vec4 sceneColor = texture2D(uSampler, uv);

    // Introduce horizontal glitch offset
    float glitchOffset = (random(vec2(uv.y, uTime)) - 0.5) * uIntensity;
    uv.x += glitchOffset;

    // Fetch the glitched color
    vec4 glitchColor = texture2D(uSampler, uv);

    // Apply color shifts for glitch effect
    float rShift = (random(vec2(uv.y + uTime, 1.0)) - 0.5) * uIntensity * 0.1;
    float gShift = (random(vec2(uv.y - uTime, 2.0)) - 0.5) * uIntensity * 0.1;

    vec4 shiftedColor = vec4(
        texture2D(uSampler, uv + vec2(rShift, 0.0)).r,
        texture2D(uSampler, uv + vec2(gShift, 0.0)).g,
        glitchColor.b,
        glitchColor.a
    );

    // Combine original and glitched color
    gl_FragColor = mix(sceneColor, shiftedColor, uIntensity);
}`;

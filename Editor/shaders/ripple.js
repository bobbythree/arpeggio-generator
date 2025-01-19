export const rippleShader = `

precision mediump float;

// Input texture (rendered scene)
uniform sampler2D uSampler;
// Texture coordinates
varying vec2 vTextureCoord;

// Uniforms for controlling ripple effect
uniform float uTime;          // Time uniform for animation
uniform float uRippleFrequency; // Frequency of the ripples
uniform float uRippleAmplitude; // Amplitude of the ripples
uniform vec2 uCenter;         // Center point of the ripple

void main() {
    vec2 uv = vTextureCoord;

    // Calculate distance from the center of the ripple
    float dist = distance(uv, uCenter);

    // Calculate ripple offset based on distance and time
    float ripple = sin(dist * uRippleFrequency - uTime) * uRippleAmplitude;

    // Apply ripple effect to texture coordinates
    vec2 rippleUV = uv + ripple * normalize(uv - uCenter);

    // Fetch the base scene color with modified UVs
    vec4 sceneColor = texture2D(uSampler, rippleUV);

    // Output the final color
    gl_FragColor = sceneColor;
}`;

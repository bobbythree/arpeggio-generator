export const trailsShader = `

precision mediump float;

// Input texture (rendered scene)
uniform sampler2D uSampler;
// Texture coordinates
varying vec2 vTextureCoord;

// Uniforms for controlling visual echo
uniform float uTime;          // Time uniform for animation
uniform float uIntensity;     // Intensity of the echo effect
uniform float uDecay;         // Decay rate of the echo
uniform int uEchoCount;       // Number of echoes

void main() {
    vec4 finalColor = vec4(0.0);
    vec2 uv = vTextureCoord;

    // Loop to create echoes
    for (int i = 0; i < 10; i++) { // Max loop count for safety
        if (i >= uEchoCount) break;

        // Offset UV based on time and iteration
        float offset = float(i) * 0.005 * uIntensity;
        vec2 echoUV = uv + vec2(offset * sin(uTime + float(i)), offset * cos(uTime + float(i)));

        // Sample texture with decay factor
        vec4 echoColor = texture2D(uSampler, echoUV) * pow(uDecay, float(i));

        // Accumulate echo color
        finalColor += echoColor;
    }

    // Combine echoes with the original color
    vec4 sceneColor = texture2D(uSampler, uv);
    gl_FragColor = mix(sceneColor, finalColor, uIntensity);
}`;

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
import { scenes } from '../data/scenes.js';

export function setBackround(app, transport, sceneName) {
    const scene = scenes[sceneName];
    if (!scene) return;

    // Set the background image
    const background = PIXI.Sprite.from(scene.backgroundImage);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

    initParticles(app, sceneName);
}

//#region Particles
function initParticles(app, sceneName) {
    // Particle Effect
    const particleContainer = new PIXI.ParticleContainer(500, {
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true,
    });
    app.stage.addChild(particleContainer);

    // Particle texture 
    const textPath = scenes[sceneName].particles.texture;
    const particleTexture = PIXI.Texture.from(textPath); 

    // Particle array
    const particles = [];
    for (let i = 0; i < 50; i++) {
        const particle = new PIXI.Sprite(particleTexture);
        particle.anchor.set(0.5);
        // particle.tint = scenes[sceneName].particles.color;
        particle.tint = `hsl(${Math.random() * 360} 50% 50%)`;
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
        particles.forEach((particle) => {
            particle.x += particle.vx * delta;
            particle.y += particle.vy * delta;

            // Wrap around screen edges
            if (particle.x < 0) particle.x = app.screen.width;
            if (particle.x > app.screen.width) particle.x = 0;
            if (particle.y < 0) particle.y = app.screen.height;
            if (particle.y > app.screen.height) particle.y = 0;

            // Slowly fade particles in and out
            // particle.alpha += Math.sin(app.ticker.lastTime / 1000) * 0.01;
        });
    });
}
//#endregion

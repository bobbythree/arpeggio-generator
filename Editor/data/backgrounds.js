export const backgrounds = {
    "happy": {
        "backgroundImage": "./images/happy/happy-bg.jpg",
        "effectors" : [
            {"effect": "chorus", "shader": "./shaders/bloom.glsl", "position": [0, 0], "size: " : [100, 100] }, 
            {"effect": "bitCrusher", "shader": "./shaders/pixelate.glsl", "position": [200, 0], "size: " : [100, 100]  },
            {"effect": "reverb", "shader": "./shaders/glitch.glsl", "position": [400, 0], "size: " : [100, 100]  },
            {"effect": "delay", "shader": "./shaders/trails.glsl", "position": [600, 0], "size: " : [100, 100]  },
            {"effect": "distortion", "shader": "./shaders/noise.glsl", "position": [0, 300], "size: " : [100, 100]  },
            {"effect": "phaser", "shader": "./shaders/ripple.glsl", "position": [200, 300], "size: " : [100, 100]  },
            {"effect": "tremolo", "shader": "./shaders/wave.glsl", "position": [400, 300], "size: " : [100, 100]  }
        ],
        "particles": {
            "texture": "./images/particles/happy-particle.png",
            "color": 0x00ff00
        } //TODO: add other particle properties
    },
    "sad": {
        "backgroundImage": "./images/happy/sad-bg.jpg",
        "effectors" : [
            {"effect": "chorus", "shader": "./shaders/bloom.glsl", "position": [0, 0], "size: " : [100, 100] }, 
            {"effect": "bitCrusher", "shader": "./shaders/pixelate.glsl", "position": [200, 0], "size: " : [100, 100]  },
            {"effect": "reverb", "shader": "./shaders/glitch.glsl", "position": [400, 0], "size: " : [100, 100]  },
            {"effect": "delay", "shader": "./shaders/trails.glsl", "position": [600, 0], "size: " : [100, 100]  },
            {"effect": "distortion", "shader": "./shaders/noise.glsl", "position": [0, 300], "size: " : [100, 100]  },
            {"effect": "phaser", "shader": "./shaders/ripple.glsl", "position": [200, 300], "size: " : [100, 100]  },
            {"effect": "tremolo", "shader": "./shaders/wave.glsl", "position": [400, 300], "size: " : [100, 100]  }
        ],
        "particles": {
            "texture": "./images/particles/sad-particle.png",
            "color": 0x00ff00
        } //TODO: add other particle properties
    },
    "angry": {
        "backgroundImage": "./images/happy/angry-bg.jpg",
        "effectors" : [
            {"effect": "chorus", "shader": "./shaders/bloom.glsl", "position": [0, 0], "size: " : [100, 100] }, 
            {"effect": "bitCrusher", "shader": "./shaders/pixelate.glsl", "position": [200, 0], "size: " : [100, 100]  },
            {"effect": "reverb", "shader": "./shaders/glitch.glsl", "position": [400, 0], "size: " : [100, 100]  },
            {"effect": "delay", "shader": "./shaders/trails.glsl", "position": [600, 0], "size: " : [100, 100]  },
            {"effect": "distortion", "shader": "./shaders/noise.glsl", "position": [0, 300], "size: " : [100, 100]  },
            {"effect": "phaser", "shader": "./shaders/ripple.glsl", "position": [200, 300], "size: " : [100, 100]  },
            {"effect": "tremolo", "shader": "./shaders/wave.glsl", "position": [400, 300], "size: " : [100, 100]  }
        ],
        "particles": {
            "texture": "./images/particles/angry-particle.png",
            "color": 0x00ff00
        } //TODO: add other particle properties
    },
    "nostalgic": {
        "backgroundImage": "./images/happy/nostalgic-bg.jpg",
        "effectors" : [
            {"effect": "chorus", "shader": "./shaders/bloom.glsl", "position": [0, 0], "size: " : [100, 100] }, 
            {"effect": "bitCrusher", "shader": "./shaders/pixelate.glsl", "position": [200, 0], "size: " : [100, 100]  },
            {"effect": "reverb", "shader": "./shaders/glitch.glsl", "position": [400, 0], "size: " : [100, 100]  },
            {"effect": "delay", "shader": "./shaders/trails.glsl", "position": [600, 0], "size: " : [100, 100]  },
            {"effect": "distortion", "shader": "./shaders/noise.glsl", "position": [0, 300], "size: " : [100, 100]  },
            {"effect": "phaser", "shader": "./shaders/ripple.glsl", "position": [200, 300], "size: " : [100, 100]  },
            {"effect": "tremolo", "shader": "./shaders/wave.glsl", "position": [400, 300], "size: " : [100, 100]  }
        ],
        "particles": {
            "texture": "./images/particles/nostalgic-particle.png",
            "color": 0x00ff00
        } //TODO: add other particle properties
    },
    "serene": {
        "backgroundImage": "./images/happy/serene-bg.jpg",
        "effectors" : [
            {"effect": "chorus", "shader": "./shaders/bloom.glsl", "position": [0, 0], "size: " : [100, 100] }, 
            {"effect": "bitCrusher", "shader": "./shaders/pixelate.glsl", "position": [200, 0], "size: " : [100, 100]  },
            {"effect": "reverb", "shader": "./shaders/glitch.glsl", "position": [400, 0], "size: " : [100, 100]  },
            {"effect": "delay", "shader": "./shaders/trails.glsl", "position": [600, 0], "size: " : [100, 100]  },
            {"effect": "distortion", "shader": "./shaders/noise.glsl", "position": [0, 300], "size: " : [100, 100]  },
            {"effect": "phaser", "shader": "./shaders/ripple.glsl", "position": [200, 300], "size: " : [100, 100]  },
            {"effect": "tremolo", "shader": "./shaders/wave.glsl", "position": [400, 300], "size: " : [100, 100]  }
        ],
        "particles": {
            "texture": "./images/particles/serene-particle.png",
            "color": 0x00ff00
        } //TODO: add other particle properties
    },
    "spooky": {
        "backgroundImage": "./images/happy/spooky-bg.jpg",
        "effectors" : [
            {"effect": "chorus", "shader": "./shaders/bloom.glsl", "position": [0, 0], "size: " : [100, 100] }, 
            {"effect": "bitCrusher", "shader": "./shaders/pixelate.glsl", "position": [200, 0], "size: " : [100, 100]  },
            {"effect": "reverb", "shader": "./shaders/glitch.glsl", "position": [400, 0], "size: " : [100, 100]  },
            {"effect": "delay", "shader": "./shaders/trails.glsl", "position": [600, 0], "size: " : [100, 100]  },
            {"effect": "distortion", "shader": "./shaders/noise.glsl", "position": [0, 300], "size: " : [100, 100]  },
            {"effect": "phaser", "shader": "./shaders/ripple.glsl", "position": [200, 300], "size: " : [100, 100]  },
            {"effect": "tremolo", "shader": "./shaders/wave.glsl", "position": [400, 300], "size: " : [100, 100]  }
        ],
        "particles": {
            "texture": "./images/particles/spooky-particle.png",
            "color": 0x00ff00
        } //TODO: add other particle properties
    },
};

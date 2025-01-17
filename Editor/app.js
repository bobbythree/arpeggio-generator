import { scenes } from './data/scenes.js';
import { arpObjects } from "./data/arpObjects.js";
import { start, stop, addArp, deleteArp, adjustVolume, nextSynth } from "./audio/arpeggiator.js";
import { moods } from "./data/moods-chords.js";
import { init, setEffect } from "./audio/effector.js";
import { setBackround, updateEffectorVisibility } from './utils/background.js';
import { toggleDebugMode } from './settings.js';

//event lisener for page load
window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    populateSceneSelector();
    loadScene('happy');
});

const app = new PIXI.Application({
    width: 1280,
    height: 720,
    backgroundColor: 0x1099bb,
});

const sprites = [];
let spriteIdIndex = 0;

app.stage.hitArea = app.screen;

// Add the PIXI app to the UI
document.getElementById("scene").appendChild(app.view);

//icons
const iconContainer = document.getElementById("icon-container");

// Create a container for each mood
const moodContainers = {};

for (const [type, obj] of Object.entries(arpObjects)) {
    if (!moodContainers[obj.mood]) {
        // Create a new container for the mood
        const moodContainer = document.createElement('div');
        moodContainer.className = 'mood-container';
        
        // Create a label for the mood
        const moodLabel = document.createElement('label');
        moodLabel.textContent = obj.mood;
        moodContainer.appendChild(moodLabel);

        // Add the mood container to the icon container
        iconContainer.appendChild(moodContainer);

        // Store the mood container
        moodContainers[obj.mood] = moodContainer;
    }

    // Create the icon
    const img = document.createElement('img');
    img.src = obj.image;
    img.className = 'icon';
    img.dataset.type = type;
    img.draggable = true;

    // Add the icon to the appropriate mood container
    moodContainers[obj.mood].appendChild(img);
}

// Populate the scene selector dropdown
function populateSceneSelector() {
    const sceneSelector = document.getElementById('scene-selector');
    for (const scene in scenes) {
        const option = document.createElement('option');
        option.value = scene;
        option.textContent = scene.charAt(0).toUpperCase() + scene.slice(1);
        sceneSelector.appendChild(option);
    }
    sceneSelector.value = 'happy'; // Default to happy
    sceneSelector.addEventListener('change', (event) => {
        clearScene();
        loadScene(event.target.value);
    });
}

// Load the selected scene
function loadScene(sceneName) {
    setBackround(app, Tone.getTransport(), sceneName);

    // Show only the icons for the selected mood
    for (const mood in moodContainers) {
        moodContainers[mood].style.display = mood === sceneName ? 'block' : 'none';
    }

    outputDebugInfo(`Loaded scene: ${sceneName}`);
}

// Update mouse coordinates display
app.view.addEventListener('mousemove', (event) => {
    const rect = app.view.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    document.getElementById('mouse-coordinates').textContent = `X: ${x.toFixed(0)}, Y: ${y.toFixed(0)}`;
});

//start the engine
document.getElementById('start-button').addEventListener('click', startTone);
document.getElementById('pause-button').addEventListener('click', pauseTone);
document.getElementById('clear-button').addEventListener('click', clearScene);

// Handle debug checkbox change
document.getElementById('debug-checkbox').addEventListener('change', function() {
    toggleDebugMode(this.checked);
    updateEffectorVisibility();
    console.log('Debug Mode:', this.checked);
});

function startTone() {
    start();
    outputDebugInfo("Tone started");
}

function pauseTone() {
    stop();
    outputDebugInfo("Tone paused");
}

function clearScene() {
    sprites.forEach(sprite => {
        deleteArp(sprite.id);
        app.stage.removeChild(sprite);
        
    });
    sprites.length = 0;
    outputDebugInfo("Scene cleared");
}

function outputDebugInfo(message) {
    const debugInfo = document.getElementById('debug-info');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    debugInfo.appendChild(newMessage);
    debugInfo.scrollTop = debugInfo.scrollHeight;
}

// Add drag-and-drop functionality
iconContainer.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("type", event.target.dataset.type);
});

app.view.addEventListener("dragover", (event) => {
    event.preventDefault();
});

app.view.addEventListener("drop", (event) => {
    event.preventDefault();

    // Get the type of the dropped icon
    const type = event.dataTransfer.getData("type");

    // Create a sprite based on the type
    let sprite;
    if (arpObjects[type]) {
        sprite = PIXI.Sprite.from(arpObjects[type].image);
        
        // Create text for the mood
        const moodText = new PIXI.Text(arpObjects[type].mood, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center'
        });
        
        // Center the text on the sprite
        moodText.anchor.set(0.5);
        moodText.x = 0;
        moodText.y = 0;
          
        sprite.addChild(moodText);// Add the text as a child of the sprite
    }

    // Set initial position to the drop location
    const rect = app.view.getBoundingClientRect();
    sprite.x = event.clientX - rect.left;
    sprite.y = event.clientY - rect.top;

    // Enable interactivity for the sprite
    sprite.eventMode = "dynamic";
    sprite.anchor.set(0.5, 0.5);

    // Add functionality to move, rotate, and scale
    sprite
        .on("pointerdown", onDragStart)
        .on("pointerup", onDragEnd)
        .on("pointerupoutside", onDragEnd)
        .on("pointermove", onDragMove)
        .on("pointerover", onPointerOver) 
        .on("pointerout", onPointerOut);  

    sprite.scale.set(.5); // Scale down the sprite
    
    
    sprite.id = spriteIdIndex; // Assign an ID to the sprite
    spriteIdIndex++;
    getArpFromSceneObj(type, sprite.id); // Add the sprite to the array
    console.log("Adding Sprite with id: " + sprite.id);
    sprites.push(sprite); // Add the sprite to the array 

    app.stage.addChild(sprite); // Add the sprite to the stage
});

function deleteSprite(spriteId) {
  console.log("Deleting Sprite with id: " + spriteId);
  //loop through arp array and remove the arp with the matching id
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].id === spriteId) {
      sprites.splice(i, 1);
      break;
    }
  }
}

export function getSprite(spriteId) {
  //get the sprite from the stage with the matching id
  console.log("Getting Sprite with id: " + spriteId);
    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i].id === spriteId) {
            console.log("Found Sprite with id: " + spriteId);
        return sprites[i];
        }
    }
}

export function getSprites() {
  //return the sprites array
  return sprites;
}

// Variables for drag state
let dragging = false;
let dragTarget = null;
let dragData = null;

// Drag event handlers
function onDragStart(event) {
    dragging = true;
    dragTarget = this;
    dragData = event.data;
    this.alpha = 0.5; // Add visual feedback
}

function onDragEnd() {
    dragging = false;
    dragData = null;
    this.alpha = 1;
}

function onDragMove() {
    if (dragging) {
        const newPosition = dragData.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

// Pointer over event handler
function onPointerOver(event) {
    this.tint = 0xFFAAAA; // Tint the sprite
    dragTarget = this;
}

// Pointer out event handler
function onPointerOut() {
    this.tint = 0xFFFFFF; // Reset the tint
    dragTarget = null;
}

//TODO: This shouldn't be mouse wheel so mobile and tablet are supported
app.view.addEventListener("wheel", (event) => {
    if (dragTarget) {
        // Rotate with the mouse wheel
        dragTarget.rotation += event.deltaY * 0.001;
    }
});

//TODO: This shouldn't be -/+ and delete so mobile and tablet are supported
window.addEventListener("keydown", (event) => {
    if (dragTarget) {
        // Scale with keyboard keys
        if (event.key === "+") {
            if(dragTarget.scale.x + 0.1 > 1){
                dragTarget.scale.x = 1;
                dragTarget.scale.y = 1;
            }
            else {
                dragTarget.scale.x += 0.1;
                dragTarget.scale.y += 0.1;
            }
            adjustVolume(dragTarget.id, 1);
        } else if (event.key === "-") {
            if(dragTarget.scale.x - 0.1 < .15){
                dragTarget.scale.x = .15;
                dragTarget.scale.y = .15;
            }
            else {
                dragTarget.scale.x -= 0.1;
                dragTarget.scale.y -= 0.1;
            }
            adjustVolume(dragTarget.id, -1);
        }
        else if(event.key === "Delete"){
            app.stage.removeChild(dragTarget);
            
            deleteSprite(dragTarget.id);
            deleteArp(dragTarget.id);

            dragging = false;
        }
        else if(event.key === "s"){
            nextSynth(dragTarget.id);
        }
    }
});

//utils
function getArpFromSceneObj(sceneObj, id) {
    const chordName = arpObjects[sceneObj].chordName;
    const mood = arpObjects[sceneObj].mood; 
    const synthName = arpObjects[sceneObj].synthName;
    const rootNote = moods[mood][chordName].rootNote;
    const intervals = moods[mood][chordName].chordIntervalsSemiTones;    
    
    addArp({id, rootNote, intervals, synthName});
}

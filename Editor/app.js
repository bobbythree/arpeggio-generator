import { sceneObjects } from "./data/scene.js";
import { start, addArp, deleteArp } from "./audio/argeggiator.js";
import { moods } from "./data/moods-chords.js";

const app = new PIXI.Application({
    width: 1280,
    height: 720,
    backgroundColor: 0x1099bb,
});

const sprites = [];
let spriteIndex = 0;

app.stage.hitArea = app.screen;

// Add the PIXI app to the UI
document.getElementById("scene").appendChild(app.view);

// Add background image
const background = PIXI.Sprite.from("./images/serene/serene-bg.jpg");
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

const iconContainer = document.getElementById("icon-container");

// Create a container for each mood
const moodContainers = {};

for (const [type, obj] of Object.entries(sceneObjects)) {
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

//start the engine
document.getElementById('start-button').addEventListener('click', startTone);

function startTone() {
    start();
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
    if (sceneObjects[type]) {
        sprite = PIXI.Sprite.from(sceneObjects[type].image);
        
        // Create text for the mood
        const moodText = new PIXI.Text(sceneObjects[type].mood, {
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
    
    
    sprite.id = spriteIndex; // Assign an ID to the sprite
    spriteIndex++;
    getArpFromSceneObj(type, sprite.id); // Add the sprite to the array
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
    // getArpFromSceneObj('cloud')
    // TODO: get current obj and pass to getArpFromSceneObj
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
            dragTarget.scale.x += 0.1;
            dragTarget.scale.y += 0.1;
        } else if (event.key === "-") {
            dragTarget.scale.x -= 0.1;
            dragTarget.scale.y -= 0.1;
        }
        else if(event.key === "Delete"){
            app.stage.removeChild(dragTarget);
            
            deleteSprite(dragTarget.id);
            deleteArp(dragTarget.id);

            dragging = false;
        }
    }
});

//utils
function getArpFromSceneObj(sceneObj, id) {
    const chordName = sceneObjects[sceneObj].chordName;
    const mood = sceneObjects[sceneObj].mood; 
    let rootNote = moods[mood][chordName].rootNote;
    let intervals = moods[mood][chordName].chordIntervalsSemiTones;
    
    addArp({id, rootNote, intervals});
}

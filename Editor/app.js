import { sceneObjects } from "./data/scene.js";
import { playArp } from "./audio/argeggiator.js";

const app = new PIXI.Application({
    width: 1280,
    height: 720,
    backgroundColor: 0x1099bb,
});

app.stage.hitArea = app.screen;

// Add the PIXI app to the UI
document.getElementById("scene").appendChild(app.view);

// Add background image
const background = PIXI.Sprite.from("./images/background.jpg");
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

const iconContainer = document.getElementById("icon-container");

// Dynamically create icons from sceneObjects
for (const [type, obj] of Object.entries(sceneObjects)) {
    const img = document.createElement('img');
    img.src = obj.image;
    img.className = 'icon';
    img.dataset.type = type;
    img.draggable = true;
    iconContainer.appendChild(img);
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
        
        // Add the text as a child of the sprite
        sprite.addChild(moodText);
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
    
    // Add the sprite to the stage
    app.stage.addChild(sprite);
});

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
    playArp(0, 'happy')
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
        }
    }
});

//toggle debug panel display
const debugPanel = document.getElementById('control-panel');
debugPanel.style.display = 'block'

export function toggleControlPanel () {
    if (debugPanel.style.display === 'block') {
        debugPanel.style.display = 'none';
    } else {
        debugPanel.style.display = 'block';
    }
}

//toggle debug mode
export const settings = {
    debugMode: false
};

export function toggleDebugMode(value) {
    settings.debugMode = value;
}
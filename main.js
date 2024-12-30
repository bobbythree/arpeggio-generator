//setup music functionality
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const c4_frequency = 261.626;   // To calculate frequency of notes, we need a datum
let currentOctave = 4;          // Initial octave
let powerOn = false;            // Power state

//Intervals in semitones to play this type of chord
const chordIntervals = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
  dominant7: [0, 4, 7, 10],
  halfDiminished7: [0, 3, 6, 10],
  diminished7: [0, 3, 6, 9],
  minorMajor7: [0, 3, 7, 11],
  augmentedMajor7: [0, 4, 8, 11],
  augmented7: [0, 4, 8, 10],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  add9: [0, 4, 7, 14],
  add11: [0, 4, 7, 17],
  add13: [0, 4, 7, 21]
};

//create dropdown for chord selection
const dropdownDiv = document.getElementById('dropdown-div');
const dropdown = document.createElement('select');

//populate dropdown with chord options from chordintervals
for (const chord in chordIntervals) {
  const option = document.createElement('option');
  option.value = chord;
  option.text = chord;
  dropdown.appendChild(option);
}

//Add the dropdown to the page
dropdownDiv.appendChild(dropdown);

//add event listener to dropdown
dropdown.addEventListener('change', (event) => {
  selectedChord = event.target.value;
});

//create dropdown for arpeggio pattern selection
const patternDropdown = document.createElement('select');
const patterns = ['Rising', 'Falling', 'Ping Pong', 'Random'];

//populate dropdown with pattern options
patterns.forEach(pattern => {
  const option = document.createElement('option');
  option.value = pattern;
  option.text = pattern;
  patternDropdown.appendChild(option);
});

//Add the pattern dropdown to the page
dropdownDiv.appendChild(patternDropdown);

let selectedPattern = 'Rising'; // Default pattern

//add event listener to pattern dropdown
patternDropdown.addEventListener('change', (event) => {
  selectedPattern = event.target.value;
});

//helper function to calculate frequency of notes offset from C4
function calculateFrequency(semitonesFromC4) {
  var noteFrequency = c4_frequency * Math.pow(2, semitonesFromC4 / 12);
  return noteFrequency;
}

// Function to play an arpeggio based on the root note and selected chord
function playArp(semitonesFromC4, chord) {
  if (!powerOn) return; // Do nothing if power is off
  console.info('Playing Arp from root note: ' + calculateFrequency(semitonesFromC4));
  const now = Tone.now();
  var timeOffset = .25;
  const intervals = chordIntervals[chord];

  let notesToPlay = [];
  switch (selectedPattern) {
    case 'Rising':
      notesToPlay = intervals;
      break;
    case 'Falling':
      notesToPlay = intervals.slice().reverse();
      break;
    case 'Ping Pong':
      notesToPlay = intervals.concat(intervals.slice().reverse().slice(1));
      break;
    case 'Random':
      notesToPlay = intervals.slice().sort(() => Math.random() - 0.5);
      break;
  }

  notesToPlay.forEach((interval, index) => {
    synth.triggerAttackRelease(calculateFrequency(semitonesFromC4 + interval), "8n", now + timeOffset * index);
  });
}

// Keyboard and octave controls - makes the math easier by embedding the note semitone offset for the keyboard
const notes = {
  'C': 0,
  'C#': 1,
  'D': 2,
  'D#': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'G': 7,
  'G#': 8,
  'A': 9,
  'A#': 10,
  'B': 11
};

let selectedChord = 'major'; // Default chord

// Control the UI state based on powerOn
function setUIState(powerOn) {
  document.querySelector('select').disabled = !powerOn;
  document.querySelectorAll('.note').forEach(button => {
    button.disabled = !powerOn;
  });
  document.getElementById('decrease-octave').disabled = !powerOn;
  document.getElementById('increase-octave').disabled = !powerOn;
}

// Set initial UI state
setUIState(powerOn);

// Event listener for power button
document.getElementById('power-button').addEventListener('click', async () => {
  powerOn = !powerOn;
  const powerButton = document.getElementById('power-button');
  powerButton.textContent = powerOn ? 'Power On' : 'Power Off';
  powerButton.style.backgroundColor = powerOn ? 'lightgreen' : 'darkred';

  //This allows us to play music right away after powering on,
  // bypassing the limit where audio won't play until user interacts with the page
  if (powerOn && Tone.context.state === 'suspended') {
    await Tone.context.resume(); 
  }

  // Update UI state
  setUIState(powerOn);
});

// Event listeners for note buttons
document.querySelectorAll('.note').forEach(button => {
  button.addEventListener('click', () => {
    const note = button.getAttribute('data-note');
    const semitonesFromC4 = notes[note] + (currentOctave - 4) * 12;
    playArp(semitonesFromC4, selectedChord);
  });
});

// Event listeners for octave buttons
document.getElementById('decrease-octave').addEventListener('click', () => {
  if (currentOctave > 1) {
    currentOctave--;
  }
});

document.getElementById('increase-octave').addEventListener('click', () => {
  if (currentOctave < 7) {
    currentOctave++;
  }
});
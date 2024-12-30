//setup music functionality
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const c4_frequency = 261.626;

const chords = {
  I: {
    chord: 'I - C3',
    rootNoteSemitonesFromC4 : -7  
  },
  ii: {
    chord: 'ii - D3',
    rootNoteSemitonesFromC4 : -5
  },
  iii: {
    chord: 'iii - E3',
    rootNoteSemitonesFromC4 : -3
  },
  IV: {
    chord: 'IV - F3', 
    rootNoteSemitonesFromC4 : -2
  },
  V: {
    chord: 'V - G3',
    rootNoteSemitonesFromC4 : 0
  },
  vi: {
    chord: 'vi - A3',
    rootNoteSemitonesFromC4 : +2
  },
  vii: {
    chord: 'vii - B3',
    rootNoteSemitonesFromC4 : +4
  },
}

//Intervals in semitones to play this type of chord
const chordIntervals = {
  major: [0, 4, 5, 7],
  minor: [0, 3, 5, 7],
  diminished: [0, 3, 5, 6],
  augmented: [0, 4, 5, 8],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
  dominant7: [0, 4, 7, 10],
  halfDiminished7: [0, 3, 6, 10],
  diminished7: [0, 3, 6, 9],
  minorMajor7: [0, 3, 7, 11],
  augmentedMajor7: [0, 4, 8, 11],
  augmented7: [0, 4, 8, 10],
  sus2: [0, 2, 5, 7],
  sus4: [0, 5, 7, 12],
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

dropdownDiv.appendChild(dropdown);

//add event listener to dropdown
dropdown.addEventListener('change', (event) => {
  const selectedChord = event.target.value;
  if (selectedChord === 'I' || selectedChord === 'IV') {
    playArp(chords[selectedChord].rootNoteSemitonesFromC4);
  }
});

//create buttons with functionality
const buttonDiv = document.getElementById('button-div');

//helper function to calculate frequency of notes offset from C4
function calculateFrequency(semitonesFromC4) {
  var noteFrequency = c4_frequency * Math.pow(2, semitonesFromC4 / 12);
  return noteFrequency;
}

//draw the buttons
for (const chord in chords) {
  const button = document.createElement('button');
  button.innerHTML = chords[chord].chord;
  buttonDiv.appendChild(button);
  button.onclick = () => {
    if(chord === 'I' || chord === 'IV') {
      playArp(chords[chord].rootNoteSemitonesFromC4);
    }
  }
}

function playArp(semitonesFromC4) {
  console.info('Playing Arp from root note: ' + calculateFrequency(semitonesFromC4));
  const now = Tone.now();
  var timeOffset = .25;
  synth.triggerAttackRelease(calculateFrequency(semitonesFromC4), "2n", now);
  synth.triggerAttackRelease(calculateFrequency(semitonesFromC4 + 4), "8n", now + timeOffset);
  synth.triggerAttackRelease(calculateFrequency(semitonesFromC4 + 7), "8n", now + timeOffset  * 2);
  synth.triggerAttackRelease(calculateFrequency(semitonesFromC4 + 11), "8n", now + timeOffset  * 3);
}
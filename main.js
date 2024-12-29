//setup music functionality
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const c4_frequency = 261.626;

const chords = {
  I: {
    chord: 'I - C3',
    rootNoteFrequency : 130.813    
  },
  ii: {
    chord: 'ii - D3',
    rootNoteFrequency : 146.832
  },
  iii: {
    chord: 'iii - E3',
    rootNoteFrequency : 164.814
  },
  IV: {
    chord: 'IV - F3', 
    rootNoteFrequency : 174.614
  },
  V: {
    chord: 'V - G3',
    rootNoteFrequency : 195.998
  },
  vi: {
    chord: 'vi - A3',
    rootNoteFrequency : 220.000
  },
  vii: {
    chord: 'vii - B3',
    rootNoteFrequency : 246.942
  },
}

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
    playArp(chords[chord].rootNoteFrequency);
  }
}

function playArp(rootNoteFrequency)
{
  const now = Tone.now();
  var timeOffset = .25;
  synth.triggerAttackRelease(rootNoteFrequency, "2n", now);
  synth.triggerAttackRelease(calculateFrequency(2), "8n", now + timeOffset);
  synth.triggerAttackRelease(calculateFrequency(4), "8n", now + timeOffset  * 2);
  synth.triggerAttackRelease(calculateFrequency(7), "8n", now + timeOffset  * 3);
}
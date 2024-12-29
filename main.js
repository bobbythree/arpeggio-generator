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
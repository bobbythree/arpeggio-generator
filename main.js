const chords = {
  I: {
    chord: 'I',
    func : playArp1,
    
  },
  ii: {
    chord: 'ii',
    func : playArp2,
    
  },
  iii: {
    chord: 'iii',
    func : playArp3,
    
  },
  IV: {
    chord: 'IV',
    func : playArp4,
    
  },
  V: {
    chord: 'V',
    func : playArp5,
    
  },
  vi: {
    chord: 'vi',
    func : playArp6,
    
  },
  vii: {
    chord: 'vii',
    func : playArp7,
    
  },
}

//create buttons with functionality
const buttonDiv = document.getElementById('button-div');

for (const x in chords) {
  const button = document.createElement('button');
  button.innerHTML = chords[x].chord;
  buttonDiv.appendChild(button);
  button.onclick = () => {
    chords[x].func();
  }
}


//aprpeggio functions
function playArp1() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("C3", "2n", now);
  synth.triggerAttackRelease("G3", "8n", now + 0.25);
  synth.triggerAttackRelease("A3", "8n", now + 0.5);
  synth.triggerAttackRelease("E4", "8n", now + 0.75);
}

function playArp2() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("D3", "2n", now);
  synth.triggerAttackRelease("F3", "8n", now + 0.25);
  synth.triggerAttackRelease("A3", "8n", now + 0.5);
  synth.triggerAttackRelease("C4", "8n", now + 0.75);
}

function playArp3() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("E3", "2n", now);
  synth.triggerAttackRelease("G3", "8n", now + 0.25);
  synth.triggerAttackRelease("B3", "8n", now + 0.5);
  synth.triggerAttackRelease("D4", "8n", now + 0.75);
}

function playArp4() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("F3", "2n", now);
  synth.triggerAttackRelease("A3", "8n", now + 0.25);
  synth.triggerAttackRelease("C4", "8n", now + 0.5);
  synth.triggerAttackRelease("E4", "8n", now + 0.75);
}

function playArp5() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("G3", "2n", now);
  synth.triggerAttackRelease("B3", "8n", now + 0.25);
  synth.triggerAttackRelease("D4", "8n", now + 0.5);
  synth.triggerAttackRelease("F4", "8n", now + 0.75);
}

function playArp6() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("A3", "2n", now);
  synth.triggerAttackRelease("C4", "8n", now + 0.25);
  synth.triggerAttackRelease("E4", "8n", now + 0.5);
  synth.triggerAttackRelease("G4", "8n", now + 0.75);
}

function playArp7() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("B3", "2n", now);
  synth.triggerAttackRelease("D4", "8n", now + 0.25);
  synth.triggerAttackRelease("F4", "8n", now + 0.5);
  synth.triggerAttackRelease("A4", "8n", now + 0.75);
}

const playBtn1 = document.getElementById('play-btn1')
const playBtn2 = document.getElementById('play-btn2')
const playBtn3 = document.getElementById('play-btn3')



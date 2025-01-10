//setup music functionality
Tone.Transport.bpm.value = 120;
Tone.Transport.start();

const arps = [];
const synths = [];

export function addArp(arp) {
  if(getCurrentBeat() == 4) {
    arp.startBeat = 1;
  }
  else {
    arp.startBeat = getCurrentBeat() + 1;
  }

  addSynth(arp);
  arps.push(arp);
}

function addSynth(arp) {
  const arpSynth = new Tone.PolySynth(Tone.Synth).toDestination();
  arpSynth.id = arp.id;
  synths.push(arpSynth);
}

export function deleteArp(arpId) {
  console.log("Deleting Arp with id: " + arpId);
  //loop through arp array and remove the arp with the matching id
  for (let i = 0; i < arps.length; i++) {
    if (arps[i].id === arpId) {
      arps.splice(i, 1);
      break;
    }
  }

  deleteSynth(arpId);
}

function deleteSynth(arpId) {
  console.log("Deleting Synth with id: " + arpId);
  //loop through synth array and remove the synth with the matching id
  for (let i = 0; i < synths.length; i++) {
    if (synths[i].id === arpId) {
      synths.splice(i, 1);
      break;
    }
  }
}

export function start(){
  console.log("Starting Tone");
  Tone.Transport.start();
  loop.start();
}

export function stop(){
  Tone.Transport.stop();
} 


//This is the loop fires on a 1m interval
var loop = new Tone.Loop( (time) => {
  document.getElementById("start-button").innerHTML = getCurrentBeat();

    console.log("Playing Arps at beat: " + getCurrentBeat());
    arps.forEach((arp) => {  
      if(arp.startBeat === getCurrentBeat()){
        arp.intervals.forEach((interval, index) => {
          const synth = synths.find(s => s.id === arp.id);
          if(index === 0){
            
            synth.triggerAttackRelease(Tone.Frequency(arp.rootNote), "2n", time);
          }
          else {
            synth.triggerAttackRelease(Tone.Frequency(arp.rootNote).transpose(interval), "8n", time + Tone.Time("8n") * index); 
          }
        });
      }
  });
}, "4n");


function getCurrentBeat() {
  const position = Tone.Transport.position;
  const [bar, beat, sixteenth] = position.split(":");
  return parseFloat(beat) + 1; // Add 1 to start counting from 1 instead of 0
}

export function adjustVolume(arpId, volume) {
  console.log("Adjusting Volume for Arp with id: " + arpId);
  //loop through synth array and adjust the volume for the synth with the matching id
  for (let i = 0; i < synths.length; i++) {
    if (synths[i].id === arpId) {
      synths[i].volume.value += volume;
      break;
    }
  }
}

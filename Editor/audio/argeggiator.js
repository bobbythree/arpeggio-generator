//setup music functionality
Tone.Transport.bpm.value = 120;

const arps = [];

export function addArp(arp) {
  if(getCurrentEighthNote() >= 7) {
    arp.startBeat = 1;
  }
  else {
    arp.startBeat = getCurrentEighthNote() + 1;
  }

  arp.synth = getSynthByName(arp.synthName);
  arps.push(arp);
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
}

export function start(){
  console.log("Starting Tone");
  Tone.Transport.start();
  loop.start();
}

export function stop(){
  Tone.Transport.stop();
} 

//This is the loop fires on a 8n interval
var loop = new Tone.Loop( (time) => {
  document.getElementById("start-button").innerHTML = getCurrentEighthNote();

    arps.forEach((arp) => {  
      if(arp.startBeat === getCurrentEighthNote()){
        arp.intervals.forEach((interval, index) => {
          if(index === 0){
            arp.synth.triggerAttackRelease(Tone.Frequency(arp.rootNote), "2n", time);
          }
          else {
            arp.synth.triggerAttackRelease(Tone.Frequency(arp.rootNote).transpose(interval), "8n", time + Tone.Time("8n") * index); 
          }
        });
      }
  });
  //wrap the loop
  if(loopIndex < 7){
    loopIndex++;
  } else {
    loopIndex = 0;
  }
}, "8n").start(0);

var loopIndex = 0;
function getCurrentEighthNote() {
  return loopIndex;
}

export function adjustVolume(arpId, volume) {
  //get the arp with the matching id
  for (let i = 0; i < arps.length; i++) {    
    if (arps[i].id === arpId) {
      arps[i].synth.volume.value <= -5 ? arps[i].synth.volume.value = -5 : arps[i].synth.volume.value += volume;
      arps[i].synth.volume.value >= 5 ? arps[i].synth.volume.value = 5 : arps[i].synth.volume.value += volume;
      
      break;
    }
  }
}

export function nextSynth(arpId) {
  //get the arp with the matching id
  for (let i = 0; i < arps.length; i++) {
    if (arps[i].id === arpId) {
      arps[i].synth.dispose();
      console.log("Switching synth to: " + getNextSynthName(arps[i].synthName) + " from " + arps[i].synthName);
      arps[i].synth = getSynthByName(getNextSynthName(arps[i].synthName));
      arps[i].synthName = getNextSynthName(arps[i].synthName);
      break;
    }
  }
}

const synthNames = ["polySynth", "monoSynth", "amsynth", "fmsynth", "membraneSynth", "metalSynth", "duoSynth", "pluckSynth"]; 
function getSynthByName(synthName) {
  //switch based on name, returning a tone.js instrument (excluding sampler).  Default is a PolySynth.
  switch(synthName) {
    case "polySynth":
      return new Tone.PolySynth(Tone.Synth).toDestination();
    case "monoSynth":
      return new Tone.MonoSynth().toDestination();
    case "amsynth":
      return new Tone.AMSynth().toDestination();
    case "fmsynth":
      return new Tone.FMSynth().toDestination();
    case "membraneSynth":
      return new Tone.MembraneSynth().toDestination();
    case "metalSynth":
      return new Tone.MetalSynth().toDestination();
    case "duoSynth":
      return new Tone.DuoSynth().toDestination();
    case "pluckSynth":
      return new Tone.PluckSynth().toDestination();
    default:
      return new Tone.PolySynth(Tone.Synth).toDestination();
  }
}

function getNextSynthName(synthName) {
  //get the name of the next synth in the synthNames array, wrapping around if needed
  let index = synthNames.indexOf(synthName);
  if(index === synthNames.length - 1){
    return synthNames[0];
  } else {
    return synthNames[index + 1];
  }
}

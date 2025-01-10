//setup music functionality
Tone.Transport.bpm.value = 120;
Tone.Transport.start(); //wait 1 second before starting

const arps = [];
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

let arpIdIndex = 0;
export function addArp(arp) {
  if(getCurrentBeat() == 4) {
    arp.startBeat = 1;
  }
  else {
    arp.startBeat = getCurrentBeat() + 1;
  }

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


//This is the loop fires on a 1m interval
var loop = new Tone.Loop( (time) => {
  document.getElementById("start-button").innerHTML = getCurrentBeat();

    console.log("Playing Arps at beat: " + getCurrentBeat());
    arps.forEach((arp) => {  
      if(arp.startBeat === getCurrentBeat()){
        arp.intervals.forEach((interval, index) => {
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

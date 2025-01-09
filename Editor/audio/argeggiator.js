//setup music functionality
Tone.Transport.bpm.value = 120;
Tone.Transport.start(1); //wait 1 second before starting

const arps = [];
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const timeOffset = .25; //TODO: do better losers

export function addArp(arp) {
  arp.startBeat = getCurrentBeat();
  arps.push(arp)
}

export function start(){
  console.log("Starting Tone");
  Tone.Transport.start();
  loop.start(0);
}

export function stop(){
  Tone.Transport.stop();
} 

//This is the loop fires on a 1m interval
var loop = new Tone.Loop(loopCallback, "8n");

function loopCallback(time){

    console.log("Playing Arps at beat: " + getCurrentBeat());
    arps.forEach((arp) => {    

      if(arp.startBeat === getCurrentBeat()){
        arp.intervals.forEach((interval, index) => {
          if(index === 0){
            synth.triggerAttackRelease(Tone.Frequency(arp.rootNote), "2n", time);
          }
          else {
            synth.triggerAttackRelease(Tone.Frequency(arp.rootNote).transpose(interval), "8n", time + timeOffset * index); 
          }
        });
      }
  });
}

function getCurrentBeat() {
  const position = Tone.Transport.position;
  const [bar, beat, sixteenth] = position.split(":");
  return parseFloat(beat) + 1; // Add 1 to start counting from 1 instead of 0
}

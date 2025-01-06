//setup music functionality
Tone.Transport.bpm.value = 120;
Tone.Transport.start(1); //wait 1 second before starting

const arps = [];
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const timeOffset = .25; //TODO: do better losers

export function addArp(arp) {
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

//This is the loop that fires each time the transport hits the next whole note
//We may want to make this more granular if we decied to not start all arps at 0:0:0
var loop = new Tone.Loop(loopCallback, "1n");

function loopCallback(time){

    console.log("Playing Arps");
    arps.forEach((arp) => {    
      arp.intervals.forEach((interval, index) => {
        if(index === 0){
          synth.triggerAttackRelease(Tone.Frequency(arp.rootNote), "2n", time);
        }
        else {
          synth.triggerAttackRelease(Tone.Frequency(arp.rootNote).transpose(interval), "8n", time + timeOffset * index); 
        }
      });
  });
}

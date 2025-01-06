//setup music functionality
//Tone.Transport.loop = true;
Tone.Transport.bpm.value = 120;
Tone.Transport.start(2);

const arps = [];
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const c4_frequency = 261.626;   // To calculate frequency of notes, we need a datum
const timeOffset = .25; //TODO: do better losers

// helper function to calculate frequency of notes offset from C4
function calculateFrequency(rootNote) {
    var noteFrequency = c4_frequency * Math.pow(2, rootNote / 12);
    return noteFrequency;
  }

// Function to play an arpeggio based on moods-chords object
export function playArp(rootNote, intervals) {
    // console.info('Playing Arp from root note: ' + calculateFrequency(rootNote));
    const now = Tone.now();
    
    
    intervals.forEach((interval, index) => {
        synth.triggerAttackRelease(calculateFrequency(rootNote + interval), "8n", now + timeOffset * index);       
      });
    }

const arpPatterns = [];

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
          synth.triggerAttackRelease(calculateFrequency(arp.rootNote + interval), "2n", time);
        }
        else {
          synth.triggerAttackRelease(calculateFrequency(arp.rootNote + interval), "8n", time + timeOffset * index); 
        }
      });
  });
}

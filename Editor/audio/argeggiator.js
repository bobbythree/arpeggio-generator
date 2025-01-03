import { moods } from "../data/moods-chords.js";

//setup music functionality
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const c4_frequency = 261.626;   // To calculate frequency of notes, we need a datum

//helper function to calculate frequency of notes offset from C4
function calculateFrequency(rootNote) {
    var noteFrequency = c4_frequency * Math.pow(2, rootNote / 12);
    return noteFrequency;
  }

// Function to play an arpeggio based on moods-chords object
export function playArp(rootNote, mood) {
    console.info('Playing Arp from root note: ' + calculateFrequency(rootNote));
    const now = Tone.now();
    var timeOffset = .25;
    const intervals = moods[mood][0].chordIntervals;
    
    intervals.forEach((interval, index) => {
        synth.triggerAttackRelease(calculateFrequency(rootNote + interval), "8n", now + timeOffset * index);
      });
    }

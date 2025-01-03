// To predict next note in a chord, we add 12 to each note in the array
// For example, if the chord is Cmajor, the notes are [0, 4, 7, 12] and the next notes are [12, 16, 19, 24]
export const moods = {
	"happy": [{
			"chordName": "Cmajor9",
			"chordIntervals": [0, 4, 7, 11, 14],
			"rootNoteFreq": 523.251 // C5
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": 261.626 // C4
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": 196 // G3
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNoteFreq": 65.406 // C2
		},
	],
	"sad": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNoteFreq": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNoteFreq": "C2"
		},
	],
	"spooky": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNoteFreq": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNoteFreq": "C2"
		},
	],
	"serene": [{
		"chordName": "Csus4",
		"chordIntervals": [0, 5, 7, 12],
		"rootNoteFreq": "C5"
		},
		{
			"chordName": "F5",
			"chordIntervals": [0, 7],
			"rootNoteFreq": "F4"
		},
		{
			"chordName": "COctave",
			"chordIntervals": [0, 12],
			"rootNoteFreq": "C2"
		},
	],
	"nostalgic": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNoteFreq": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNoteFreq": "C2"
		},
	],
	"angry": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNoteFreq": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNoteFreq": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNoteFreq": "C2"
		},
	],
}

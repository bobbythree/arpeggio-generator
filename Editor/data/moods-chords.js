// To predict next note in a chord, we add 12 to each note in the array
// For example, if the chord is Cmajor, the notes are [0, 4, 7, 12] and the next notes are [12, 16, 19, 24]
export const moods = {
	"happy": [{
			"chordName": "Cmajor9",
			"chordIntervals": [0, 4, 7, 11, 14],
			"rootNote": 12 // C5
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": 0 // C4
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": -5 // G3
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNote": -24 // C2
		},
	],
	"sad": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNote": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNote": "C2"
		},
	],
	"spooky": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNote": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNote": "C2"
		},
	],
	"serene": [{
		"chordName": "Csus4",
		"chordIntervals": [0, 5, 7, 12],
		"rootNote": "C5"
		},
		{
			"chordName": "F5",
			"chordIntervals": [0, 7],
			"rootNote": "F4"
		},
		{
			"chordName": "COctave",
			"chordIntervals": [0, 12],
			"rootNote": "C2"
		},
	],
	"nostalgic": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNote": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNote": "C2"
		},
	],
	"angry": [{
		"chordName": "Cmajor9",
		"chordIntervals": [0, 4, 7, 11, 14],
		"rootNote": "C5"
		},
		{
			"chordName": "Cmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		{
			"chordName": "Gmajor",
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		{
			"chordName": "C5",
			"chordIntervals": [0, 7],
			"rootNote": "C2"
		},
	],
}

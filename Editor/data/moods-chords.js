// To predict next note in a chord, we add 12 to each note in the array
// For example, if the chord is Cmajor, the notes are [0, 4, 7, 12] and the next notes are [12, 16, 19, 24]
export const moods = {
	"happy":  {
		"Cmajor9" : {
			"chordIntervals": [0, 4, 7, 11, 14],
			"rootNote": 12 // C5
		},
		"Cmajor": {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": 0 // C4
		},
		"Gmajor" : {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": -5 // G3
		},
		"C5" : {
			"chordIntervals": [0, 7],
			"rootNote": -24 // C2
		},
	},
	"sad": {
		"Cmajor9" : {
			"chordIntervals": [0, 4, 7, 11, 14],
			"rootNote": 12 // C5
		},
		"Cmajor": {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": 0 // C4
		},
		"Gmajor" : {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": -5 // G3
		},
		"C5" : {
			"chordIntervals": [0, 7],
			"rootNote": -24 // C2
		},
	},
	"spooky": {
		"Cmajor9" : {
			"chordIntervals": [0, 4, 7, 11, 14],
			"rootNote": 12 // C5
		},
		"Cmajor": {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": 0 // C4
		},
		"Gmajor" : {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": -5 // G3
		},
		"C5" : {
			"chordIntervals": [0, 7],
			"rootNote": -24 // C2
		},
	},
	"serene": {
		"Csus4" :{
			"chordIntervals": [0, 5, 7, 12],
			"rootNote": "C5"
		},
		"F5" : {
			"chordIntervals": [0, 7],
			"rootNote": "F4"
		},
		"COctave" : {
			"chordIntervals": [0, 12],
			"rootNote": "C2"
		},
	},
	"nostalgic": {
		"Cmajor9" : {
			"chordIntervals": [0, 4, 7, 11, 14],
			"rootNote": 12 // C5
		},
		"Cmajor": {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": 0 // C4
		},
		"Gmajor" : {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": -5 // G3
		},
		"C5" : {
			"chordIntervals": [0, 7],
			"rootNote": -24 // C2
		},
	},
	"angry": {
		"Cmajor9" : {
			"chordIntervals": [0, 4, 7, 11, 14],
			"rootNote": 12 // C5
		},
		"Cmajor": {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": 0 // C4
		},
		"Gmajor" : {
			"chordIntervals": [0, 4, 7, 12],
			"rootNote": -5 // G3
		},
		"C5" : {
			"chordIntervals": [0, 7],
			"rootNote": -24 // C2
		},
	},
}

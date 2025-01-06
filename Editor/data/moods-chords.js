// To predict next note in a chord, we add 12 to each note in the array
// For example, if the chord is Cmajor, the notes are [0, 4, 7, 12] and the next notes are [12, 16, 19, 24]
export const moods = {
	"happy":  {
		"Cmajor9" : {
			"chordIntervalsSemiTones": [0, 4, 7, 11, 14],
			"rootNote": "C5"
		},
		"Cmajor": {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		"Gmajor" : {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C2"
		},
	},
	"sad": {
		"Cmajor9" : {
			"chordIntervalsSemiTones": [0, 4, 7, 11, 14],
			"rootNote": "C5"
		},
		"Cmajor": {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		"Gmajor" : {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C2"
		},
	},
	"spooky": {
		"Cmajor9" : {
			"chordIntervalsSemiTones": [0, 4, 7, 11, 14],
			"rootNote": "C5"
		},
		"Cmajor": {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		"Gmajor" : {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C2"
		},
	},
	"serene": {
		"Csus4" :{
			"chordIntervalsSemiTones": [0, 5, 7, 12],
			"rootNote": "C5"
		},
		"F5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "F4"
		},
		"COctave" : {
			"chordIntervalsSemiTones": [0, 12],
			"rootNote": "C2"
		},
	},
	"nostalgic": {
		"Cmajor9" : {
			"chordIntervalsSemiTones": [0, 4, 7, 11, 14],
			"rootNote": "C5"
		},
		"Cmajor": {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		"Gmajor" : {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C2"
		},
	},
	"angry": {
		"Cmajor9" : {
			"chordIntervalsSemiTones": [0, 4, 7, 11, 14],
			"rootNote": "C5"
		},
		"Cmajor": {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "C4"
		},
		"Gmajor" : {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "G3"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C2"
		},
	},
}

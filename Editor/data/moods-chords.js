// To predict next note in a chord, we add 12 to each note in the array
// For example, if the chord is Cmajor, the notes are [0, 4, 7, 12] and the next notes are [12, 16, 19, 24]
export const moods = {
	"happy":  {
		"Cmajor9" : {
			"chordIntervalsSemiTones": [0, 4, 7, 11, 14],
			"rootNote": "C5"
		},
		"Gmajor" : {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "G4"
		},
		"Cmajor": {
			"chordIntervalsSemiTones": [0, 4, 7, 12],
			"rootNote": "C3"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C2"
		},
	},
	"sad": {
		"Cminor9" : {
			"chordIntervalsSemiTones": [0, 7, 14, 15, 19],
			"rootNote": "C5"
		},
		"Cminor": {
			"chordIntervalsSemiTones": [0, 3, 7, 12],
			"rootNote": "C4"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "G3"
		},
		"COctave" : {
			"chordIntervalsSemiTones": [0, 12],
			"rootNote": "C2"
		},
	},
	"spooky": {
		"CWholetone": {
			"chordIntervalsSemiTones": [0, 2, 4, 6, 8, 10, 12],
			"rootNote": "C4"
		},
		"CWholetone" : {
			"chordIntervalsSemiTones": [0, 2, 4, 6, 8, 10, 12],
			"rootNote": "C3"
		},
		"COctave" : {
			"chordIntervalsSemiTones": [0, 0, 0, 12],
			"rootNote": "C2"
		},
	},
	"serene": {
		"C7sus4" :{
			"chordIntervalsSemiTones": [0, 7, 10, 17, 19],
			"rootNote": "C5"
		},
		"Csus4": {
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
		"Cmajor7" : {
			"chordIntervalsSemiTones": [0, 7, 11, 16],
			"rootNote": "C5"
		},
		"Csus2": {
			"chordIntervalsSemiTones": [0, 7, 14],
			"rootNote": "C4"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C2"
		},
	},
	"angry": {
		"CminorMajor7" : {
			"chordIntervalsSemiTones": [0, 7, 11, 15, 19],
			"rootNote": "C3"
		},
		"C5" : {
			"chordIntervalsSemiTones": [0, 7],
			"rootNote": "C4"
		},
		"COctave" : {
			"chordIntervalsSemiTones": [0, 12],
			"rootNote": "C2"
		},
	},
}

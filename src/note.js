export const scales = {
  C: {
    pentatonic: ["C4","D4","E4","G4","A4"],
    major: ["C4","D4","E4","F4","G4","A4","B4"],
    minor: ["C4","D4","Eb4","F4","G4","Ab4","Bb4"],
    blues: ["C4","Eb4","F4","F#4","G4","Bb4"]
  },

  G: {
    pentatonic: ["G3","A3","B3","D4","E4"],
    major: ["G3","A3","B3","C4","D4","E4","F#4"],
    minor: ["G3","A3","Bb3","C4","D4","Eb4","F4"],
    blues: ["G3","Bb3","C4","C#4","D4","F4"]
  },

  D: {
    pentatonic: ["D4","E4","F#4","A4","B4"],
    major: ["D4","E4","F#4","G4","A4","B4","C#5"],
    minor: ["D4","E4","F4","G4","A4","Bb4","C5"],
    blues: ["D4","F4","G4","G#4","A4","C5"]
  },

  A: {
    pentatonic: ["A3","B3","C#4","E4","F#4"],
    major: ["A3","B3","C#4","D4","E4","F#4","G#4"],
    minor: ["A3","B3","C4","D4","E4","F4","G4"],
    blues: ["A3","C4","D4","D#4","E4","G4"]
  },

  E: {
    pentatonic: ["E4","F#4","G#4","B4","C#5"],
    major: ["E4","F#4","G#4","A4","B4","C#5","D#5"],
    minor: ["E4","F#4","G4","A4","B4","C5","D5"],
    blues: ["E4","G4","A4","A#4","B4","D5"]
  },

  B: {
    pentatonic: ["B3","C#4","D#4","F#4","G#4"],
    major: ["B3","C#4","D#4","E4","F#4","G#4","A#4"],
    minor: ["B3","C#4","D4","E4","F#4","G4","A4"],
    blues: ["B3","D4","E4","F4","F#4","A4"]
  },

  F: {
    pentatonic: ["F4","G4","A4","C5","D5"],
    major: ["F4","G4","A4","Bb4","C5","D5","E5"],
    minor: ["F4","G4","Ab4","Bb4","C5","Db5","Eb5"],
    blues: ["F4","Ab4","Bb4","B4","C5","Eb5"]
  },

  Bb: {
    pentatonic: ["Bb3","C4","D4","F4","G4"],
    major: ["Bb3","C4","D4","Eb4","F4","G4","A4"],
    minor: ["Bb3","C4","Db4","Eb4","F4","Gb4","Ab4"],
    blues: ["Bb3","Db4","Eb4","E4","F4","Ab4"]
  },

  Eb: {
    pentatonic: ["Eb4","F4","G4","Bb4","C5"],
    major: ["Eb4","F4","G4","Ab4","Bb4","C5","D5"],
    minor: ["Eb4","F4","Gb4","Ab4","Bb4","Cb5","Db5"],
    blues: ["Eb4","Gb4","Ab4","A4","Bb4","Db5"]
  },

  Ab: {
    pentatonic: ["Ab3","Bb3","C4","Eb4","F4"],
    major: ["Ab3","Bb3","C4","Db4","Eb4","F4","G4"],
    minor: ["Ab3","Bb3","Cb4","Db4","Eb4","Fb4","Gb4"],
    blues: ["Ab3","Cb4","Db4","D4","Eb4","Gb4"]
  },

  Db: {
    pentatonic: ["Db4","Eb4","F4","Ab4","Bb4"],
    major: ["Db4","Eb4","F4","Gb4","Ab4","Bb4","C5"],
    minor: ["Db4","Eb4","Fb4","Gb4","Ab4","A4","B4"],
    blues: ["Db4","Fb4","Gb4","G4","Ab4","B4"]
  },

  "F#": {
    pentatonic: ["F#4","G#4","A#4","C#5","D#5"],
    major: ["F#4","G#4","A#4","B4","C#5","D#5","E#5"],
    minor: ["F#4","G#4","A4","B4","C#5","D5","E5"],
    blues: ["F#4","A4","B4","C5","C#5","E5"]
  }
};

export function getNoteForMove(move, key, scale) {
    const moveOrder = ["R","R'","L","L'","U","U'","D","D'","F","F'","B","B'"];
    const index = moveOrder.indexOf(move);
    if (index === -1) return null;

    const notes = scales[key]?.[scale];
    if (!notes) return null;

    return notes[index % notes.length];
}
import * as Tone from "tone";
import { asyncCreateInstrument, Instrument } from "./create-instrument";


const notesAssociation = [
  "C3",
  "D3",
  "E3",
  "F3",
  "G3",
  "A3",
  "B3"
];

const minorChordsAssociation = [
  ["C3", "Eb3", "G3"],   // Do (C), Mi♭ (E♭), Sol (G)
  ["D3", "F3", "A3"],   // Ré (D), Fa (F), La (A)
  ["E3", "G3", "B3"],   // Mi (E), Sol (G), Si (B)
  ["F3", "Ab3", "C3"],  // Fa (F), La♭ (A♭), Do (C)
  ["G3", "Bb3", "D3"],   // Sol (G), Si♭ (B♭), Ré (D)
  ["A3", "C3", "E3"],   // La (A), Do (C), Mi (E)
  ["B3", "D3", "F#3"],   // Si (B), Ré (D), Fa♯ (F♯)
];

// https://tonejs.github.io/docs/14.7.77/type/Subdivision
const notesDuration = [
  "2n",
  "4n",
  "4n",
  "4n",
  "8n",
  "8n",
  "8n"
];

export const makePlayer = (onCursorChange?: (val: number) => void) => {
  const notes: {current:number[]} = {current:[]};
  let cursor = 0;
  let isPlaying = false;

  let currentInstrument: Instrument;
  let currentChordInstrument: Instrument;
  let loop:Tone.Loop | undefined; 
  let chordsLoop:Tone.Loop | undefined;

  const play = () => {
    loop = new Tone.Loop((time) => {
      const headNote = notes.current[cursor % notes.current.length];
      const nextNote = notes.current[(cursor+1) % notes.current.length];
      if( headNote !== undefined) {
          let duration = "4n";
          if(nextNote !== undefined) {
              duration = notesDuration[nextNote];
          }
          currentInstrument?.triggerAttackRelease(notesAssociation[headNote], duration, time);
          if(loop) {
              loop.interval = duration;
          }
          cursor ++;
          onCursorChange?.(cursor);
      }
      }, "4n").start(0);

    chordsLoop = new Tone.Loop((time) => {
      const headNote = notes.current[cursor % notes.current.length];
      currentChordInstrument?.triggerAttackRelease(minorChordsAssociation[headNote], "2n", time);
    }, "1n").start(0);

    Tone.getTransport().bpm.value = 157 //157
    Tone.getTransport().start();
  }

  const pause = () => {
    loop?.stop();
    chordsLoop?.stop();
    Tone.getTransport().stop();
    Tone.getTransport().position = 0;
    Tone.getTransport().cancel();
    loop = undefined;
    chordsLoop = undefined;
  }

  const setNotes = (newNotes: number[]) => {
    if(newNotes !== notes.current) {
      notes.current = newNotes;
      cursor = 0;
      onCursorChange?.(cursor);
    }
  };
  const setChord=  async (inst: string) => {
    currentInstrument = undefined;
    currentInstrument = await asyncCreateInstrument(inst);
  };
  const setInstrument = async (inst: string) => {
    currentChordInstrument = undefined;
    currentChordInstrument = await asyncCreateInstrument(inst);
  };
  const setIsPlaying = (val: boolean) => {
    if(val  !== isPlaying) {
      isPlaying = val;
      if(isPlaying) {
        play();
      } else {
        pause();
      }
    }
  };
  const reset = () => {
    setIsPlaying(false);
    cursor = 0;
    onCursorChange?.(cursor);
  };

  setChord('guitar-acoustic');
  setInstrument('guitar-acoustic');

  return {
    setNotes,
    setChord,
    setInstrument,
    setIsPlaying,
    reset,
  }
}

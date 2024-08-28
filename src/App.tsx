import { useState, useMemo } from 'react';
import './App.css'
import {ConstantSelection, Constant } from './ConstantSelection';
import { Notes } from './Notes';
import { Player } from './Player';
import { InstrumentSelector } from './InstrumentSelector';

import piSon from './assets/pi.json'
import eSon from './assets/e.json'
import phiSon from './assets/phi.json'
import { makePlayer } from './lib/music-player';

function moduloSlice<T>(arr: T[], start: number, length: number) {
  if(arr.length === 0) {
    return [];
  }
  const result = arr.slice(start % arr.length, (start % arr.length) + length);
  while(result.length < length) {
    result.push( ...arr.slice(0, length - result.length) );
  }
  return result;
}

function loadSheet(constant: Constant, base:number) {
  const numbers =
    constant === 'e' ? eSon.number :
    constant === 'pi' ? piSon.number :
    phiSon.number;
  const result: number[] = [];
  for ( let i = 0; i < numbers.length; i++) {
      const nums = Number(numbers[i]).toString(base);
      for(let n = 0 ; n < nums.length; n++) {
        result.push(Number(nums[n]))
      }
  }
  return result;
}

export function App() {
  const [constant, setConstant] = useState<Constant>();
  const [, setCurrentInstrumentId] = useState<string>()
  const [, setCurrentChordInstrumentId] = useState<string>()
  const [paused, setPaused] = useState(true);
  const [cursor, setCursor] = useState(0);

  const base = 7;
  const displayedNotesCount = 10;
  const notes = useMemo(() => constant ? loadSheet(constant, base) : [], [constant]);
  const displayedNotes = moduloSlice(notes, cursor, cursor + displayedNotesCount);

  const musicPlayer = useMemo(() => makePlayer(setCursor), []);

  musicPlayer.setNotes(notes);

  const handleConstantChange = (newConst: Constant) => {
    setConstant(newConst);
  };

  const handleInstrumentChange = (newInst: string) => {
    setCurrentInstrumentId(newInst);
    musicPlayer.setInstrument(newInst);
  };

  const handleChordChange = (newChord: string) => {
    setCurrentChordInstrumentId(newChord);
    musicPlayer.setChord(newChord);
  };

  const handlePlay = () => {
    if(constant) {
      setPaused(false);
      musicPlayer.setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setPaused(true);
    musicPlayer.setIsPlaying(false);
  };

  const handleReset = () => {
    setPaused(true);
    musicPlayer.reset();
  };

  return (
    <div className="main">
      <h1>Sound of Math</h1>
      {/* <BaseSelection /> */}
      <ConstantSelection constant={constant} onConstantChange={handleConstantChange} />
      {/* Component to Display the note currently played as a number and as a note */}
      <Notes notes={displayedNotes} count={displayedNotesCount}/>
      {/* contains the play / pause / stop buttons and actually play the audio */}
      <Player onPlay={handlePlay} onPause={handlePause} onReset={handleReset} playing={!paused} />
      <InstrumentSelector onChordChange={handleChordChange} onInstrumentChange={handleInstrumentChange} />

      <div className="links">
        <a href="https://github.com/Coleim/SoundOfPi">Source code</a>
        <a href="https://www.youtube.com/watch?v=oRqzqRZCOB0">How I did it</a>
      </div>

    </div>
  )
}


import { useState } from 'react'

import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'

import * as Tone from "tone";

import './App.css'

function App() {

const [notes, setNotes] = useState([

{ note: "C4", duration: "8n"} ,

{ note: "D4", duration: "4n"},

{ note: "E4", duration: "4n"},

{ note: "F4", duration: "8n"},

{ note: "G4", duration: "8n"},

{ note: "A4", duration: "1n"},

{ note: "B4", duration: "4n"},

{ note: "C5", duration: "8n"}]);

let loop = null;

function setDuration(duration) {

loop.interval = duration;

}

function pushNotes() {

setNotes([...notes, { note: "C4", duration: "8n"} ,

{ note: "D4", duration: "4n"},

{ note: "E4", duration: "4n"},

{ note: "F4", duration: "8n"},

{ note: "G4", duration: "8n"},

{ note: "A4", duration: "1n"},

{ note: "B4", duration: "4n"},

{ note: "C5", duration: "8n"}]);

}

let index = 0;

const synth = new Tone.Synth().toDestination();

function playSound() {

console.log(loop?.state);

if(!loop || loop.state === "stopped") {

loop = new Tone.Loop(function(time){

console.log("Looping: ", time);

if(notes.length == 0) {

loop.stop();

return;

}

console.log("Playing sound: " , index, " : ", notes[0].note, " : ", notes[0].duration);

//triggered every eighth note.

synth.triggerAttackRelease(notes[0].note, notes[0].duration, time);

loop.interval = notes[0].duration;

notes.shift();

}, "8n").start(0);

Tone.getTransport().start();

}

// C, D, E, F, G, A, B, C

}

return (

<>

<div>

<a href="https://vitejs.dev" target="_blank">

<img src={viteLogo} className="logo" alt="Vite logo" />

</a>

<a href="https://react.dev" target="_blank">

<img src={reactLogo} className="logo react" alt="React logo" />

</a>

</div>

<h1>Vite + React</h1>

<h2> {JSON.stringify(notes, null, 2) }</h2>

<div className="card">

<button onClick={() => playSound()}>

Play { index }

</button>

<button onClick={() => setDuration("4n")}>

4n

</button>

<button onClick={() => setDuration("8n")}>

8n

</button>

<button onClick={() => pushNotes()}>

Push Notes

</button>

<p>

Edit <code>src/App.tsx</code> and save to test HMR

</p>

</div>

<p className="read-the-docs">

Click on the Vite and React logos to learn more

</p>

</>

)

}

export default App
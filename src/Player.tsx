import './Player.css'
import * as Tone from "tone";
import { useStore } from "@tanstack/react-store";
import { musicSheet, startMusic, stopMusic } from './music-sheet';
import { popNote } from './music-sheet';
import { FaPlay, FaPause, FaStop } from "react-icons/fa6";
import { useEffect, useRef, useState } from 'react';

function Player() {

    const notes = useStore(musicSheet, (state) => state.notes.first(10))
    const playing = useStore(musicSheet, (state) => state.playing)
    const [paused, setPaused] = useState(true)
    const headNote: any = useRef(notes.at(0))
    const nextNote: any = useRef(notes.at(1))
    const loop: any = useRef(undefined)
    const currentInstrument: any = useRef()
    const currentChordInstrument: any = useRef()
    const chordsLoop: any = useRef(undefined)
    const pausedRef = useRef(paused)
    
    useEffect(() => {
        changeChordInstrument('guitar-acoustic');
        changeInstrument('guitar-acoustic');
    }, [])

    useEffect(() => {
        headNote.current = notes.at(0)
        nextNote.current = notes.at(1)
    }, [notes])

    useEffect(() => {
        if(playing) {
            setPaused(false)
            pausedRef.current = false;
            play()
        } else {
            setPaused(true)
            pausedRef.current = true
            stop()
        }
    }, [playing])

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

    function play() {
        if(notes.length === 0) return;
        if (!loop.current || loop.current.state === "stopped") {
            loop.current = new Tone.Loop(function (time) {
                if(!pausedRef.current) {
                    if( headNote.current !== undefined) {
                        let duration = "4n";
                        if(nextNote.current !== undefined) {
                            duration = notesDuration[nextNote.current];
                        }
                        currentInstrument.current.triggerAttackRelease(notesAssociation[headNote.current], duration, time);
                        loop.current.interval = duration;
                        popNote();
                    } else {
                        stop();
                    }
                }
            }, "4n").start(0);

            chordsLoop.current = new Tone.Loop(function (time) {
                if( !pausedRef.current && headNote.current !== undefined) {
                    currentChordInstrument.current.triggerAttackRelease(minorChordsAssociation[headNote.current], "2n", time);
                }
            }, "1n").start(0);

            Tone.getTransport().bpm.value = 157 //157
            Tone.getTransport().start();
        }
    }

    function pause() {
        setPaused(true);
        pausedRef.current = true;
    }
    function unpause() {
        setPaused(false);
        pausedRef.current = false;
    }

    function stop() {
        setPaused(false);
        pausedRef.current = false;
        if (loop.current && loop.current.state === "started") {
            loop.current.stop();
            chordsLoop.current.stop();
            Tone.getTransport().stop();
            Tone.getTransport().position = 0;
            Tone.getTransport().cancel();
        }
    }


    function changeChordInstrument(instrument: string) {
        pause();
        currentChordInstrument.current = createInstrument(instrument);
    }
    function changeInstrument(instrument: string) {
        pause();
        currentInstrument.current = createInstrument(instrument);
    }
    function createInstrument(instrument: string) {
        switch(instrument) {
            case 'guitar-acoustic':
                return create('guitar-acoustic');
            case 'guitar-electric':
                return create('guitar-electric');
            case 'guitar-nylon':
                return createGuitarNylon();
            case 'piano':
                return create('piano');
            case 'harp':
                return create('harp');
            case 'violin':
                return createViolin();
            case 'bassoon':
                return create('bassoon');
            case 'saxophone':
                return createSaxophone();
            case 'xylophone':
                return createXylophone();
            case 'organ':
                return create('organ');
            case "Tone.Synth":
                unpause();
                return new Tone.PolySynth(Tone.Synth).toDestination();
            case "Tone.AMSynth":
                unpause();
                return new Tone.PolySynth(Tone.AMSynth).toDestination();
            case "Tone.FMSynth":
                unpause();
                return new Tone.PolySynth(Tone.FMSynth).toDestination();
            case "Tone.MembraneSynth":
                unpause();
            return new Tone.MembraneSynth().toDestination();
            case "Tone.MetalSynth":
                unpause();
                return new Tone.MetalSynth().toDestination();
            case "Tone.MonoSynth":
                unpause();
                return new Tone.MonoSynth().toDestination();
            case "Tone.PluckSynth":
                unpause();
                return new Tone.PluckSynth().toDestination();
            case "Tone.PolySynth":
                unpause();
                return new Tone.PolySynth().toDestination();
        }
        
    }

    function create(instrument: string) {

        return new Tone.Sampler({
            urls: {
                C3: "C3.mp3"
            },
            release: 1,
            baseUrl: "https://coleim.github.io/tonejs-instruments/samples/" + instrument + "/",
            onload: () => {
                unpause();
            }
        }).toDestination();
    }
    function createGuitarNylon() {
        return new Tone.Sampler({
            urls: {
                C3: "Cs3.mp3",
                F3: "Fs3.mp3"
            },
            release: 1,
            baseUrl: "https://coleim.github.io/tonejs-instruments/samples/guitar-nylon/",
            onload: () => {
                unpause();
            }
        }).toDestination();
    }
    function createViolin() {
        return new Tone.Sampler({
            urls: {
                'A3': 'A3.[mp3|ogg]',
                'A4': 'A4.[mp3|ogg]',
                'A5': 'A5.[mp3|ogg]',
                'A6': 'A6.[mp3|ogg]',
                'C4': 'C4.[mp3|ogg]',
                'C5': 'C5.[mp3|ogg]',
                'C6': 'C6.[mp3|ogg]',
                'C7': 'C7.[mp3|ogg]',
                'E4': 'E4.[mp3|ogg]',
                'E5': 'E5.[mp3|ogg]',
                'E6': 'E6.[mp3|ogg]',
                'G4': 'G4.[mp3|ogg]',
                'G5': 'G5.[mp3|ogg]',
                'G6': 'G6.[mp3|ogg]'
            },
            release: 1,
            baseUrl: "https://coleim.github.io/tonejs-instruments/samples/violin/",
            onload: () => {
                unpause();
            }
        }).toDestination();
    }

    function createSaxophone() {
        return new Tone.Sampler({
            urls: {
                'D#5': 'Ds5.[mp3|ogg]',
                'E3': 'E3.[mp3|ogg]',
                'E4': 'E4.[mp3|ogg]',
                'E5': 'E5.[mp3|ogg]',
                'F3': 'F3.[mp3|ogg]',
                'F4': 'F4.[mp3|ogg]',
                'F5': 'F5.[mp3|ogg]',
                'F#3': 'Fs3.[mp3|ogg]',
                'F#4': 'Fs4.[mp3|ogg]',
                'F#5': 'Fs5.[mp3|ogg]',
                'G3': 'G3.[mp3|ogg]',
                'G4': 'G4.[mp3|ogg]',
                'G5': 'G5.[mp3|ogg]',
                'G#3': 'Gs3.[mp3|ogg]',
                'G#4': 'Gs4.[mp3|ogg]',
                'G#5': 'Gs5.[mp3|ogg]',
                'A4': 'A4.[mp3|ogg]',
                'A5': 'A5.[mp3|ogg]',
                'A#3': 'As3.[mp3|ogg]',
                'A#4': 'As4.[mp3|ogg]',
                'B3': 'B3.[mp3|ogg]',
                'B4': 'B4.[mp3|ogg]',
                'C4': 'C4.[mp3|ogg]',
                'C5': 'C5.[mp3|ogg]',
                'C#3': 'Cs3.[mp3|ogg]',
                'C#4': 'Cs4.[mp3|ogg]',
                'C#5': 'Cs5.[mp3|ogg]',
                'D3': 'D3.[mp3|ogg]',
                'D4': 'D4.[mp3|ogg]',
                'D5': 'D5.[mp3|ogg]',
                'D#3': 'Ds3.[mp3|ogg]',
                'D#4': 'Ds4.[mp3|ogg]'
            },
            release: 1,
            baseUrl: "https://coleim.github.io/tonejs-instruments/samples/saxophone/",
            onload: () => {
                unpause();
            }
        }).toDestination();
    }

    function createXylophone() {
        return new Tone.Sampler({
            urls: {
                'C8': 'C8.[mp3|ogg]',
                'G4': 'G4.[mp3|ogg]',
                'G5': 'G5.[mp3|ogg]',
                'G6': 'G6.[mp3|ogg]',
                'G7': 'G7.[mp3|ogg]',
                'C5': 'C5.[mp3|ogg]',
                'C6': 'C6.[mp3|ogg]',
                'C7': 'C7.[mp3|ogg]'
            },
            release: 1,
            baseUrl: "https://coleim.github.io/tonejs-instruments/samples/xylophone/",
            onload: () => {
                unpause();
            }
        }).toDestination();
    }

    return (
        <>
            { !playing ? 
                <button onClick={ startMusic }><FaPlay /></button>
                :
                    paused ? <button onClick={ unpause }><FaPlay /></button> 
                    : <button onClick={ pause }><FaPause /></button>
            }
            <button onClick={ stopMusic }><FaStop /></button>

            <div>
                <h3>Select Instrument</h3>
                <select onChange={(e) => changeInstrument(e.target.value)}>
                    <option value="guitar-acoustic">Guitar Acoustic</option>
                    <option value="guitar-electric">Guitar Electric</option>
                    <option value="guitar-nylon">Guitar Nylon</option>
                    <option value="piano">Piano</option>
                    <option value="harp">Harp</option>
                    <option value="violin">Violin</option>
                    <option value="bassoon">Bassoon</option>
                    <option value="saxophone">Saxophone</option>
                    <option value="xylophone">Xylophone</option>
                    <option value="organ">Organ</option>
                    <option value="Tone.Synth">Tone.Synth</option>
                    <option value="Tone.AMSynth">Tone.AMSynth</option>
                    <option value="Tone.FMSynth">Tone.FMSynth</option>
                    <option value="Tone.MembraneSynth">Tone.MembraneSynth</option>
                    <option value="Tone.MetalSynth">Tone.MetalSynth</option>
                    <option value="Tone.MonoSynth">Tone.MonoSynth</option>
                    <option value="Tone.PluckSynth">Tone.PluckSynth</option>
                    <option value="Tone.PolySynth">Tone.PolySynth</option>
                </select>
                <h3 className="mt">Select Chord Instrument</h3>
                <select onChange={(e) => changeChordInstrument(e.target.value)}>
                    <option value="guitar-acoustic">Guitar Acoustic</option>
                    <option value="guitar-electric">Guitar Electric</option>
                    <option value="guitar-nylon">Guitar Nylon</option>
                    <option value="piano">Piano</option>
                    <option value="harp">Harp</option>
                    <option value="violin">Violin</option>
                    <option value="bassoon">Bassoon</option>
                    <option value="saxophone">Saxophone</option>
                    <option value="xylophone">Xylophone</option>
                    <option value="organ">Organ</option>
                </select>
            </div>
        </>
    )
}

export default Player





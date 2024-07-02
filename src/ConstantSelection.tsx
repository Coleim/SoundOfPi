import { resetMusicSheet, stopMusic, updateMusicSheet } from "./music-sheet"
import { base } from "./base"
import { musicSheet } from "./music-sheet"
import { useStore } from "@tanstack/react-store"
import { useEffect, useRef, useState } from "react"

import './ConstantSelection.css'
import piLogo from './assets/Pi-symbol.png'
import expoLogo from './assets/expo.png'
import phiLogo from './assets/nombre-d-or-phi-01.png'

import piSon from './assets/pi.json'
import eSon from './assets/e.json'
import phiSon from './assets/phi.json'


function ConstantSelection() {

    const currentBase: number = useStore(base, (state) => state.currentBase);
    const queueSize: number = useStore(musicSheet, (state) => state.notes.size);
    const playing: boolean = useStore(musicSheet, (state) => !!state.playing);
    const [sheet, setSheet] = useState();
    const [loading] = useState(false);
    const lastIndexLoaded = useRef(0)

    function convertBase10ToBase(number: number, base: number): string[] {
        return number.toString(base).split("")
    }

    useEffect(() => {
        if(sheet === undefined) return
        if(!playing) load(sheet)
    }, [playing])

    useEffect(() => {
        if(loading) return
        if(sheet === undefined) return
        if(queueSize < 20) {
            loadChunk(sheet)
        }
    }, [queueSize])

    function load(sheet: any) {
        setSheet(sheet)
        resetMusicSheet()
        stopMusic()
        lastIndexLoaded.current = 0
        loadChunk(sheet)
    }

    function loadChunk(sheet: any) {
        const steps = 200
        const maxLen = sheet.number.length > (lastIndexLoaded.current+steps) ? (lastIndexLoaded.current+steps) : sheet.number.length
        console.log(sheet.number.length)
        console.log(maxLen)
        let numsToInsert = [];
        for ( let i = 0 + lastIndexLoaded.current; i < maxLen; i++) {
            const nums = convertBase10ToBase(Number(sheet.number[i]), currentBase);
            for(let n = 0 ; n < nums.length; n++) {
                numsToInsert.push(Number(nums[n]))
            }
        }
        updateMusicSheet(numsToInsert)
        lastIndexLoaded.current = lastIndexLoaded.current + steps
    }
    return (
        <div className="all-constants">
            <div className="constant-container">
                <button className="const-btn">
                    <img src={piLogo} onClick={ () => load(piSon) }/>
                </button>
                <span>Pi</span>
            </div>
            <div className="constant-container">
                <button className="const-btn">
                    <img src={expoLogo} onClick={ () => load(eSon) }/>
                </button>
                <span>Exponentielle</span>
            </div>
            <div className="constant-container">
                <button className="const-btn">
                    <img src={phiLogo} onClick={ () => load(phiSon) }/>
                </button>
                <span>Nombre d'or</span>
            </div>
        </div>
    )
}

export default ConstantSelection
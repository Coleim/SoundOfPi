import { resetMusicSheet, updateMusicSheet } from "./music-sheet"
import './ConstantSelection.css'
import piLogo from './assets/Pi-symbol.png'
import expoLogo from './assets/expo.png'
import phiLogo from './assets/nombre-d-or-phi-01.png'

// import piSon from './assets/pi.json'
import piSon from './assets/pi_small.json'
import eSon from './assets/e_small.json'
import phiSon from './assets/phi_small.json'
import { base } from "./base"
import { useStore } from "@tanstack/react-store"


function ConstantSelection() {

    const currentBase: number = useStore(base, (state) => state.currentBase);

    function convertBase10ToBase(number: number, base: number): string[] {
        return number.toString(base).split("")
    }

    function load(sheet: any) {
        resetMusicSheet()
        for ( let i = 0; i < sheet.number.length; i++) {
            const nums = convertBase10ToBase(Number(sheet.number[i]), currentBase);
            nums.forEach((num) => updateMusicSheet(Number(num)))
           // updateMusicSheet()
        }
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
            {/* <div className="constant-container">
                <button className="const-btn">
                    <img src={phiLogo} onClick={ loadPI }/>
                </button>
                <span>Le nombre d'or</span>
            </div> */}
            {/* <button className="pi-btn">
            Feigenbaum (δδ
                <img src={piLogo} onClick={ loadPI }/>
            </button>
            <button className="pi-btn">
            Euler-Mascheroni (γγ)
                <img src={piLogo} onClick={ loadPI }/>
            </button> */}
        </div>
    )
}

export default ConstantSelection
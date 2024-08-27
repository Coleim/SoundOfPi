import './Player.css'
import { FaPlay, FaPause, FaStop } from "react-icons/fa6";

export type PlayerProps = {
    onPlay:()=> void;
    onPause:()=> void;
    onReset:()=> void;
    playing: boolean;
};

export function Player({onPlay, onPause, onReset, playing}: PlayerProps) {
    return (
        <>
            { playing ? 
                <button onClick={onPause}><FaPause /></button>
                :<button onClick={onPlay}><FaPlay /></button>
            }
            <button onClick={ onReset }><FaStop /></button>
        </>
    )
}




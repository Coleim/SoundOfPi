import { useStore } from '@tanstack/react-store';
import { musicSheet } from './music-sheet';
import './Notes.css'

function Notes() {
    const displayNoteCount = 10;
    const first: number[] = useStore(musicSheet, (state) => state.notes.first(displayNoteCount));

    function notes() {
        const rows = [];
        for (let i = 0; i < displayNoteCount; i++) {
            if(first.at(i) === undefined) {
                rows.push(<span className='number-note' key={i}>_</span>);
            } else {
                rows.push(<span className='number-note' key={i}>{first.at(i)}</span>);                
            }
        }
        return rows
    }
    return (
        <>
            <div className='container'>
                <div className='notes'>
                    { notes() }
                </div>
            </div>
        </>
    )
}

export default Notes
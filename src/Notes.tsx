import './Notes.css'

export type NotesProps = {notes: number[], count:number};

export function Notes({notes, count}: NotesProps) {
    const rows = [];
    for (let i = 0; i < count; i++) {
        if(notes.at(i) === undefined) {
            rows.push(<span className='number-note' key={i}>_</span>);
        } else {
            rows.push(<span className='number-note' key={i}>{notes.at(i)}</span>);                
        }
    }

    return (
        <div className='container'>
            <div className='notes'>
                { rows }
            </div>
        </div>
    )
}


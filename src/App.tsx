import './App.css'
import ConstantSelection from './ConstantSelection';
import Notes from './Notes';
import Player from './Player';


function App() {

  return (
    <div className="main">
      <h1>Sound of Math</h1>
      {/* <BaseSelection /> */}
      <ConstantSelection />
      {/* Component to Display the note currently played as a number and as a note */}
      <Notes />
      {/* contains the play / pause / stop buttons and actually play the audio */}
      <Player />

    </div>
  )
}

export default App

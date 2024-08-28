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

      <div className="links">
        <a href="https://github.com/Coleim/SoundOfPi">Source code</a>
        <a href="https://www.youtube.com/watch?v=oRqzqRZCOB0">How I did it</a>
      </div>

    </div>
  )
}

export default App

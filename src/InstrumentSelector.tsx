export type InstrumentSelectorProps = {
  onInstrumentChange: (val:string) => void;
  onChordChange: (val:string) => void;
};

export function InstrumentSelector({onInstrumentChange, onChordChange}:InstrumentSelectorProps) {
  return (
    <div>
      <h3>Select Instrument</h3>
      <select onChange={(e) => onInstrumentChange(e.target.value)}>
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
      <select onChange={(e) => onChordChange(e.target.value)}>
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
    </div>);
}
import * as Tone from "tone";

export type Instrument = ReturnType<typeof createInstrument>;

export function asyncCreateInstrument(instrumentId: string) {
    return new Promise<Instrument>((resolve) => {
        const instrument: Instrument =
            createInstrument(instrumentId, ()=>resolve(instrument));
    });
}


function createInstrument(instrument: string, onload: () => void) {
  switch(instrument) {
      case 'guitar-acoustic':
          return create('guitar-acoustic', onload);
      case 'guitar-electric':
          return create('guitar-electric', onload);
      case 'guitar-nylon':
          return createGuitarNylon(onload);
      case 'piano':
          return create('piano', onload);
      case 'harp':
          return create('harp', onload);
      case 'violin':
          return createViolin(onload);
      case 'bassoon':
          return create('bassoon', onload);
      case 'saxophone':
          return createSaxophone(onload);
      case 'xylophone':
          return createXylophone(onload);
      case 'organ':
          return create('organ', onload);
      case "Tone.Synth":
          onload();
          return new Tone.PolySynth(Tone.Synth).toDestination();
      case "Tone.AMSynth":
          onload();
          return new Tone.PolySynth(Tone.AMSynth).toDestination();
      case "Tone.FMSynth":
          onload();
          return new Tone.PolySynth(Tone.FMSynth).toDestination();
      case "Tone.MembraneSynth":
          onload();
      return new Tone.MembraneSynth().toDestination();
      case "Tone.MetalSynth":
          onload();
          return new Tone.MetalSynth().toDestination();
      case "Tone.MonoSynth":
          onload();
          return new Tone.MonoSynth().toDestination();
      case "Tone.PluckSynth":
          onload();
          return new Tone.PluckSynth().toDestination();
      case "Tone.PolySynth":
          onload();
          return new Tone.PolySynth().toDestination();
  }
  
}

function create(instrument: string, onload: () => void) {

  return new Tone.Sampler({
      urls: {
          C3: "C3.mp3"
      },
      release: 1,
      baseUrl: "https://coleim.github.io/tonejs-instruments/samples/" + instrument + "/",
      onload
  }).toDestination();
}
function createGuitarNylon(onload: () => void) {
  return new Tone.Sampler({
      urls: {
          C3: "Cs3.mp3",
          F3: "Fs3.mp3"
      },
      release: 1,
      baseUrl: "https://coleim.github.io/tonejs-instruments/samples/guitar-nylon/",
      onload
  }).toDestination();
}
function createViolin(onload: () => void) {
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
      onload
  }).toDestination();
}

function createSaxophone(onload: () => void) {
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
      onload
  }).toDestination();
}

function createXylophone(onload: () => void) {
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
      onload
  }).toDestination();
}


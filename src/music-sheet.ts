import { Store } from "@tanstack/store";
import { Queue } from "./queue";


// You can use @tanstack/store outside of React components too!
export const musicSheet = new Store({
  notes: new Queue<number>(),
  playing: false
});

// export const updateLastIndexLoaded = (lastIndex: number) => {
//   musicSheet.setState((state) => {
//     return {
//       ...state,
//       lastIndexLoaded: lastIndex
//     };
//   });
// };

export const stopMusic = () => {
  musicSheet.setState((state) => {
    return {
      ...state,
      playing: false
    };
  });
};
export const startMusic = () => {
  musicSheet.setState((state) => {
    return {
      ...state,
      playing: true
    };
  });
};


export const resetMusicSheet = () => {
  musicSheet.setState((state) => {
    return {
      ...state,
      notes: new Queue<number>(),
      // lastIndexLoaded: 0
    };
  });
};

export const updateMusicSheet = (notes: number[]) => {
  musicSheet.setState((state) => {
    notes.forEach((note) => state.notes.push(note))
    return {
      ...state,
      notes: state.notes,
    };
  });
};

export const popNote = () => {
  musicSheet.setState((state) => {
    state.notes.pop()
    return {
      ...state,
      notes: state.notes
    };
  });
}
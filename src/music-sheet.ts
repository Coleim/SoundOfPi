import { Store } from "@tanstack/store";
import { Queue } from "./queue";


// You can use @tanstack/store outside of React components too!
export const musicSheet = new Store({
  notes: new Queue<number>()
});

export const resetMusicSheet = () => {
  musicSheet.setState((state) => {
    state.notes.clear()
    // console.log("resetMusicSheet: ", state.notes)
    return {
      ...state,
      notes: state.notes
    };
  });
};

export const updateMusicSheet = (note: number) => {
  musicSheet.setState((state) => {
    state.notes.push(note)
    // console.log("updateMusicSheet: ", state.notes)
    return {
      ...state,
      notes: state.notes
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
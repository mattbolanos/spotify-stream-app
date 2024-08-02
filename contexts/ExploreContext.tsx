import { createContext, useContext, useReducer, Dispatch } from "react";
import { ContextAction, ExploreState, ProviderProps } from "./types";

// default values
const defaultState: ExploreState = {
  artistStreams: [],
  selectedArtists: [{ selectIndex: 0, id: "", name: "" }],
};

// create context
const ExploreContext = createContext(defaultState);
const ExploreDispatchContext = createContext<
  Dispatch<ContextAction> | undefined
>(undefined);

export function ExploreProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(playerReducer, defaultState);

  return (
    <ExploreContext.Provider value={state}>
      <ExploreDispatchContext.Provider value={dispatch}>
        {children}
      </ExploreDispatchContext.Provider>
    </ExploreContext.Provider>
  );
}

export function useExplore() {
  return useContext(ExploreContext);
}

export function useExploreDispatch() {
  return useContext(ExploreDispatchContext);
}

function playerReducer(
  state: ExploreState,
  action: ContextAction
): ExploreState {
  switch (action.type) {
    // add artist
    case "ADD_ARTIST":
      return {
        ...state,
        selectedArtists: state.selectedArtists.concat({
          id: "",
          name: "",
          selectIndex: state.selectedArtists.length,
        }),
      };
    // add artist details
    case "ADD_ARTIST_DETAILS":
      const idToRemove = state.selectedArtists.find(
        (artist) => artist.selectIndex === action.payload.meta.selectIndex
      )?.id;

      return {
        ...state,
        artistStreams: state.artistStreams
          .filter((stream) => stream.id !== idToRemove)
          .concat(action.payload.streams),
        selectedArtists: state.selectedArtists
          .filter(
            (artist) => artist.selectIndex !== action.payload.meta.selectIndex
          )
          .concat(action.payload.meta)
          .sort((a, b) => a.selectIndex - b.selectIndex),
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

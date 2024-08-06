import { ArtistStream, SelectedArtist } from "@/lib/types";
import { ReactNode } from "react";

export interface ContextAction {
  type: string;
  payload?: any;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ExploreState {
  artistStreams: ArtistStream[];
  selectedArtists: SelectedArtist[];
}

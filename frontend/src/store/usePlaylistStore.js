import { create } from "zustand";
export const usePlaylistStore = create((set) => ({
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,

  setPlaylists: (data) => set({ playlists: data }),
  setPlaylistsOnDelete: (playlistId) => {
    set((state) => ({
      playlists: state.playlists.filter(
        (playlist) => playlist.id !== playlistId
      ),
    }));
  },

  setPlaylistOnCreating: (data) => {
    set((state) => ({
      playlists: [...state.playlists, data],
    }));
  },
  setCurrentPlaylist: (data) => set({ currentPlaylist: data }),
  setIsLoading: (value) => set({ isLoading: value }),
  setError: (value) => set({ error: value }),
}));

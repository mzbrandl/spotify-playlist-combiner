import Spotify from "spotify-web-api-js";

export default interface ISpotifyService {
  /**
   * Returns all playlists, that the user is following.
   */
  getPlaylists(): Promise<SpotifyApi.PlaylistObjectSimplified[]>;
  /**
   * Create a combined Playlist on the users profile.
   * @param playlists The playlists which will be combined
   * @param name The name of the combined playlist
   */
  createCombinedPlaylist(
    playlists: SpotifyApi.PlaylistObjectSimplified[],
    name: string
  ): Promise<void>;
}

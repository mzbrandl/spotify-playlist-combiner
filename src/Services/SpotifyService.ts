import Spotify from "spotify-web-api-js";
import ISpotifyService from "./ISpotifyService";

export default class SpotifyService implements ISpotifyService {
  private spotifyApi!: Spotify.SpotifyWebApiJs;
  private userId!: string;

  public static async create(access_token: string): Promise<ISpotifyService> {
    const spotifyService = new SpotifyService();
    spotifyService.spotifyApi = new Spotify();
    spotifyService.spotifyApi.setAccessToken(access_token);
    const userResponse = await spotifyService.spotifyApi.getMe();
    spotifyService.userId = userResponse.id;
    return spotifyService;
  }

  public async getPlaylists(): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
    const getPlaylistsRecursive = async (
      offset: number
    ): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {
      const res = await this.spotifyApi.getUserPlaylists(this.userId, {
        limit: 50,
        offset
      });
      return res.items.length < 50
        ? res.items
        : res.items.concat(await getPlaylistsRecursive(offset + 50));
    };
    const playlists = await getPlaylistsRecursive(0);
    return playlists;
  }

  public createCombinedPlaylist = async (
    playlists: SpotifyApi.PlaylistObjectSimplified[],
    name: string
  ): Promise<void> => {
    const res = await this.spotifyApi.createPlaylist(this.userId, {
      name,
      description: `This playlist is a combination of:${playlists
        .map(p => ` "${p.name}"`)
        .toString()}`
    });

    const tracks = await this.getUniqueTracks(playlists);
    const trackUris = tracks.map(track => track.uri);

    await this.addTracks(res.id, trackUris);
  };

  private addTracks = async (
    playlistId: string,
    trackUris: string[]
  ): Promise<any> => {
    for (let i = 0; i < trackUris.length / 99; i++) {
      let chunk = trackUris.slice(i * 99, (i + 1) * 99);
      await this.spotifyApi.addTracksToPlaylist(playlistId, chunk);
    }
  };

  private async getPlaylistTracks(
    playlist: SpotifyApi.PlaylistObjectSimplified
  ): Promise<SpotifyApi.PlaylistTrackObject[]> {
    const getPlaylistTracksRecursive = async (
      playlist: SpotifyApi.PlaylistObjectSimplified,
      offset: number
    ): Promise<SpotifyApi.PlaylistTrackObject[]> => {
      const res = await this.spotifyApi.getPlaylistTracks(playlist.id, {
        offset,
        limit: 100
      });
      return res.items.length < 100
        ? res.items
        : res.items.concat(
            await getPlaylistTracksRecursive(playlist, offset + 100)
          );
    };
    const tracks = await getPlaylistTracksRecursive(playlist, 0);
    return tracks;
  }

  private getUniqueTracks = async (
    playlists: SpotifyApi.PlaylistObjectSimplified[]
  ): Promise<SpotifyApi.TrackObjectFull[]> => {
    let tracksRes: SpotifyApi.PlaylistTrackObject[] = [];
    for (let i = 0; i < playlists.length; i++) {
      tracksRes = tracksRes.concat(await this.getPlaylistTracks(playlists[i]));
    }
    const tracks = tracksRes.map(tr => tr.track);
    const tracksFiltered = tracks.filter(
      (item, index, self) => self.findIndex(i => i.id === item.id) === index
    );
    return tracksFiltered;
  };
}

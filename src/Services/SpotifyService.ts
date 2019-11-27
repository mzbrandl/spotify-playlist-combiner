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
    console.log(playlists);
    return playlists;
  }

  public createCombinedPlaylist = async (
    playlists: SpotifyApi.PlaylistObjectSimplified[],
    name: string
  ): Promise<void> => {
    await this.spotifyApi.createPlaylist(this.userId, {
      name,
      description: `This playlist is a combination of ${playlists
        .map(p => p.name)
        .toString()}`
    });
  };
}

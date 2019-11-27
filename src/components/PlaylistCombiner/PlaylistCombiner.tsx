import React from "react";
import "./PlaylistCombiner.css";
import PlaylistRow from "../PlaylistRow/PlaylistRow";
import CombinedPlaylist from "../CombinedPlaylist/CombinedPlaylist";
import ISpotifyService from "../../Services/ISpotifyService";
import SpotifyService from "../../Services/SpotifyService";

export interface IPlaylistCombinerState {
  isLoggedin: boolean;
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylists: SpotifyApi.PlaylistObjectSimplified[];
}

export default class PlaylistCombiner extends React.PureComponent<
  {},
  IPlaylistCombinerState
> {
  private spotifyService: ISpotifyService;

  constructor() {
    super({});

    this.state = {
      isLoggedin: false,
      playlists: [],
      selectedPlaylists: []
    };
  }

  public async componentDidMount() {
    const params = this.getHashParams();
    if (params.access_token) {
      this.spotifyService = await SpotifyService.create(params.access_token);
      const playlists = await this.spotifyService.getPlaylists();
      this.setState(prevState => ({
        ...prevState,
        isLoggedin: true,
        playlists
      }));
    }
  }

  public render() {
    const { isLoggedin, playlists, selectedPlaylists } = this.state;

    return (
      <div className="PlaylistCombiner">
        <h1>Spotify Playlist Combiner</h1>
        {!isLoggedin && (
          <a href={"http://localhost:8888/login"}>
            <button>Login with Spotify</button>
          </a>
        )}
        <CombinedPlaylist
          playlists={selectedPlaylists}
          spotifyService={this.spotifyService}
        />
        <br />
        {playlists &&
          playlists.map((playlist, key) => (
            <PlaylistRow
              playlist={playlist}
              key={key}
              handelSelectedPlaylists={this.handelSelectedPlaylists}
            />
          ))}
      </div>
    );
  }

  private handelSelectedPlaylists = (
    playlist: SpotifyApi.PlaylistObjectSimplified,
    isChecked: boolean
  ) => {
    const { selectedPlaylists: oldPlaylists } = this.state;

    const selectedPlaylists = oldPlaylists;

    isChecked
      ? selectedPlaylists.push(playlist)
      : selectedPlaylists.splice(selectedPlaylists.indexOf(playlist), 1);

    this.setState(prevState => ({ ...prevState, selectedPlaylists }));
    this.forceUpdate();
  };

  private getHashParams = () => {
    var hashParams: { [index: string]: any } = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };
}

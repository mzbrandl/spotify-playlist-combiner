import React from "react";

import PlaylistRow from "../PlaylistRow/PlaylistRow";
import CombinedPlaylist from "../CombinedPlaylist/CombinedPlaylist";
import ISpotifyService from "../../services/ISpotifyService";
import SpotifyService from "../../services/SpotifyService";

import styles from "./PlaylistCombiner.module.scss";

export interface IPlaylistCombinerState {
  isLoggedin: boolean;
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylists: SpotifyApi.PlaylistObjectSimplified[];
  filter: string;
}

export default class PlaylistCombiner extends React.PureComponent<
  {},
  IPlaylistCombinerState
  > {
  private spotifyService: ISpotifyService;

  constructor() {
    super({});

    const params = this.getHashParams();
    const isLoggedin = params.access_token && true;

    this.state = {
      isLoggedin,
      playlists: [],
      selectedPlaylists: [],
      filter: ""
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
    const { isLoggedin, playlists, selectedPlaylists, filter } = this.state;

    if (isLoggedin) {
      return (
        <div className={styles.playlistCombiner}>
          <h1>Spotify Playlist Combiner</h1>
          <p>
            This site allows you to create Spotify playlist by combining
            playlists, which you are already following.
          </p>
          <div className={styles.horWraper}>
            <div className={styles.playlistRows}>
              <p>Select playlists you want to combine</p>
              Filter:
              {
                <input
                  type="text"
                  value={filter}
                  onChange={e => {
                    const filter = e.target.value;
                    this.setState(prevState => ({
                      ...prevState,
                      filter
                    }));
                  }}
                ></input>
              }
              {playlists.length > 0
                ? playlists.filter(
                  p =>
                    p.name.toLowerCase().includes(filter.toLowerCase()) ||
                    p.owner.display_name
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                )
                  .map((playlist, key) => (
                    <PlaylistRow
                      playlist={playlist}
                      key={key}
                      isChecked={selectedPlaylists.includes(playlist)}
                      handelSelectedPlaylists={this.handelSelectedPlaylists}
                    />
                  ))
                : 'loading playlists...'}
            </div>
            <CombinedPlaylist
              playlists={selectedPlaylists}
              spotifyService={this.spotifyService}
              clearSelection={this.clearSelection}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.playlistCombiner}>
          <h1>Spotify Playlist Combiner</h1>
          <p>
            This site allows you to create Spotify playlist by combining
            playlists, which you are already following.
          </p>
          <a
            className={styles.loginButton}
            href={"https://spotify-playlist-combiner-serv.herokuapp.com/login"}
          >
            <button>Login with Spotify</button>
          </a>
        </div>
      );
    }
  }

  private clearSelection = (): void => {
    console.log("this.clearSelection");
    this.setState(prevState => ({
      ...prevState,
      selectedPlaylists: [],
      filter: ""
    }));
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

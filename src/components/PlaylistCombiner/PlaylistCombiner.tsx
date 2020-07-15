import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

import PlaylistRow from "./PlaylistRow/PlaylistRow";
import ISpotifyService from "../../services/ISpotifyService";
import SpotifyService from "../../services/SpotifyService";

import * as Play from "../../assets/play.png";

import styles from "./PlaylistCombiner.module.scss";

export interface IPlaylistCombinerState {
  isLoggedin: boolean;
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylists: SpotifyApi.PlaylistObjectSimplified[];
  filter: string;
  loggingIn: boolean;
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
      filter: "",
      loggingIn: false,
    };
  }

  public async componentDidMount() {
    const params = this.getHashParams();
    if (params.access_token) {
      this.spotifyService = await SpotifyService.create(params.access_token);
      const playlists = await this.spotifyService.getPlaylists();
      this.setState((prevState) => ({
        ...prevState,
        isLoggedin: true,
        playlists,
      }));
    }
  }

  public render() {
    const {
      isLoggedin,
      playlists,
      selectedPlaylists,
      filter,
      loggingIn,
    } = this.state;

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
              <div className={styles.controls}>
                <input
                  type="search"
                  className={styles.filter}
                  placeholder="Filter"
                  value={filter}
                  onChange={(e) => {
                    const filter = e.target.value;
                    this.setState((prevState) => ({
                      ...prevState,
                      filter,
                    }));
                  }}
                />
                <button
                  className={styles.clearBtn}
                  onClick={this.clearSelection}
                >
                  Clear
                </button>
              </div>
              {playlists.length > 0 ? (
                playlists
                  .filter(
                    (p) =>
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
              ) : (
                <div className={styles.loadingPlaylists}>
                  <ClipLoader
                    css={css`
                      align-self: center;
                    `}
                    size={30}
                    color={"#1db954"}
                    loading={true}
                  />
                  <text>Loading playlists...</text>
                </div>
              )}
            </div>
            <button
              onClick={this.onCreatePlaylistClick}
              className={
                selectedPlaylists.length > 1 ? styles.createButton : styles.hide
              }
              disabled={selectedPlaylists.length < 2}
            >
              <img src={Play.default} alt="Play" />
            </button>
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
            href={"https://spotify-playlist-combiner-serv.herokuapp.com/login"}
            style={{ alignSelf: "center" }}
          >
            <button
              className={styles.loginButton}
              onClick={() =>
                this.setState((prevState) => ({
                  ...prevState,
                  loggingIn: true,
                }))
              }
              disabled={loggingIn}
            >
              Login with Spotify
            </button>
          </a>
          <ClipLoader
            css={css`
              align-self: center;
              margin-top: 2em;
            `}
            size={50}
            color={"#1db954"}
            loading={loggingIn}
          />
        </div>
      );
    }
  }

  private onCreatePlaylistClick = async () => {
    const { selectedPlaylists } = this.state;

    await this.spotifyService.createCombinedPlaylist(selectedPlaylists);
    this.clearSelection();
  };

  private clearSelection = (): void => {
    console.log("this.clearSelection");
    this.setState((prevState) => ({
      ...prevState,
      selectedPlaylists: [],
      filter: "",
    }));
  };

  private handelSelectedPlaylists = (
    playlist: SpotifyApi.PlaylistObjectSimplified,
    isChecked: boolean
  ) => {
    const { selectedPlaylists: oldPlaylists } = this.state;

    const selectedPlaylists = oldPlaylists;

    isChecked
      ? selectedPlaylists.push(playlist)
      : selectedPlaylists.splice(selectedPlaylists.indexOf(playlist), 1);

    this.setState((prevState) => ({ ...prevState, selectedPlaylists }));
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

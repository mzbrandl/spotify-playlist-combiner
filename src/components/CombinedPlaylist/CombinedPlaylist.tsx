import React from "react";
import ISpotifyService from "../../services/ISpotifyService";

import styles from "./CombinedPlaylist.module.scss";

export interface ICombinedPlaylistProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  spotifyService: ISpotifyService;
  clearSelection();
}

export interface ICombinedPlaylistState {
  name: string;
  showSuccessMsg: boolean;
}

export default class CombinedPlaylist extends React.PureComponent<
  ICombinedPlaylistProps,
  ICombinedPlaylistState
  > {
  constructor(props) {
    super(props);
    this.state = { name: "", showSuccessMsg: false };
  }

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  public render() {
    const { playlists } = this.props;
    const { name, showSuccessMsg } = this.state;
    return (
      <div className={styles.combinedPlaylist}>
        <b>Name of the combined playlist:</b>
        <input
          type="text"
          placeholder="Playlist name"
          value={name}
          onChange={e => {
            const name = e.target.value;
            this.setState(prevState => ({
              ...prevState,
              name
            }));
          }}
        />
        <p>Selected playlists:</p>
        <ul>
          {playlists &&
            playlists.map((playlist, key) => (
              <li key={key}>{playlist.name}</li>
            ))}
        </ul>
        <button
          onClick={() => this.onCreatePlaylistClick()}
          disabled={!name || playlists.length === 0}
        >
          Create combined playlist
        </button>
        <h5 className={showSuccessMsg ? styles.msg1 : styles.msg2}>Created Playlist!</h5>
      </div>
    );
  }

  private onCreatePlaylistClick = () => {
    const { spotifyService, playlists, clearSelection } = this.props;
    const { name } = this.state;

    spotifyService.createCombinedPlaylist(playlists, name);
    clearSelection();

    this.setState(prevState => ({
      ...prevState,
      showSuccessMsg: true,
      name: ""
    }));
    setTimeout(() => {
      this.setState(prevState => ({ ...prevState, showSuccessMsg: false }))
    }, 2000)
  }
}

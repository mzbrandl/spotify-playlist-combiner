import React from "react";
import ISpotifyService from "../../services/ISpotifyService";

import styles from "./CombinedPlaylist.module.scss";

export interface ICombinedPlaylistProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  spotifyService: ISpotifyService;
}

export interface ICombinedPlaylistState {
  name: string;
}

export default class CombinedPlaylist extends React.PureComponent<
  ICombinedPlaylistProps,
  ICombinedPlaylistState
> {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }

  public render() {
    const { playlists, spotifyService } = this.props;
    const { name } = this.state;
    return (
      <div
        className={
          playlists.length > 0 ? styles.combinedPlaylist : styles.hidden
        }
      >
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
          onClick={() => spotifyService.createCombinedPlaylist(playlists, name)}
          disabled={!name}
        >
          Create combined playlist
        </button>
      </div>
    );
  }
}

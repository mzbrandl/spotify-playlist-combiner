import React from "react";
import ISpotifyService from "../../services/ISpotifyService";

import styles from "./CombinedPlaylist.module.scss";
import SpotifyService from "../../services/SpotifyService";

export interface ICombinedPlaylistProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  spotifyService: ISpotifyService;
  clearSelection();
}

export interface ICombinedPlaylistState {
  name: string;
  showSuccessMsg: boolean;
  res: any;
}

export default class CombinedPlaylist extends React.PureComponent<
  ICombinedPlaylistProps,
  ICombinedPlaylistState
> {
  constructor(props) {
    super(props);
    this.state = { name: "", showSuccessMsg: false, res: null };
  }

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  public render() {
    const { playlists } = this.props;
    const { name, showSuccessMsg } = this.state;
    return (
      <div className={styles.combinedPlaylist}>
        <p>Selected playlists:</p>
        <ul>
          {playlists &&
            playlists.map((playlist, key) => (
              <li key={key}>{playlist.name}</li>
            ))}
        </ul>
        <button
          onClick={() => this.onCreatePlaylistClick()}
          disabled={playlists.length === 0}
        >
          Create combined playlist
        </button>
        <h5 className={showSuccessMsg ? styles.msg1 : styles.msg2}>
          Created Playlist!
        </h5>
      </div>
    );
  }

  async onPlayClick(): Promise<void> {
    const { spotifyService } = this.props;
    const { res } = this.state;

    await spotifyService.play(res);
  }

  private onCreatePlaylistClick = async () => {
    const { spotifyService, playlists, clearSelection } = this.props;
    const { name } = this.state;

    const res = await spotifyService.createCombinedPlaylist(playlists, name);
    clearSelection();

    this.setState((prevState) => ({
      ...prevState,
      res,
      showSuccessMsg: true,
      name: "",
    }));
    setTimeout(() => {
      this.setState((prevState) => ({ ...prevState, showSuccessMsg: false }));
    }, 2000);
  };
}

import React from "react";

import styles from "./PlaylistRow.module.scss";

export interface IPlaylistRowProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  isChecked: boolean;
  handelSelectedPlaylists(
    playlist: SpotifyApi.PlaylistObjectSimplified,
    isChecked: boolean
  );
}


export default class PlaylistRow extends React.PureComponent<IPlaylistRowProps> {

  public render() {
    const { playlist, isChecked } = this.props;
    return (
      <div className={styles.playlistRow}>
        <div className={styles.leftWrapper}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={e => this.handleChange(e)}
          />
          <img
            src={
              playlist.images[playlist.images.length - 1] &&
              playlist.images[playlist.images.length - 1].url
            }
            alt="cover"
            height={60}
            width={60}
          ></img>
          <div className={styles.textWrapper}>
            <h5>{playlist.name}</h5>
            <div className={styles.subInfo}>
              <p>By {playlist.owner.display_name} </p>
              <p>{playlist.tracks.total} tracks</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { handelSelectedPlaylists, playlist } = this.props;
    handelSelectedPlaylists(playlist, e.target.checked);
  }
}

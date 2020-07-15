import React from "react";
import * as CheckMark from "../../../assets/checkmark_green.png";
import styles from "./PlaylistRow.module.scss";

export interface IPlaylistRowProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  isChecked: boolean;
  handelSelectedPlaylists(
    playlist: SpotifyApi.PlaylistObjectSimplified,
    isChecked: boolean
  );
}

export default class PlaylistRow extends React.PureComponent<
  IPlaylistRowProps
> {
  public render() {
    const { playlist, isChecked } = this.props;
    return (
      <div className={styles.playlistRow} onClick={(e) => this.handleChange(e)}>
        <div className={styles.overlay}>
          <img
            className={styles.cover}
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
              <p>by {playlist.owner.display_name} </p>
              {/* <p>{playlist.tracks.total} tracks</p> */}
            </div>
          </div>
          {isChecked && (
            <img
              className={styles.checkImg}
              src={CheckMark.default}
              alt="check"
              width="20px"
              height="20px"
            />
          )}
        </div>
      </div>
    );
  }

  handleChange(e): void {
    const { handelSelectedPlaylists, playlist, isChecked } = this.props;
    handelSelectedPlaylists(playlist, !isChecked);
  }
}

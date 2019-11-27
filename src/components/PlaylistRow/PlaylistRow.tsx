import React from "react";

export interface IPlaylistRowProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  handelSelectedPlaylists(
    playlist: SpotifyApi.PlaylistObjectSimplified,
    isChecked: boolean
  );
}

export interface IPlaylistRowState {
  isChecked: boolean;
}

export default class PlaylistRow extends React.PureComponent<
  IPlaylistRowProps,
  IPlaylistRowState
> {
  constructor(props) {
    super(props);
    this.state = { isChecked: false };
  }

  public render() {
    const { playlist } = this.props;
    const { isChecked } = this.state;
    return (
      <div>
        <img
          src={
            playlist.images[playlist.images.length - 1] &&
            playlist.images[playlist.images.length - 1].url
          }
          alt="cover"
          height={60}
          width={60}
        ></img>
        {playlist.name}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => this.handleChange(e)}
        />
      </div>
    );
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { handelSelectedPlaylists, playlist } = this.props;
    this.setState(prevState => ({
      ...prevState,
      isChecked: !prevState.isChecked
    }));
    handelSelectedPlaylists(playlist, e.target.checked);
  }
}

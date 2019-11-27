import React from "react";
import ISpotifyService from "../../Services/ISpotifyService";

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
      <div>
        <p>Name of the combined playlist:</p>
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
        {playlists && playlists.map(playlist => <p>{playlist.name}</p>)}
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

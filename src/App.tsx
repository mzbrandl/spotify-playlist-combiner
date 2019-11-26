import React from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";

const spotifyApi = new Spotify();

export interface IAppState {
  isLoggedin: boolean;
  playlists: any;
}

export default class App extends React.PureComponent<{}, IAppState> {
  constructor() {
    super({});

    const params = this.getHashParams();
    if (params.access_token) {
      spotifyApi.setAccessToken(params.access_token);
    }

    this.state = {
      isLoggedin: params.access_token,
      playlists: null
    };
  }

  public render() {
    const { isLoggedin, playlists } = this.state;

    return (
      <div className="App">
        <h1>Spotify Playlist Combiner</h1>
        {!isLoggedin && (
          <a href={"http://localhost:8888"}>
            <button>Login with Spotify</button>
          </a>
        )}
        {isLoggedin && (
          <button onClick={() => this.getPlaylists()}>Get Playlists</button>
        )}
        {playlists &&
          playlists.map((playlist, key) => (
            <p key={key}>
              {key + 1}){playlist.name}
            </p>
          ))}
      </div>
    );
  }

  private getPlaylists = async () => {
    const getPlaylistsRecursive = async (offset: number): Promise<any[]> => {
      // @ts-ignore
      const res = await spotifyApi.getUserPlaylists({
        limit: 50,
        offset
      });
      return res.items.length < 50
        ? res.items
        : res.items.concat(await getPlaylistsRecursive(offset + 50));
    };

    const playlists = await getPlaylistsRecursive(0);
    console.log(playlists);

    this.setState(prevState => ({ ...prevState, playlists }));
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

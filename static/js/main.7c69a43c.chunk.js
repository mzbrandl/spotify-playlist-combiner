(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{11:function(e,t,n){e.exports={combinedPlaylist:"CombinedPlaylist_combinedPlaylist__3VJ18",msg1:"CombinedPlaylist_msg1__3XAVY",fadeInOut:"CombinedPlaylist_fadeInOut__RZAxt",msg2:"CombinedPlaylist_msg2__2CDBE"}},15:function(e,t,n){e.exports=n(22)},20:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(13),i=n.n(s),c=(n(20),n(1)),o=n.n(c),l=n(2),u=n(10),p=n(3),f=n(4),y=n(6),m=n(5),h=n(7),d=n(9),b=n.n(d),v=function(e){function t(){return Object(p.a)(this,t),Object(y.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.playlist,r=t.isChecked;return a.a.createElement("div",{className:b.a.playlistRow},a.a.createElement("div",{className:b.a.leftWrapper},a.a.createElement("input",{type:"checkbox",checked:r,onChange:function(t){return e.handleChange(t)}}),a.a.createElement("img",{src:n.images[n.images.length-1]&&n.images[n.images.length-1].url,alt:"cover",height:60,width:60}),a.a.createElement("div",{className:b.a.textWrapper},a.a.createElement("h5",null,n.name),a.a.createElement("div",{className:b.a.subInfo},a.a.createElement("p",null,"By ",n.owner.display_name," "),a.a.createElement("p",null,n.tracks.total," tracks")))))}},{key:"handleChange",value:function(e){var t=this.props;(0,t.handelSelectedPlaylists)(t.playlist,e.target.checked)}}]),t}(a.a.PureComponent),g=n(11),w=n.n(g);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var P=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(y.a)(this,Object(m.a)(t).call(this,e))).onCreatePlaylistClick=Object(l.a)(o.a.mark((function e(){var t,r,a,s,i,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.props,r=t.spotifyService,a=t.playlists,s=t.clearSelection,i=n.state.name,e.next=4,r.createCombinedPlaylist(a,i);case 4:c=e.sent,s(),n.setState((function(e){return k({},e,{res:c,showSuccessMsg:!0,name:""})})),setTimeout((function(){n.setState((function(e){return k({},e,{showSuccessMsg:!1})}))}),2e3);case 8:case"end":return e.stop()}}),e)}))),n.state={name:"",showSuccessMsg:!1,res:null},n}return Object(h.a)(t,e),Object(f.a)(t,[{key:"componentWillReceiveProps",value:function(){this.forceUpdate()}},{key:"render",value:function(){var e=this,t=this.props.playlists,n=this.state,r=(n.name,n.showSuccessMsg);return a.a.createElement("div",{className:w.a.combinedPlaylist},a.a.createElement("p",null,"Selected playlists:"),a.a.createElement("ul",null,t&&t.map((function(e,t){return a.a.createElement("li",{key:t},e.name)}))),a.a.createElement("button",{onClick:function(){return e.onCreatePlaylistClick()},disabled:0===t.length},"Create combined playlist"),a.a.createElement("h5",{className:r?w.a.msg1:w.a.msg2},"Created Playlist!"))}},{key:"onPlayClick",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.spotifyService,n=this.state.res,e.next=4,t.play(n);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),t}(a.a.PureComponent),x=n(14),j=n.n(x),_=function(){function e(){var t=this;Object(p.a)(this,e),this.spotifyApi=void 0,this.userId=void 0,this.createCombinedPlaylist=function(){var e=Object(l.a)(o.a.mark((function e(n,r){var a,s,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.spotifyApi.createPlaylist(t.userId,{name:"combined playlist",description:"This playlist is a combination of:".concat(n.map((function(e){return' "'.concat(e.name,'"')})).toString())});case 2:return a=e.sent,e.next=5,t.getUniqueTracks(n);case 5:return s=e.sent,i=s.map((function(e){return e.uri})),e.next=9,t.addTracks(a.id,i);case 9:return e.next=11,t.spotifyApi.play({context_uri:a.uri});case 11:return e.next=13,t.spotifyApi.setShuffle(!0);case 13:return e.next=15,t.spotifyApi.unfollowPlaylist(a.id);case 15:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),this.play=function(){var e=Object(l.a)(o.a.mark((function e(n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.spotifyApi.play({context_uri:n.uri});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.addTracks=function(){var e=Object(l.a)(o.a.mark((function e(n,r){var a,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=r.filter((function(e){return!e.includes("local")})),a=0;case 2:if(!(a<r.length/99)){e.next=9;break}return s=r.slice(99*a,99*(a+1)),e.next=6,t.spotifyApi.addTracksToPlaylist(n,s);case 6:a++,e.next=2;break;case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),this.getUniqueTracks=function(){var e=Object(l.a)(o.a.mark((function e(n){var r,a,s,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=[],a=0;case 2:if(!(a<n.length)){e.next=11;break}return e.t0=r,e.next=6,t.getPlaylistTracks(n[a]);case 6:e.t1=e.sent,r=e.t0.concat.call(e.t0,e.t1);case 8:a++,e.next=2;break;case 11:return s=r.map((function(e){return e.track})),i=s.filter((function(e,t,n){return n.findIndex((function(t){return t.id===e.id}))===t})),e.abrupt("return",i);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}return Object(f.a)(e,[{key:"getPlaylists",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,n,r=this;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(){var e=Object(l.a)(o.a.mark((function e(n){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.spotifyApi.getUserPlaylists(r.userId,{limit:50,offset:n});case 2:if(!((a=e.sent).items.length<50)){e.next=7;break}e.t0=a.items,e.next=12;break;case 7:return e.t1=a.items,e.next=10,t(n+50);case 10:e.t2=e.sent,e.t0=e.t1.concat.call(e.t1,e.t2);case 12:return e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=3,t(0);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getPlaylistTracks",value:function(){var e=Object(l.a)(o.a.mark((function e(t){var n,r,a=this;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=Object(l.a)(o.a.mark((function e(t,r){var s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.spotifyApi.getPlaylistTracks(t.id,{offset:r,limit:100});case 2:if(!((s=e.sent).items.length<100)){e.next=7;break}e.t0=s.items,e.next=12;break;case 7:return e.t1=s.items,e.next=10,n(t,r+100);case 10:e.t2=e.sent,e.t0=e.t1.concat.call(e.t1,e.t2);case 12:return e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.next=3,n(t,0);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}],[{key:"create",value:function(){var t=Object(l.a)(o.a.mark((function t(n){var r,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(r=new e).spotifyApi=new j.a,r.spotifyApi.setAccessToken(n),t.next=5,r.spotifyApi.getMe();case 5:return a=t.sent,r.userId=a.id,t.abrupt("return",r);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),e}(),C=n(8),S=n.n(C);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var T=function(e){function t(){var e;Object(p.a)(this,t),(e=Object(y.a)(this,Object(m.a)(t).call(this,{}))).spotifyService=void 0,e.clearSelection=function(){console.log("this.clearSelection"),e.setState((function(e){return A({},e,{selectedPlaylists:[],filter:""})}))},e.handelSelectedPlaylists=function(t,n){var r=e.state.selectedPlaylists;n?r.push(t):r.splice(r.indexOf(t),1),e.setState((function(e){return A({},e,{selectedPlaylists:r})})),e.forceUpdate()},e.getHashParams=function(){for(var e,t={},n=/([^&;=]+)=?([^&;]*)/g,r=window.location.hash.substring(1);e=n.exec(r);)t[e[1]]=decodeURIComponent(e[2]);return t};var n=e.getHashParams().access_token&&!0;return e.state={isLoggedin:n,playlists:[],selectedPlaylists:[],filter:""},e}return Object(h.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=this.getHashParams()).access_token){e.next=9;break}return e.next=4,_.create(t.access_token);case 4:return this.spotifyService=e.sent,e.next=7,this.spotifyService.getPlaylists();case 7:n=e.sent,this.setState((function(e){return A({},e,{isLoggedin:!0,playlists:n})}));case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,n=t.isLoggedin,r=t.playlists,s=t.selectedPlaylists,i=t.filter;return n?a.a.createElement("div",{className:S.a.playlistCombiner},a.a.createElement("h1",null,"Spotify Playlist Combiner"),a.a.createElement("p",null,"This site allows you to create Spotify playlist by combining playlists, which you are already following."),a.a.createElement("div",{className:S.a.horWraper},a.a.createElement("div",{className:S.a.playlistRows},a.a.createElement("p",null,"Select playlists you want to combine"),"Filter:",a.a.createElement("input",{type:"text",value:i,onChange:function(t){var n=t.target.value;e.setState((function(e){return A({},e,{filter:n})}))}}),r.length>0?r.filter((function(e){return e.name.toLowerCase().includes(i.toLowerCase())||e.owner.display_name.toLowerCase().includes(i.toLowerCase())})).map((function(t,n){return a.a.createElement(v,{playlist:t,key:n,isChecked:s.includes(t),handelSelectedPlaylists:e.handelSelectedPlaylists})})):"loading playlists..."),a.a.createElement(P,{playlists:s,spotifyService:this.spotifyService,clearSelection:this.clearSelection}))):a.a.createElement("div",{className:S.a.playlistCombiner},a.a.createElement("h1",null,"Spotify Playlist Combiner"),a.a.createElement("p",null,"This site allows you to create Spotify playlist by combining playlists, which you are already following."),a.a.createElement("a",{className:S.a.loginButton,href:"https://spotify-playlist-combiner-serv.herokuapp.com/login"},a.a.createElement("button",null,"Login with Spotify")))}}]),t}(a.a.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,n){e.exports={playlistCombiner:"PlaylistCombiner_playlistCombiner__3jbQ4",loginButton:"PlaylistCombiner_loginButton__2m6-3",horWraper:"PlaylistCombiner_horWraper__3Rdfw",playlistRows:"PlaylistCombiner_playlistRows__3ifCi"}},9:function(e,t,n){e.exports={playlistRow:"PlaylistRow_playlistRow__HTNk4",leftWrapper:"PlaylistRow_leftWrapper__1PlGK",textWrapper:"PlaylistRow_textWrapper__JNwfu",subInfo:"PlaylistRow_subInfo__132Cr"}}},[[15,1,2]]]);
//# sourceMappingURL=main.7c69a43c.chunk.js.map
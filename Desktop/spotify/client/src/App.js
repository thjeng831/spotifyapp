import React, { Component } from "react";
import './App.css';
import Spotify from 'spotify-web-api-js';
import { BrowserRouter as Router, Route} from "react-router-dom";

const spotifyWebApi = new Spotify();

class App extends Component {
 constructor(){
  super();
  const params = this.getHashParams();
  spotifyWebApi.setAccessToken(params.access_token);
  this.state = {
    userPlaylists : [],
    playlistOne : {
      collaborative: false,
      external_urls: null,
      href: null,
      id: '',
      images:[],
      name: '',
      owner: null,
      public: null,
      snapshot_id: '',
      tracks: null,
      type: '',
      uri: '',
   },
   pName: 'not changed',
   check1: false,
  }
}
 getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  e = r.exec(q)
  while (e) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
     e = r.exec(q);
  }
  return hashParams;
}
 getUsersPlaylists() {
  spotifyWebApi.getUserPlaylists()
    .then((response) => {
      this.setState({
        userPlaylists: Array.from(response.items),
      })
    }
    )
 }
 onClick1 = (playlist) => {
   if (this.state.check1 === false) {
     this.setState({
       playlistOne : playlist,
       check1: true,
       pName: playlist.name
     }, () => {
       console.log(this.state.pName);
     })
   }
 }


 render() {
  this.getUsersPlaylists()
  return <Router history={browserHistory}>
   <Route exact path = "/" render = {
     () => {
       return (
         <a href= 'http://localhost:8888'>
         <button>
           Login with Spotify
         </button>
         </a>   
       )
     }
   }/>
   <Route exact path = "/choice" render = {
     () => {
       return (
         <div>
           {this.state.userPlaylists.map((x, index) =>
              <a href = 'http://localhost:3000/result/#'>
             <button key = {index} onClick = { () => this.onClick1(x)}>
               {x.name}
             </button>
             </a>
           )}
         </div>
       )
     }
   }/>
   <Route exact path = "/result" render = {
     () => {
       return (
        <h1>Playlist name: {browserHistory.push({state: {pName: this.state.pName}})}</h1>
       )
     }
   }/>
   </Router>
}
}
export default App;


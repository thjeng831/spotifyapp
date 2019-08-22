import React, { Component } from "react";
import './App.css';
import Spotify from 'spotify-web-api-js';
import { BrowserRouter as Router, Route} from "react-router-dom";

const spotifyWebApi = new Spotify();

class App extends Component {
 constructor(){
   super();
   const params = this.getHashParams();
   const token = params.access_token;
   if (token) {
     spotifyWebApi.setAccessToken(token);
   }
   this.state = {
     userPlaylists : '',
     namesList: '',
     playlistOne : '',
     playlistTwo : ''
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
         userPlaylists: Array.from(response.items)
       })
     }
     )
  }

printButtons() {
  this.setState({
    namesList: 
      <div class = "button-group">
        {this.state.userPlaylists.map(x => <button>{x.name}</button>)}
      </div>
  })
}

 render() {
   this.getUsersPlaylists()
   this.printButtons()
   return <Router>
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
            <h1>Click on 2 playlists</h1>
            {this.state.namesList}
          </div>

        )
      }
    }/>
    <Route exact path = "/result" render = {
      () => {
        return ( 
          <div>
          <h1>hi</h1>
        </div>
        )
      }
    }/>
    </Router>
 }
}
export default App;

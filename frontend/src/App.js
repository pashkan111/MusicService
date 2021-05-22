import './App.css';
import Header from './components/header'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import list from './screens/list'
import Home from './screens/home'
import Playlist from './screens/playlist'
import Login from './screens/Login'
import Register from './screens/register'
import ProfileScreen from './screens/profileScreen'
import MusicScreen from './screens/musicScreen'
import CreatePlayist from './screens/CreatePlaylist'

function App() {
  return (
    <Router>
      <Header/>
        <main className='py-4'>
          <Container>
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/playlist-create/' component={CreatePlayist} exact/>
            <Route path='/profile/' component={ProfileScreen} exact/>
            <Route path='/login/' component={Login} exact/>
            <Route path='/register/' component={Register} exact/>
            <Route path='/my_playlists/' component={list} exact/>
            <Route path='/playlist-detail/:id' component={Playlist} exact/>
            <Route path='/music/' component={MusicScreen} exact/>
          </Switch>
          </Container>
        </main>
    </Router>
  );
}

export default App;

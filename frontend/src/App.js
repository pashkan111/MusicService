import './App.css';
import Header from './components/header'
import {Container} from 'react-bootstrap'
import list from './components/list'
import Home from './components/home'
import Playlist from './components/playlist'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
          <h1 className='text-center'>ДОБРО ПОЖАЛОВАТЬ</h1>
          {/* <Home/> */}
          <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/my_playlists/' component={list} exact/>
          <Route path='/playlist-detail/:id' component={Playlist} exact/>
          </Switch>
          </Container>
        </main>
    </Router>
  );
}

export default App;

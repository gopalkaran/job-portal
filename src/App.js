import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shortlisted from './components/Shortlisted';
import Rejected from './components/Rejected';
import Candidate from './components/Candidate';
import Home from './components/Home';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Router>
      <Nav />      
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/shortlisted' component={Shortlisted} />
          <Route path='/rejected' exact component={Rejected} />
          <Route path='/:id' component={Candidate} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

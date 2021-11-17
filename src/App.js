import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shortlisted from './components/Shortlisted';
import Rejected from './components/Rejected';
import Candidate from './components/Candidate';
import Home from './components/Home';
import Nav from './components/Nav';

function App() {
  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems =async () =>{
    const data = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json');
    const items = await data.json();
    console.log(items);
    const modifiedList = items.map(item => {
        return {...item, visible : true, shortlisted : false}
    })
    // setCandidateList(modifiedList);
    localStorage.setItem('candidateList', JSON.stringify(modifiedList));
}
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

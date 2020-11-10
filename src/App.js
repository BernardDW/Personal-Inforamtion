import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Pages
import Upload from './pages/Upload.js'; 
import Analyse from './pages/Analyse.js'; 
import Login from './pages/login_signUp.js'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/" component={Upload}></Route>
          <Route exact path="/analyse" component={Analyse}></Route>
        </Switch>
        
      </Router>

    </div>
  );
}

export default App;
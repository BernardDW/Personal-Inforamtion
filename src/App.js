import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Pages
import Upload from './pages/Upload.js'; 
import Analyse from './pages/Analyse.js'; 
import Login from './pages/login_signUp.js'; 
import Success from './pages/success.js'; 

//Component
import ProtectedRoute from './component/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <ProtectedRoute  exact path="/" component={Upload}></ProtectedRoute>
          <ProtectedRoute  path="/analyse" component={Analyse}></ProtectedRoute>
          <Route path="/success" component={Success}></Route>
        </Switch>
        
      </Router>

    </div>
  );
}

export default App;
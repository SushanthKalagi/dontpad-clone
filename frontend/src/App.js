import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoteEditor from './components/NoteEditor';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:url" component={NoteEditor} />
          <Route path="/" component={NoteEditor} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

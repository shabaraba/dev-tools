import React from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';

import RegexpTool from './views/RegexpTool';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>test</header>
      <div className="body">
        <BrowserRouter>
          <Link to="/regexp-tool">regexp-tool</Link>
          <Link to="/menu2">menu2</Link>
          <Link to="/menu3">menu3</Link>

          <Route path="/regexp-tool" component={RegexpTool}/>
          <Route path="/menu1" />
          <Route path="/menu1" />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

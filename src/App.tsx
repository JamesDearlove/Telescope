import React, { useState } from 'react';
import './App.css';
import { Search } from './components/Search';
import { Settings } from './components/Settings';
import { TodoItems } from "./components/Todoist";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="App">
      <Search />
      <TodoItems />
      <button onClick={() => setShowSettings(!showSettings)}>Toggle Settings</button>
      {showSettings && <Settings />}
    </div>
  );
}

export default App;

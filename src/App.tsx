import React, { useState } from 'react';
import { Search } from './components/Search';
import { Settings } from './components/Settings';
import { TodoItems } from "./components/Todoist";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center">
      <Search />
      <TodoItems />
      <button onClick={() => setShowSettings(!showSettings)}>Toggle Settings</button>
      {showSettings && <Settings />}
    </div>
  );
}

export default App;

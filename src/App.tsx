import React, { useState } from 'react';
import './App.css';

const TODOIST_KEY = ""

const Todoist = () => {



  return <></>
}

function App() {
  const [value, setValue] = useState("");

  const [options, setOptions] = useState<string[]>([]);

  const onTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
    generateOpions(event.target.value.toString())
  }

  const generateOpions = (value: string) => {
    if (value === "g") {
      setOptions([ "https://google.com" ])
    } else {
      setOptions([])
    }
  }

  return (
    <div className="App">
      <input type="text" autoFocus value={value} onChange={onTextChange}></input>
      <p>{value}</p>
      {options.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
}

export default App;

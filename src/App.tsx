import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

const TODOIST_KEY = ""

const axiosInstance = axios.create({
  baseURL: "https://api.todoist.com/rest/v1/",
  headers: { Authorization: `Bearer ${TODOIST_KEY}`}
  
})

interface TodoistItem {
  id: number
  project_id: number
  section_id: number
  content: string
  description: string
  completed: boolean
  label_ids: number[]
  parent_id: number
  order: number
  priority: 1 | 2 | 3 | 4 | undefined
  due: TodoistDue
  url: string
  comment_count: number
  assignee: number
  assigner: number
}

interface TodoistDue {
  string: string
  date: string
  recurring: boolean
  datetime?: string
  timezone?: string
}

const TodoItems = () => {

  const [items, setItems] = useState<TodoistItem[]>([]);

  useEffect(() => {
    const syncTodoist = async () => {
      const result = await axiosInstance.get("tasks", { params: { filter: "today | overdue" } })

      console.log(result.data)
      setItems(result.data)
    }

    syncTodoist()
  }, [])

  return (
    <div>
      <h1>Today's Tasks</h1>
      {items.map((item) => (<p key={item.id}>{item.content} - {item.due.string}</p>))}
    </div>
  );
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

      <TodoItems />
    </div>
  );
}

export default App;

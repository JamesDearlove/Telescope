import React, { useEffect, useState } from "react";

export const Settings = () => {
  const [todoistKey, setTodoistKey] = useState("");

  useEffect(() => {
    setTodoistKey(localStorage.getItem("TodoistKey") || "")
  }, [])

  const todoistKeyOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoistKey(event.target.value);
  }

  const settingsSaveOnClick = () => {
    localStorage.setItem("TodoistKey", todoistKey);
  }

  return (
  <div>
    <input type="text" placeholder="Todoist API Key" value={todoistKey} onChange={todoistKeyOnChange} />
    <button onClick={settingsSaveOnClick} >Save</button>
  </div>
  );

}
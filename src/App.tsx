import React from "react";
import { Search } from "./components/Search";
import { Settings } from "./components/Settings";
import { TodoItems } from "./components/Todoist";

function App() {
  const backgroundImg = localStorage.getItem("BackgroundImg");

  const style = {
    background:
      backgroundImg !== ""
        ? `url(${backgroundImg}) no-repeat center center fixed`
        : "",
    backgroundSize: "cover",
  };

  return (
    <div
      className="h-screen flex flex-col items-center dark:text-white bg-white dark:bg-gray-900"
      style={style}
    >
      <Search />
      <TodoItems />
      <Settings  />
    </div>
  );
}

export default App;

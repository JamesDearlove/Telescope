import React from "react";
import { Bookmarks } from "./components/Bookmarks";
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
      className="h-screen w-screen grid grid-cols-1 grid-rows-layout p-4 gap-4 bg-white justify-between justify-items-center dark:text-white dark:bg-gray-900"
      style={style}
    >
      <div className="row-start-1 w-full">
        <Search />
      </div>
      <div className="row-start-2 w-full">
        <TodoItems />
      </div>
      <div className="row-start-3 w-full">
        <Bookmarks />
      </div>
      <Settings />
    </div>
  );
}

export default App;

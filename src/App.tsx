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

  // TODO: I don't like how the page is laid out, switching to a grid might be good here.
  return (
    <div
      className="h-screen flex flex-col justify-between items-center dark:text-white bg-white dark:bg-gray-900"
      style={style}
    >
      <Search />
      <TodoItems />
      <Bookmarks />
      <Settings  />
    </div>
  );
}

export default App;

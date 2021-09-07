import React from "react";
import { Bookmarks } from "./components/Bookmarks";
import { Search } from "./components/Search";
import Settings from "./components/Settings";
import { TodoItems } from "./components/Todoist";
import { page } from "./styles";

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
    <div className={page} style={style}>
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

import React, { useEffect, useState } from "react";
import { CogIcon } from "@heroicons/react/outline";

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [todoistKey, setTodoistKey] = useState("");
  const [todoistFilter, setTodoistFilter] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [textColour, setTextColour] = useState("");

  useEffect(() => {
    setTodoistKey(localStorage.getItem("TodoistKey") || "");
    setTodoistFilter(
      localStorage.getItem("TodoistFilter") ||
        "(today | overdue) & !assigned to: others"
    );
    setBackgroundImg(localStorage.getItem("BackgroundImg") || "");
    setTextColour(localStorage.getItem("TextColour") || "");
  }, []);

  const toggleShowSettings = () => setShowSettings(!showSettings);

  const todoistKeyOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoistKey(event.target.value);
  };
  
  const todoistFilterOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoistFilter(event.target.value);
  };

  const backgroundImgOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundImg(event.target.value);
  };

  const textColourOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextColour(event.target.value);
  };

  const settingsSaveOnClick = () => {
    localStorage.setItem("TodoistKey", todoistKey);
    localStorage.setItem("TodoistFilter", todoistFilter);
    localStorage.setItem("BackgroundImg", backgroundImg);
    localStorage.setItem("TextColour", textColour);
    setShowSettings(false);
  };

  return (
    <>
      <button
        className="absolute bottom-8 right-8 focus:outline-none"
        onClick={toggleShowSettings}
      >
        <CogIcon className="h-7 w-7" />
      </button>
      {showSettings && (
        <div className="absolute bottom-20 w-64 right-8 p-4 flex flex-col rounded-lg shadow border dark:border-black bg-white dark:bg-gray-800">
          <h1 className="mb-2">Todoist</h1>
          <input
            className="p-2 mb-2 w-56 rounded-lg border focus:outline-none dark:bg-gray-800"
            type="text"
            placeholder="Todoist API Key"
            value={todoistKey}
            onChange={todoistKeyOnChange}
          />
          <input
            className="p-2 mb-2 w-56 rounded-lg border focus:outline-none dark:bg-gray-800"
            type="text"
            placeholder="Todoist Task Filter"
            value={todoistFilter}
            onChange={todoistFilterOnChange}
          />
          <h1 className="my-2">Style</h1>
          <input
            className="p-2 mb-2 w-56 rounded-lg border focus:outline-none dark:bg-gray-800"
            type="text"
            placeholder="Background Image"
            value={backgroundImg}
            onChange={backgroundImgOnChange}
          />
          <input
            className="p-2 mb-2 w-56 rounded-lg border focus:outline-none dark:bg-gray-800"
            type="text"
            placeholder="Text Colour Override"
            value={textColour}
            onChange={textColourOnChange}
          />
          <button
            className="p-2 w-32 mt-2 rounded-lg border"
            onClick={settingsSaveOnClick}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

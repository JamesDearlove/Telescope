import React, { useState } from "react";

const isURL = (str: string) => {
  // const expression = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm
  const expression =
    /([\w+]+:\/\/)?([\w\d-]+\.)*[\w-]+[.:]\w+([/?=&#.]?[\w-]+)*\/?/gm;
  const regex = new RegExp(expression);
  return str.match(regex) != null;
};

export const Search = () => {
  const [value, setValue] = useState("");
  const [autoComplete, setAutoComplete] = useState("");

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    generateOptions(event.target.value.toString());
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isURL(value)) {
      if (value.includes("http") || value.includes("https")) {
        window.location.href = value;
        return;
      } else {
        window.location.href = `http://${value}`;
        return;
      }
    }

    switch (value) {
      case "":
        break;
      default:
        window.location.href = `https://duckduckgo.com/?q=${value}`;
        break;
    }
  };

  const generateOptions = (value: string) => {
    if (value.startsWith("!")) {
      setAutoComplete(`DuckDuckGo Bang: ${value}`);
      return;
    }
    if (isURL(value)) {
      setAutoComplete(`Navigate to ${value}`);
      return;
    }

    switch (value) {
      case "":
        setAutoComplete("");
        break;
      default:
        setAutoComplete(`Search: ${value}`);
        break;
    }
  };

  return (
    <>
      <div className="w-10/12 md:w-8/12 max-w-screen-md mt-24 mx-auto rounded-lg shadow border dark:border-black bg-white dark:bg-gray-800">
        <form onSubmit={onSubmit}>
          <div className="flex">
            <input
              className="p-4 flex-grow rounded-l-lg focus:outline-none dark:bg-gray-800"
              type="text"
              placeholder="What's next?"
              autoFocus
              value={value}
              onChange={onTextChange}
            />
            <button
              className="p-4 rounded-r-lg focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-900"
              type="submit"
            >
              Go
            </button>
          </div>
        </form>
      </div>
      {autoComplete !== "" && (
        <div className="w-10/12 md:w-8/12 max-w-screen-md mt-2 mx-auto px-4 py-2 z-10 rounded-lg shadow border dark:border-black bg-white dark:bg-gray-800 overflow-hidden">
          <span>{autoComplete}</span>
        </div>
      )}
    </>
  );
};

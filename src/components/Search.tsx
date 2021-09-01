import React, { useState } from "react";
import { background, base, combineStyles, hover } from "../styles";

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
      <div
        className={combineStyles([
          base,
          "w-10/12 md:w-8/12 max-w-screen-md mt-24 mx-auto",
        ])}
      >
        <form onSubmit={onSubmit}>
          <div className="flex">
            <input
              className={combineStyles([
                background,
                "p-4 flex-grow rounded-l-lg focus:outline-none",
              ])}
              type="text"
              placeholder="What's next?"
              autoFocus
              value={value}
              onChange={onTextChange}
            />
            <button
              className={combineStyles([
                background,
                hover,
                "p-4 rounded-r-lg focus:outline-none",
              ])}
              type="submit"
            >
              Go
            </button>
          </div>
        </form>
      </div>
      {autoComplete !== "" && (
        <div
          className={combineStyles([
            base,
            "w-10/12 md:w-8/12 max-w-screen-md mt-2 mx-auto px-4 py-2 z-10 relative overflow-hidden",
          ])}
        >
          <span>{autoComplete}</span>
        </div>
      )}
    </>
  );
};

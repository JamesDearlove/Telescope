import React, { useState } from "react";

export const Search = () => {
  const [value, setValue] = useState("");
  const [autoComplete, setAutoComplete] = useState("");

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    generateOptions(event.target.value.toString());
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    switch (value) {
      case "":
        setAutoComplete("");
        break;
      case "y":
        setAutoComplete("Open YouTube");
        break;
      default:
        setAutoComplete(`Search: ${value}`);
        break;
    }
  };

  return (
    <>
      <div className="mt-24 rounded-lg shadow-lg border w-8/12 max-w-screen-md">
        <form onSubmit={onSubmit}>
          <div className="flex">
            <input
              className="p-4 flex-grow focus:outline-none"
              type="text"
              placeholder="What's next?"
              autoFocus
              value={value}
              onChange={onTextChange}
            />
            <button className="p-4 bg-white focus:outline-none hover:bg-gray-100" type="submit">
              Go
            </button>
          </div>
        </form>
      </div>
      {autoComplete !== "" && (
        <div className="rounded-lg shadow border w-8/12 max-w-screen-md mt-40 p-4 absolute z-10 bg-white">
          <p>{autoComplete}</p>
        </div>
      )}
    </>
  );
};

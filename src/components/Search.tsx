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

    window.location.href = `https://duckduckgo.com/?q=${value}`
  };

  const generateOptions = (value: string) => {
    if (value.startsWith("!")) {
        setAutoComplete(`DuckDuckGo Bang: ${value}`);
        return
    }

    switch (value) {
        case "":
            setAutoComplete("");
            break;
        case "y":
            setAutoComplete("Open YouTube");
            break;
        default:
            setAutoComplete(`Search for ${value}`);
            break;
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          autoFocus
          value={value}
          onChange={onTextChange}
        ></input>
        <button type="submit">Go</button>
      </form>
        <p>{autoComplete}</p>
    </div>
  );
};

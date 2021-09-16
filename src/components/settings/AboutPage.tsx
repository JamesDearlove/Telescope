import React from "react";
import { textLink } from "../../styles";

export const AboutPage = () => {
  return (
    <>
      <h1 className="text-2xl">Telescope</h1>
      <div className="mt-2">
        <h3>Written by James Dearlove</h3>
        <p>A new tab focused on all the information you need right now.</p>
      </div>

      <div className="mt-8">
        <p>
          Telescope is licensed under the{" "}
          <a
            className={textLink}
            href="https://raw.githubusercontent.com/JamesDearlove/Telescope/main/LICENSE"
          >
            MIT License
          </a>
          .
        </p>
        <a
          className={textLink}
          href="https://github.com/JamesDearlove/Telescope"
        >
          GitHub
        </a>
        {" - "}
        <a
          className={textLink}
          href="https://twitter.com/ItsJimmyD"
        >
          Twitter
        </a>
        {" - "}
        <a
          className={textLink}
          href="https://jimmyd.dev"
        >
          My Other Projects
        </a>
      </div>
    </>
  );
};

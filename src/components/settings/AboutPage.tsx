import React from "react";

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
            href="https://raw.githubusercontent.com/JamesDearlove/Telescope/main/LICENSE"
          >
            MIT License
          </a>
          .
        </p>
        <a
          href="https://github.com/JamesDearlove/Telescope"
        >
          GitHub
        </a>
        {" - "}
        <a
          href="https://twitter.com/ItsJimmyD"
        >
          Twitter
        </a>
        {" - "}
        <a
          href="https://jimmyd.dev"
        >
          My Other Projects
        </a>
      </div>
    </>
  );
};

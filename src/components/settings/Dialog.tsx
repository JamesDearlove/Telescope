import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { base, combineStyles, rounded, selected } from "../../styles";
import { GeneralPage } from "./GeneralPage";
import { BookmarksPage } from "./BookmarksPage";
import { TodoistPage } from "./TodoistPage";
import { AboutPage } from "./AboutPage";

interface Page {
  name: string;
  component: JSX.Element;
}

const pages: Page[] = [
  { name: "General", component: <GeneralPage /> },
  { name: "Bookmarks", component: <BookmarksPage /> },
  { name: "Todoist", component: <TodoistPage /> },
  { name: "About", component: <AboutPage /> },
];

interface SidebarProps {
  selectedPage: Number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Sidebar = (props: SidebarProps) => {
  const classes = "p-2 mb-2";

  return (
    <ul>
      {pages.map((page, index) => (
        <li
          className={combineStyles([
            rounded,
            classes,
            index === props.selectedPage ? selected : "",
          ])}
          onClick={() => props.setSelectedPage(index)}
        >
          {page.name}
        </li>
      ))}
    </ul>
  );
};

interface DialogProps {
  setClosed: () => void;
}

export const Dialog = (props: DialogProps) => {
  const backgroundClasses =
    "z-50 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center";
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <>
      <div className={backgroundClasses}>
        <div
          className={combineStyles([
            base,
            "w-160 h-128 relative grid grid-cols-4",
          ])}
        >
          <div className="p-2 col-span-1">
            <Sidebar
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
          <div className="p-4 col-span-3">{pages[selectedPage].component}</div>
          <button className="absolute top-2 right-2" onClick={props.setClosed}>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

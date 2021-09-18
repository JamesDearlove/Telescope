import React, { useState } from "react";
import { GeneralPage } from "./GeneralPage";
import { BookmarksPage } from "./BookmarksPage";
import { TodoistPage } from "./TodoistPage";
import { AboutPage } from "./AboutPage";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

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
        <li onClick={() => props.setSelectedPage(index)}>{page.name}</li>
      ))}
    </ul>
  );
};

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Dialog = (props: DialogProps) => {
  const backgroundClasses =
    "z-50 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center";
  const [selectedPage, setSelectedPage] = useState(0);

  const onClose = () => props.setOpen(false);

  return (
    <Modal closeOnOverlayClick={false} isOpen={props.open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className={backgroundClasses}>
            <div>
              <div className="p-2 col-span-1 border-r dark:border-black">
                <Sidebar
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </div>
              <div className="p-4 col-span-3">
                {pages[selectedPage].component}
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

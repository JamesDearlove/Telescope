import React from "react";
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
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Tabs,
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

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Dialog = (props: DialogProps) => {
  const onClose = () => props.setOpen(false);

  return (
    <Modal
      size="xl"
      closeOnOverlayClick={false}
      isOpen={props.open}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingTop={0}>
          <Tabs>
            <TabList>
              {pages.map((page) => (
                <Tab key={page.name}>{page.name}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {pages.map((page) => (
                <TabPanel paddingX={0} key={page.name}>
                  {page.component}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

import { useState } from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Dialog } from "./Dialog";

const Settings = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        aria-label="Open settings"
        icon={<SettingsIcon />}
        position="absolute"
        bottom={8}
        right={8}
      />
      <Dialog open={open} setOpen={setOpen}/>
    </>
  );
};

export default Settings;

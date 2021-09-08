import React, { useState } from "react";
import { CogIcon } from "@heroicons/react/outline";
import { Dialog } from "./Dialog";

const Settings = () => {
  const [open, setOpen] = useState(false);

  const setClosed = () => setOpen(false);

  return (
    <>
      <button
        className="absolute bottom-8 right-8 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <CogIcon className="h-7 w-7" />
      </button>
      {open && <Dialog setClosed={setClosed} />}
    </>
  );
};

export default Settings;

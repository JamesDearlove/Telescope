import { useContext } from "react";
import { SettingContext } from "./Context";

export const useSettings = () => useContext(SettingContext);

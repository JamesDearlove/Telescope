import { useContext } from "react";
import { SettingContext } from "./Context";

export const useSetting = () => useContext(SettingContext);

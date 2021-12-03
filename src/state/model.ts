import { backgroundImgUrl } from "../settingNames";

export type State = {
  backgroundImage: string;
};

export const initialState: State = {
  backgroundImage: localStorage.getItem(backgroundImgUrl) ?? "",
};

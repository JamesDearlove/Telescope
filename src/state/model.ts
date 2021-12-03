import { backgroundImgUrl } from "../settingNames";

export type State = {
  backgroundImage: string | null;
};

export const initialState: State = {
  backgroundImage: localStorage.getItem(backgroundImgUrl) ?? null,
};

import { atom, useRecoilState } from "recoil";

export interface IAppBarState {
  title: string;
}

const appBarState = atom({
  key: "common/app-bar",
  default: {
    title: "",
  },
});

export const useAppBar = () => {
  const [appBar, setAppBar] = useRecoilState(appBarState);

  return {
    appBar,
    setAppBar,
  };
};

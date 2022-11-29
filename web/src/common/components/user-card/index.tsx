import { FC } from "react";
import { atom, useRecoilState } from "recoil";
import { useCheckMobile } from "../../hooks/use-check-mobile";
import UserCardDialog from "./components/user-card-dialog";
import UserCardPopover from "./components/user-card-popover";

export interface IUserCardState {
  userId: number;
  nickname?: string;
  el?: Element;
  open: boolean;
}
const userCardState = atom<IUserCardState>({
  key: "common/user-card",
  default: {
    open: false,
    userId: 3,
  },
});

export const useUserCard = () => {
  const { isMobile } = useCheckMobile();

  const [userCard, setUserCard] = useRecoilState(userCardState);

  const handleOpen = (el: Element, userId: number, nickname?: string) => {
    setUserCard({ userId, nickname, el, open: true });
  };
  const handleClose = () => setUserCard((prev) => ({ ...prev, open: false }));

  return {
    isMobile,
    userCard,
    handleOpen,
    setUserCard,
    handleClose,
  };
};

const UserCard: FC = () => {
  const { isMobile } = useUserCard();

  if (!isMobile) {
    return <UserCardPopover />;
  }

  return <UserCardDialog />;
};

export default UserCard;

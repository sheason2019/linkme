import { atom, useRecoilState } from "recoil";
import { getAccountClient } from "../../api-client";
import { User } from "../../api-lib/account-client";
import JwtProxy from "../utils/jwt";

interface UserInfo {
  isLogin: boolean;
  user?: User;
  jwt?: string;
}

const userInfoState = atom<UserInfo>({
  key: "common/user-info",
  default: {
    isLogin: false,
  },
});

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const getCurrentUser = async () => {
    // 没有JWT的话直接取消
    if (!JwtProxy.getJWT()) return;

    const client = getAccountClient();

    const [err, res] = await client.GetCurrentUser();
    if (err) {
      throw err;
    }

    setUserInfo((prev) => ({ ...prev, user: res }));
  };

  const setJwt = (jwt: string) => {
    setUserInfo({
      isLogin: true,
      jwt,
    });
    JwtProxy.setJwt(jwt, "session");
    getCurrentUser();
  };

  return {
    userInfo,
    setUserInfo,
    setJwt,
  };
};

export default useUserInfo;

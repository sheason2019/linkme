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

    return res;
  };

  // 设置Jwt，并返回根据Jwt拿到的用户数据
  const setJwt = (jwt: string) => {
    setUserInfo({
      isLogin: true,
      jwt,
    });
    JwtProxy.setJwt(jwt, "session");
    return getCurrentUser();
  };

  // 利用持久化数据进行预登陆操作，若登录成功返回true，否则返回false
  const preLogin = async () => {
    const jwt = JwtProxy.getJWT();
    if (!jwt) return false;

    const user = await setJwt(jwt);
    return !!user;
  };

  return {
    userInfo,
    setUserInfo,
    setJwt,
    preLogin,
  };
};

export default useUserInfo;

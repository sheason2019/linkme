import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { getAccountClient } from "../../api-client";
import { User } from "../../api-lib/account-client";
import { LOGIN_PAGE_URL } from "../../router";
import JwtProxy from "../utils/jwt";
import useErrorHandler from "./use-error-handler";

interface UserInfo {
  isLogin: boolean;
  user?: User;
}

const userInfoState = atom<UserInfo>({
  key: "common/user-info",
  default: {
    isLogin: false,
  },
});

const useUserInfo = () => {
  const navigate = useNavigate();
  const { handler } = useErrorHandler();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const getCurrentUser = async () => {
    // 没有JWT的话直接取消
    if (!JwtProxy.getJWT()) return;

    const client = getAccountClient();

    const [err, res] = await client.GetCurrentUser();
    if (err) {
      handler(err);
      return;
    }

    setUserInfo((prev) => ({ ...prev, user: res }));

    return res;
  };

  // 设置Jwt，并返回根据Jwt拿到的用户数据
  const setJwt = (jwt: string, target: "session" | "local" = "session") => {
    setUserInfo({
      isLogin: true,
    });
    JwtProxy.setJwt(jwt, target);
    return getCurrentUser();
  };

  // 利用持久化数据进行预登陆操作，若登录成功返回true，否则返回false
  const preLogin = async () => {
    const jwt = JwtProxy.getJWT();
    if (!jwt) {
      JwtProxy.clearJwt();
      return false;
    }

    if (await setJwt(jwt)) {
      return true;
    } else {
      JwtProxy.clearJwt();
      return false;
    }
  };

  // 退出登录功能
  const logout = () => {
    // 清除内存中的用户信息
    setUserInfo({
      isLogin: false,
    });
    // 清除持久化存储的Jwt信息
    JwtProxy.clearJwt();
    // 跳转到登录页面
    navigate(LOGIN_PAGE_URL);
  };

  return {
    userInfo,
    setUserInfo,
    setJwt,
    preLogin,
    logout,
  };
};

export default useUserInfo;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountClient } from "../../../api-client";
import { User } from "../../../api-lib/account-client";
import useErrorHandler from "../../../common/hooks/use-error-handler";
import useUserInfo from "../../../common/hooks/use-user-info";
import { APP_URLS } from "../../../router";
import useCryptoInfo from "../common/crypto-info";
import { LoginInfo, validateLogin } from "../common/validate";

const useLogin = () => {
  const { handler } = useErrorHandler();

  const navigate = useNavigate();

  const { userInfo, setJwt } = useUserInfo();
  const { cryptoInfo, encryptPassword, loadingCryptoInfo } = useCryptoInfo();

  // 预登陆逻辑
  useEffect(() => {
    if (userInfo.isLogin) {
      navigate(APP_URLS.CURRENT_USER_PAGE_URL);
    }
  }, []);

  // 表单内容
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LoginInfo>({
    username: "",
    password: "",
    useLocal: false,
  });
  const [err, setErr] = useState<Partial<LoginInfo>>({});

  const handleSubmit = async () => {
    const validate = validateLogin(form);
    if (Object.keys(validate).length > 0) {
      setErr(validate);
      return;
    }

    const client = getAccountClient();
    const user: User = {
      UserId: 0,
      Username: form.username,
      Password: encryptPassword(form.password)!,
    };

    setLoading(true);
    const [err, res] = await client.Login(user, cryptoInfo.SaltId);
    setLoading(false);

    if (err) {
      handler(err);
      return;
    }
    await setJwt(res, form.useLocal ? "local" : "session");
    navigate(APP_URLS.CURRENT_USER_PAGE_URL);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErr((prev) => ({ ...prev, [e.target.name]: undefined }));
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return {
    form,
    setForm,
    err,
    setErr,
    handleSubmit,
    handleChange,
    loading,
    loadingCryptoInfo,
  };
};

export default useLogin;

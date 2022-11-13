import { useEffect, useState } from "react";
import { getAccountClient } from "../../../api-client";
import { User } from "../../../api-lib/account-client";
import { useAppBar } from "../../../common/hooks/use-app-bar";
import useUserInfo from "../../../common/hooks/use-user-info";
import useCryptoInfo from "../common/crypto-info";
import { RegistInfo, validateLogin } from "../common/validate";

const useLogin = () => {
  const { setJwt } = useUserInfo();
  const { cryptoInfo, encryptPassword, loadingCryptoInfo } = useCryptoInfo();
  // 设置标题
  const { setAppBar } = useAppBar();

  useEffect(() => {
    setAppBar((prev) => ({ ...prev, title: "用户登录" }));
  }, []);

  // 表单内容
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState<Partial<RegistInfo>>({});

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
      Password: encryptPassword(form.password),
    };

    setLoading(true);
    const [err, res] = await client.Login(user, cryptoInfo.SaltId);
    setLoading(false);

    if (err) {
      throw err;
    }
    setJwt(res);
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

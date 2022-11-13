import { useEffect, useState } from "react";
import { getAccountClient } from "../../../api-client";
import { User } from "../../../api-lib/account-client";
import { useAppBar } from "../../../common/hooks/use-app-bar";
import useUserInfo from "../../../common/hooks/use-user-info";
import useCryptoInfo from "../common/crypto-info";
import { RegistInfo, validateRegist } from "../common/validate";

const useRegist = () => {
  // 登录注册相关的Hook
  const { setJwt } = useUserInfo();
  const { cryptoInfo, encryptPassword, loadingCryptoInfo } = useCryptoInfo();

  // 修改AppBar标题内容
  const { setAppBar } = useAppBar();
  useEffect(() => {
    setAppBar((prev) => ({ ...prev, title: "用户注册" }));
  }, []);

  // 表单内容
  const [form, setForm] = useState<RegistInfo>({
    username: "",
    password: "",
    repassword: "",
  });
  const [err, setErr] = useState<Partial<RegistInfo>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErr((prev) => ({ ...prev, [e.target.name]: undefined }));
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const validate = validateRegist(form);
    if (Object.keys(validate).length !== 0) {
      setErr(validate);
      return;
    }

    const password = encryptPassword(form.password);

    const user: User = {
      UserId: 0,
      Username: form.username,
      Password: password,
    };
    const client = getAccountClient();
    setLoading(true);
    const [err, res] = await client.Regist(user, cryptoInfo.SaltId);
    setLoading(false);
    if (err) {
      throw err;
    }

    setJwt(res);
  };

  return {
    form,
    setForm,
    err,
    setErr,
    handleSubmit,
    handleChange,
    loadingCryptoInfo,
    loading,
  };
};

export default useRegist;

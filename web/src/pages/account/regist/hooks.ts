import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountClient } from "../../../api-client";
import { User } from "../../../api-lib/account-client";
import useErrorHandler from "../../../common/hooks/use-error-handler";
import useUserInfo from "../../../common/hooks/use-user-info";
import { APP_URLS } from "../../../router";
import useCryptoInfo from "../common/crypto-info";
import { RegistInfo, validateRegist } from "../common/validate";

const useRegist = () => {
  const { handler } = useErrorHandler();

  const navigate = useNavigate();
  // 登录注册相关的Hook
  const { setJwt } = useUserInfo();
  const { cryptoInfo, encryptPassword, loadingCryptoInfo } = useCryptoInfo();

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

    const user: User = {
      UserId: 0,
      Username: form.username,
      Password: encryptPassword(form.password)!,
    };
    const client = getAccountClient();
    setLoading(true);
    const [err, res] = await client.Regist(user, cryptoInfo.SaltId);
    setLoading(false);
    if (err) {
      handler(err);
      return;
    }

    setJwt(res);
    navigate(APP_URLS.CURRENT_USER_PAGE_URL);
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

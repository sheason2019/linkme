import { useEffect, useState } from "react";
import { getAccountClient } from "../../../api-client";
import { User } from "../../../api-lib/account-client";
import { useAppBar } from "../../../common/hooks/use-app-bar";
import useCryptoInfo from "../common/crypto-info";
import { RegistInfo, validateRegist } from "../common/validate";

const useRegist = () => {
  const { cryptoInfo, encryptPassword } = useCryptoInfo();

  const { setAppBar } = useAppBar();
  useEffect(() => {
    setAppBar((prev) => ({ ...prev, title: "用户注册" }));
  }, []);

  const [form, setForm] = useState<RegistInfo>({
    username: "",
    password: "",
    repassword: "",
  });
  const [err, setErr] = useState<Partial<RegistInfo>>({});

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

    const [err, res] = await client.Regist(user, cryptoInfo.SaltId);
    if (err) {
      throw err;
    }

    console.log(res);
  };

  return {
    form,
    setForm,
    err,
    setErr,
    handleSubmit,
    handleChange,
  };
};

export default useRegist;

import { useEffect, useState } from "react";
import { getAccountClient } from "../../../api-client";
import { useAppBar } from "../../../common/hooks/use-app-bar";
import { RegistInfo, validateLogin } from "../common/validate";

const useLogin = () => {
  // 设置标题
  const { setAppBar } = useAppBar();

  useEffect(() => {
    setAppBar((prev) => ({ ...prev, title: "用户登录" }));
  }, []);

  // 表单内容
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
  };
};

export default useLogin;

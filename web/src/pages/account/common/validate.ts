export interface RegistInfo {
  username: string;
  password: string;
  repassword: string;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export const validateRegist = ({
  username,
  password,
  repassword,
}: RegistInfo): Partial<RegistInfo> => {
  const err: Partial<RegistInfo> = {};
  /** 表单验证逻辑 */
  if (username.length < 4 || username.length > 16) {
    err.username = "用户名长度不能小于4位或大于16位";
  }
  if (password.length < 6 || password.length > 64) {
    err.password = "用户密码长度不能小于4位或大于16位";
  }
  if (repassword !== password) {
    err.repassword = "两次输入密码内容不一致";
  }

  return err;
};

export const validateLogin = ({
  username,
  password,
}: LoginInfo): Partial<LoginInfo> => {
  const err: Partial<LoginInfo> = {};
  /** 登录需要简单校验表单内容是否为空 */
  if (username.length === 0) {
    err.username = "用户名不能为空";
  }
  if (password.length === 0) {
    err.password = "密码不能为空";
  }

  return err;
};

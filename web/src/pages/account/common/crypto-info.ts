import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { getAccountClient } from "../../../api-client";
import JSEncrypt from "jsencrypt";

import type { GetCryptoInfoResponse } from "../../../api-lib/account-client";

const cryptoInfoState = atom<GetCryptoInfoResponse>({
  key: "account/salt",
  default: {
    Salt: "",
    SaltId: -1,
    RsaPubKey: "",
  },
});

const useCryptoInfo = () => {
  const [loading, setLoading] = useState(false);
  const [cryptoInfo, setCryptoInfo] = useRecoilState(cryptoInfoState);

  const fetchCryptoInfo = async () => {
    setLoading(true);
    const client = getAccountClient();
    const [err, res] = await client.GetCryptoInfo();
    setLoading(false);
    if (err) {
      throw err;
    }

    setCryptoInfo(res);
  };

  useEffect(() => {
    fetchCryptoInfo();
  }, []);

  const encryptPassword = (password: string) => {
    const encrypter = new JSEncrypt();
    encrypter.setPublicKey(cryptoInfo.RsaPubKey);
    const encrypted = encrypter.encrypt(password + cryptoInfo.Salt);
    if (!encrypted) {
      throw new Error("加密过程出现未知错误");
    }

    return encrypted;
  };

  return {
    cryptoInfo,
    fetchCryptoInfo,
    encryptPassword,
    loadingCryptoInfo: loading,
  };
};

export default useCryptoInfo;

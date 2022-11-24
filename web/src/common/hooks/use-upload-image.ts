import { useState } from "react";
import { getAxiosInstance } from "../../api-client";
import useErrorHandler from "./use-error-handler";

const useUploadImage = () => {
  const { strHandler } = useErrorHandler();

  const [image, setImage] = useState<File | null>(null);

  const [imageHash, setImageHash] = useState("");

  // 选取图片逻辑，使用Promise来实现图片选取的异步响应
  const handleSelectImage = () => {
    let resolver: (file: File | null) => void;
    const promise = new Promise<File | null>((res) => (resolver = res));

    // 首先构建一个Dom，执行上传逻辑
    const uploader = document.createElement("input");
    uploader.accept = "image/jpeg,image/png";
    uploader.type = "file";

    uploader.oninput = (e) => {
      const target = e.target as HTMLInputElement;

      const file = target.files === null ? null : target.files[0];
      if (file) {
        setImage(file);
      }

      uploader.remove();
      resolver(file);
    };
    uploader.click();

    return promise;
  };

  const handleUploadImage = async (): Promise<string> => {
    if (!image) {
      throw "图像不存在";
    }

    const formData = new FormData();
    formData.append("file", image);

    const client = getAxiosInstance();
    try {
      const res = await client.post("/api/upload", formData);

      setImageHash(res.data);
      return res.data;
    } catch (e: any) {
      throw e?.response?.data ?? e.message;
    }
  };

  return {
    image,
    setImage,
    imageHash,
    setImageHash,
    handleSelectImage,
    handleUploadImage,
  };
};

export default useUploadImage;

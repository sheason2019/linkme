import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import { getAxiosInstance } from "../../../../api-client";

const AVATAR_SIZE = 256;

const handleUploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const client = getAxiosInstance();
  const res = await client.post("/api/upload", formData);
  console.log(res);
};

const UploadAvatarDialog = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);

  const handleOnClick = () => {
    const input = inputRef.current;
    if (!input) return;

    input.click();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files === null ? null : e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Dialog open>
      <DialogTitle>上传头像</DialogTitle>
      <DialogContent>
        <Tooltip title="点击切换头像" arrow>
          <Avatar
            onClick={handleOnClick}
            src={image === null ? undefined : URL.createObjectURL(image)}
            sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, cursor: "pointer" }}
          />
        </Tooltip>
        <input
          ref={inputRef}
          onChange={handleOnChange}
          accept="image/jpeg,image/png"
          type="file"
          hidden
        />
      </DialogContent>
      <DialogActions>
        <Button>取消</Button>
        <Button onClick={() => image && handleUploadFile(image)}>提交</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadAvatarDialog;

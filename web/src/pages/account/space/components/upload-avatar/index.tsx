import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useMemo, useState } from "react";
import { getAccountClient } from "../../../../../api-client";
import LinkmeAvatar from "../../../../../common/components/linkme-avatar";
import useErrorHandler from "../../../../../common/hooks/use-error-handler";
import useUploadImage from "../../../../../common/hooks/use-upload-image";
import useUserInfo from "../../../../../common/hooks/use-user-info";

const AVATAR_SIZE = 256;

const UploadAvatar = () => {
  const { userInfo, getCurrentUser } = useUserInfo();
  const { strHandler } = useErrorHandler();
  const { image, handleSelectImage, handleUploadImage } = useUploadImage();

  const [open, setOpen] = useState(false);

  // 上传头像链路
  const handleSubmit = async () => {
    try {
      // 首先上传用户的图片，获取图片的哈希值
      const imageHash = await handleUploadImage();
      // 设置头像
      const client = getAccountClient();
      const [err] = await client.PutAvatar(imageHash);
      if (err) {
        strHandler(err.message);
        return;
      }
      // 如果设置头像成功，则重新拉取用户信息
      await getCurrentUser();
      // 关闭Dialog
      setOpen(false);
    } catch (e: any) {
      strHandler(e);
    }
  };

  const defaultAvatarUrl = useMemo(() => {
    const avatarUrl = userInfo.user?.AvatarUrl;
    if (!avatarUrl) {
      return undefined;
    }

    return `/api/image/${avatarUrl}`;
  }, [userInfo.user?.AvatarUrl]);
  return (
    <>
      <Tooltip title="点击切换头像" arrow>
        <LinkmeAvatar
          onClick={() => setOpen(true)}
          size={AVATAR_SIZE}
          sourceHash={userInfo.user?.AvatarUrl}
        />
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>上传头像</DialogTitle>
        <DialogContent>
          <Tooltip title="点击切换头像" arrow>
            <Avatar
              onClick={handleSelectImage}
              src={
                image === null ? defaultAvatarUrl : URL.createObjectURL(image)
              }
              sx={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={handleSubmit}>提交</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadAvatar;

import useUploadImage from "../../../common/hooks/use-upload-image";
import useChat from "./use-chat";
import useSocket from "./use-socket";

// 用户发送图片信息
const useImageMessage = () => {
  const { chat } = useChat();

  const { handleSelectImage, handleUploadImage, image, setImage } =
    useUploadImage();
  const { handlePostMessage } = useSocket();

  const handleSendImage = async () => {
    const sourceHash = await handleUploadImage();

    handlePostMessage(sourceHash, chat.currentConv!.Id, "image");
    setImage(null);
  };

  return {
    image,
    handleSelectImage,
    handleSendImage,
  };
};

export default useImageMessage;

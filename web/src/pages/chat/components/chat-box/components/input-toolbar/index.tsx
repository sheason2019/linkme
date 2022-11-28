import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
import useImageMessage from "../../../../hooks/use-image-message";

const InputToolbar = () => {
  const { image, handleSelectImage, handleSendImage } = useImageMessage();

  return (
    <>
      <Stack
        sx={{ height: "2.5rem", px: 1 }}
        direction="row"
        alignItems="center"
      >
        <IconButton onClick={handleSelectImage}>
          <ImageOutlinedIcon />
        </IconButton>
      </Stack>
      <Dialog open={!!image}>
        <DialogTitle>预览图片</DialogTitle>
        <DialogContent>
          {image && <img width="100%" src={URL.createObjectURL(image)} />}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSendImage}>
            发送
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InputToolbar;

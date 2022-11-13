import { OmiError } from "@omi-stack/omi-client/dist/typings";
import { useSnackbar } from "notistack";

const useErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handler = (err: OmiError) => {
    strHandler(err.message);
  };

  const strHandler = (str: string) => {
    enqueueSnackbar(str, { variant: "error" });
  };

  return { handler, strHandler };
};

export default useErrorHandler;

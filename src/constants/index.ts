import { toast, ToastOptions } from "react-toastify";
export const snackBarErrorDefaultOptions: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  type: "error",
  theme: "colored",
};

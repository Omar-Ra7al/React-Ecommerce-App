import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useSelector, useDispatch } from "react-redux";
import { popup } from "../features/products/productsSlice";

export default function CustomizedSnackbars() {
  const productsState = useSelector((state) => state.products.productsState);
  const popupState = productsState.popup;

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(popup({ msg: "", close: true }));
  };

  return (
    <div>
      <Snackbar open={popupState.open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          // add another style if the product in cart
          severity={productsState.popup.color}
          variant="filled"
          sx={{ width: "100%" }}>
          {/* This is a success Alert inside a Snackbar! */}
          {popupState.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

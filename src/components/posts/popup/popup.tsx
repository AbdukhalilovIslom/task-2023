import { Dialog } from "@mui/material";
import "./style.scss";

export default function Popup({
  open,
  handleClickYes,
  handleClickNo,
}: {
  open: boolean;
  handleClickYes: () => void;
  handleClickNo: () => void;
}) {
  return (
    <Dialog onClose={handleClickNo} open={open}>
      <div className="delete__popup">
        <h2>Are you sure?</h2>
        <div className="delete__popup__bts">
          <button onClick={() => handleClickYes()}>Yes</button>
          <button onClick={() => handleClickNo()}>No</button>
        </div>
      </div>
    </Dialog>
  );
}

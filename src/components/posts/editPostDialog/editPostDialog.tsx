// MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dialog } from "@mui/material";
import { useAppContext } from "../../../context";

import "./style.scss";

export default function EditPostDialog() {
  const { posts, setPosts, users, open, dialogItem, setOpen, setDialogItem } =
    useAppContext();
  const handleSaveEdited = () => {
    setPosts(
      posts && dialogItem
        ? posts.map((post) => (post.id === dialogItem.id ? dialogItem : post))
        : null
    );
    handleClose();
  };

  const handleChangePostUser = (event: SelectChangeEvent) => {
    setDialogItem(dialogItem && { ...dialogItem, userId: +event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setDialogItem(null);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="edit__post">
        <h4>{users?.find((el) => el.id === dialogItem?.userId)?.name}</h4>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel
            sx={{ color: "#fff" }}
            id="demo-simple-select-autowidth-label"
          >
            User
          </InputLabel>
          <Select
            sx={{ color: "#fff" }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={String(dialogItem?.userId)}
            onChange={handleChangePostUser}
            autoWidth
            label="User"
          >
            {users?.map((el, index) => {
              return (
                <MenuItem key={index} value={String(el.id)}>
                  {el.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <textarea
          onChange={(e) =>
            setDialogItem(
              dialogItem && { ...dialogItem, title: String(e.target.value) }
            )
          }
          rows={5}
          cols={400}
          value={dialogItem?.title}
        />
        <textarea
          onChange={(e) =>
            setDialogItem(dialogItem && { ...dialogItem, body: e.target.value })
          }
          rows={10}
          cols={400}
          value={dialogItem?.body}
        />

        <div className="post__edit__bts">
          <button onClick={() => handleSaveEdited()}>Save</button>
          <button onClick={() => handleClose()}>Cancel</button>
        </div>
      </div>
    </Dialog>
  );
}

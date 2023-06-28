import { useAppContext } from "../../../context";
import { Album, DeleteItem } from "../../../data/interfaces";
import { Link } from "react-router-dom";

// MUI
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

// Image
import { ReactComponent as EditIcon } from "../../../assets/svg/icons8-редактировать.svg";
import { ReactComponent as Save } from "../../../assets/svg/icons8-закладка-лента.svg";
import { ReactComponent as Delete } from "../../../assets/svg/icons8-удалить.svg";
import { useState } from "react";
import Popup from "../../posts/popup/popup";
import { Dialog } from "@mui/material";
import Loading from "../../loading/loading";

import "./style.scss";

export default function Albums() {
  const saveds = JSON.parse(localStorage.getItem("savedPhotos") || "[]");
  const { users, albums, setAlbums } = useAppContext();
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [savedPhotos, setSavedPhotos] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [dialogItem, setDialogItem] = useState<Album | null>(null);
  const [deleteItem, setDeleteItem] = useState<DeleteItem>({
    open: false,
    value: null,
  });
  const [openSelected, setOpenSelected] = useState<boolean>(false);

  const handleClickOpenPhotoEdit = (
    id: number,
    title: string,
    userId: number
  ) => {
    setOpen(true);
    setDialogItem({
      userId: userId,
      id: id,
      title: title,
    });
  };

  const handlePhotoSave = (id: number) => {
    const saved = saveds.includes(id)
      ? saveds.filter((el: number) => el !== id)
      : [...saveds, id];
    localStorage.setItem("savedPhotos", JSON.stringify(saved));
    setSavedPhotos(saved);
  };

  const handleCheck = (e: number, type: boolean) => {
    if (!e) return undefined;

    setCheckedList(
      type ? [...checkedList, e] : checkedList.filter((el) => el !== e)
    );
  };

  const handleClickOpenPhotoDelete = (id: number) => {
    setDeleteItem({
      open: true,
      value: id,
    });
  };

  const handleDeletePhoto = () => {
    if (!albums || !deleteItem) return undefined;

    const result = saveds.filter((el: number) => el !== deleteItem.value);
    localStorage.setItem("savedPosts", JSON.stringify(result));
    setAlbums(albums.filter(({ id }) => id !== deleteItem.value));

    handleClosePhotoDelete();
  };

  const handleClosePhotoDelete = () => {
    setDeleteItem({
      open: false,
      value: null,
    });
  };

  const handleDeleteSelected = () => {
    if (!albums || !checkedList) return undefined;

    setAlbums(albums.filter(({ id }) => !checkedList.includes(id)));

    const result = savedPhotos.filter((id) => !checkedList.includes(id));
    console.log(result);
    localStorage.setItem("savedPhotos", JSON.stringify(result));
    setCheckedList([]);
    handleCloseSelectedDelete();
  };

  const handleCloseSelectedDelete = () => {
    setOpenSelected(false);
    setCheckedList([]);
  };

  const handlePhotoSaveSelected = () => {
    const mySet = new Set(checkedList.concat(savedPhotos));
    const result = Array.from(mySet);

    localStorage.setItem("savedPhotos", JSON.stringify(result));
    setSavedPhotos(result);
    setCheckedList([]);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  const handleChangePhotoUser = (event: SelectChangeEvent) => {
    setDialogItem(dialogItem && { ...dialogItem, userId: +event.target.value });
  };
  const handleSaveEdited = () => {
    setAlbums(
      albums && dialogItem
        ? albums.map((post) => (post.id === dialogItem.id ? dialogItem : post))
        : null
    );
    handleCloseEdit();
  };

  return (
    <div>
      <div style={{ display: checkedList.length ? "block" : "none" }}>
        <button onClick={() => setOpenSelected(true)}>Delete Selected</button>
        <button onClick={handlePhotoSaveSelected}>Save Selected</button>
      </div>
      <div className="albums">
        {albums && albums.length ? (
          albums.map(({ userId, title, id }, index) => {
            return (
              <div className="album" key={index}>
                <Link to={`/photos/view/${id}`}>
                  <label>Title:</label>
                  {title}
                </Link>

                <p>
                  <label>User:</label>
                  {users?.find(({ id }) => id === userId)?.name}
                </p>
                <div className="albums__icons">
                  <EditIcon
                    onClick={() => handleClickOpenPhotoEdit(id, title, userId)}
                  />
                  <Save
                    onClick={() => handlePhotoSave(id)}
                    style={{
                      fill: savedPhotos?.includes(id) ? "#fff" : "black",
                    }}
                  />
                  <Delete onClick={() => handleClickOpenPhotoDelete(id)} />
                  <input
                    type="checkbox"
                    value={id}
                    checked={checkedList.includes(id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleCheck(Number(e.target.value), e.target.checked);
                    }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <Loading loading />
        )}
      </div>
      <Dialog onClose={handleCloseEdit} open={open}>
        <div className="edit__album">
          <textarea
            value={dialogItem?.title}
            onChange={(e) =>
              setDialogItem(
                dialogItem && { ...dialogItem, title: String(e.target.value) }
              )
            }
            rows={5}
            cols={400}
          ></textarea>
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 120, color: "#fff" }}
          >
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
              onChange={handleChangePhotoUser}
              autoWidth
              label="Age"
            >
              {users?.map(({ name, id }, index) => {
                return (
                  <MenuItem key={index} value={id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div className="album__edit__bts">
            <button onClick={() => handleSaveEdited()}>Save</button>
            <button onClick={() => handleCloseEdit()}>Cancel</button>
          </div>
        </div>
      </Dialog>

      <Popup
        open={deleteItem?.open}
        handleClickYes={handleDeletePhoto}
        handleClickNo={handleClosePhotoDelete}
      />
      <Popup
        open={openSelected}
        handleClickYes={handleDeleteSelected}
        handleClickNo={handleCloseSelectedDelete}
      />
    </div>
  );
}

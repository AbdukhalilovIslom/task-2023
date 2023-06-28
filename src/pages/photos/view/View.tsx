import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../../hooks/useRequest";
import { Photo } from "../../../data/interfaces";
import { Dialog } from "@mui/material";

// Image
import CloseIcon from "@mui/icons-material/Close";

import Loading from "../../../components/loading/loading";

import "./style.scss";

export default function PhotoView() {
  const { id } = useParams();
  const { request } = useHttp();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    request(`/photos/${id}`).then(setPhoto);
  }, []); // eslint-disable-line

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="view">
      {photo?.url ? (
        <img
          className="view__image"
          src={photo?.url}
          alt="album_img"
          onClick={handleOpen}
        />
      ) : (
        <Loading loading />
      )}
      <p>
        <label>Title:</label> {photo?.title}
      </p>
      <Dialog onClose={handleClose} open={open}>
        <div className="album_img_popup">
          <CloseIcon sx={{ color: "#fff" }} onClick={handleClose} />
          {photo?.url ? (
            <img src={photo?.url} alt="album_img" />
          ) : (
            <Loading loading />
          )}
        </div>
      </Dialog>
    </div>
  );
}

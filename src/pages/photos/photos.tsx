import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context";
import { useHttp } from "../../hooks/useRequest";
import { Album } from "../../data/interfaces";

// Components
import Albums from "../../components/photos/albums/albums";
import Pagination from "../../components/photos/pagination/pagination";

export default function Photos() {
  const { request } = useHttp();
  const { photoPagination, setPhotoPagination, setAlbums } = useAppContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    request(
      `/albums?_limit=${photoPagination.limit}&_page=${photoPagination.page}`
    ).then((res) => {
      setAlbums(res);
      setLoading(false);
    });
  }, [photoPagination]); // eslint-disable-line

  return (
    <div>
      <Albums />
      <Pagination loading={loading} setLoading={setLoading} />
    </div>
  );
}

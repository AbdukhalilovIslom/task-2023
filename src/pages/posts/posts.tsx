import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useRequest";

// Components
import Pagination from "../../components/posts/pagination/pagination";
import Popup from "../../components/posts/popup/popup";
import Edit from "../../components/posts/edit/edit";
import Items from "../../components/posts/items/items";
import EditPostDialog from "../../components/posts/editPostDialog/editPostDialog";
import { useAppContext } from "../../context";
import Filter from "../../components/posts/filter/filter";

import "./style.scss";

export default function Posts() {
  const { request } = useHttp();
  const [loading, setLoading] = useState(false);
  const {
    saveds,
    posts,
    checkedList,
    deleteItem,
    openSelected,
    savedPosts,
    postPagination,
    setPosts,
    setCheckedList,
    setOpenSelected,
    setDeleteItem,
  } = useAppContext();

  useEffect(() => {
    request(
      `/posts?_limit=${postPagination.limit}&_page=${postPagination.page}`
    ).then((res) => {
      setPosts(res);
      setLoading(false);
    });
  }, [postPagination]); // eslint-disable-line

  const handleClosePostDelete = () => {
    setDeleteItem({
      open: false,
      value: null,
    });
  };

  const handleDeletePost = () => {
    if (!posts || !deleteItem) return undefined;

    const result = saveds.filter((el: number) => el !== deleteItem.value);
    localStorage.setItem("savedPosts", JSON.stringify(result));
    setPosts(posts.filter(({ id }) => id !== deleteItem.value));

    handleClosePostDelete();
  };

  const handleDeleteSelected = () => {
    if (!posts || !checkedList) return undefined;

    setPosts(posts.filter(({ id }) => !checkedList.includes(id)));

    const result = savedPosts.filter((id) => !checkedList.includes(id));
    console.log(result);
    localStorage.setItem("savedPosts", JSON.stringify(result));
    setCheckedList([]);
    handleCloseSelectedDelete();
  };

  const handleCloseSelectedDelete = () => {
    setOpenSelected(false);
    setCheckedList([]);
  };

  return (
    <div className="posts">
      <div className="posts__edit">
        <div className="posts__selected">
          <Edit />
        </div>
        <Filter />
      </div>
      <Items />
      <Pagination loading={loading} setLoading={setLoading} />
      <EditPostDialog />
      <Popup
        open={deleteItem.open}
        handleClickYes={handleDeletePost}
        handleClickNo={handleClosePostDelete}
      />
      <Popup
        open={openSelected}
        handleClickYes={handleDeleteSelected}
        handleClickNo={handleCloseSelectedDelete}
      />
    </div>
  );
}

import { useState } from "react";

// Image
import { ReactComponent as EditIcon } from "../../../assets/svg/icons8-редактировать.svg";
import { ReactComponent as Save } from "../../../assets/svg/icons8-закладка-лента.svg";
import { ReactComponent as CommentIcon } from "../../../assets/svg/icons8-комментарии.svg";
import { ReactComponent as Delete } from "../../../assets/svg/icons8-удалить.svg";
import { Comment, Post } from "../../../data/interfaces";
import { useHttp } from "../../../hooks/useRequest";
import { useAppContext } from "../../../context";
import Loading from "../../loading/loading";

import "./style.scss";

export default function Items() {
  const {
    saveds,
    posts,
    checkedList,
    users,
    savedPosts,
    postFilter,
    setCheckedList,
    setOpen,
    setDialogItem,
    setSavedPosts,
    setDeleteItem,
  } = useAppContext();
  const { request } = useHttp();
  const [activeComm, setActiveComm] = useState<number | null>(null);
  const [activeCommText, setActiveCommText] = useState<Comment[] | null>(null);

  const handleFilter = {
    Title: (a: Post, b: Post) => a.title.localeCompare(b.title),
    ID: (a: Post, b: Post) => a.id - b.id,
    User: (a: Post, b: Post) =>
      (users?.find(({ id }) => a.userId === id)?.name || "").localeCompare(
        users?.find(({ id }) => b.userId === id)?.name || ""
      ),
    Saved: (a: Post, b: Post) =>
      savedPosts.includes(a.id) === savedPosts.includes(b.id)
        ? 0
        : savedPosts.includes(a.id)
        ? -1
        : 1,
  };

  const handleCheck = (e: number, type: boolean) => {
    if (!e) return undefined;

    setCheckedList(
      type ? [...checkedList, e] : checkedList.filter((el) => el !== e)
    );
  };

  const handleClickOpenPostDelete = (id: number) => {
    setDeleteItem({
      open: true,
      value: id,
    });
  };

  const handleCommentClick = (id: number) => {
    setActiveCommText(null);

    if (activeComm === id) {
      setActiveComm(null);
      return;
    }

    request(`/posts/${id}/comments`).then(setActiveCommText);
    setActiveComm(id);
  };

  const handleClickOpenPostEdit = (
    id: number,
    title: string,
    body: string,
    userId: number
  ) => {
    setOpen(true);
    setDialogItem({
      id: id,
      title: title,
      body: body,
      userId: userId,
    });
  };

  const handlePostSave = (id: number) => {
    const saved = saveds.includes(id)
      ? saveds.filter((el: number) => el !== id)
      : [...saveds, id];
    localStorage.setItem("savedPosts", JSON.stringify(saved));
    setSavedPosts(saved);
  };

  return (
    <div className="items">
      {posts && posts.length ? (
        posts
          .sort(handleFilter[postFilter])
          .map(({ title, body, userId, id }, index) => {
            return (
              <div className="post" key={index}>
                <div className="post__inner">
                  <h2>
                    <label>Title:</label>
                    {title}
                  </h2>
                  <h4>
                    <label>User Name:</label>{" "}
                    {users?.find(({ id }) => id === userId)?.name}
                  </h4>
                  <p className="post__body">
                    <label>Body:</label>
                    {body}
                  </p>
                </div>
                <div className="icons">
                  <EditIcon
                    className="edit"
                    onClick={() =>
                      handleClickOpenPostEdit(id, title, body, userId)
                    }
                  />

                  <CommentIcon
                    onClick={() => handleCommentClick(id)}
                    style={{ fill: activeComm === id ? "#fff" : "black" }}
                  />
                  <Save
                    onClick={() => handlePostSave(id)}
                    style={{
                      fill: savedPosts?.includes(id) ? "#fff" : "black",
                    }}
                  />
                  <Delete
                    className="delete"
                    onClick={() => handleClickOpenPostDelete(id)}
                  />
                  <input
                    type="checkbox"
                    value={id}
                    checked={checkedList.includes(id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleCheck(Number(e.target.value), e.target.checked);
                    }}
                  />
                </div>

                <div
                  className="post__comments"
                  style={
                    activeComm === id
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  {activeCommText?.map((el, index) => (
                    <div className="post__comment" key={index}>
                      <span>
                        <label>Name:</label> {el.name}
                      </span>
                      <span>
                        <label>Email:</label> {el.email}
                      </span>
                      <span>
                        <label>Body:</label> {el.body}
                      </span>

                      <hr
                        style={
                          activeCommText.length === index + 1
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
      ) : (
        <Loading loading />
      )}
    </div>
  );
}

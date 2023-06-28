import { useAppContext } from "../../../context";
import "./style.scss";

export default function Edit() {
  const {
    checkedList,
    setCheckedList,
    savedPosts,
    setSavedPosts,
    setOpenSelected,
  } = useAppContext();

  const handlePostSaveSelected = () => {
    const mySet = new Set(checkedList.concat(savedPosts));
    const result = Array.from(mySet);

    localStorage.setItem("savedPosts", JSON.stringify(result));
    setSavedPosts(result);
    setCheckedList([]);
  };
  return (
    <div
      className="post__edit__bts"
      style={{ display: checkedList.length ? "flex" : "none" }}
    >
      <button onClick={() => setOpenSelected(true)}>Delete Selected</button>
      <button onClick={handlePostSaveSelected}>Save Selected</button>
    </div>
  );
}

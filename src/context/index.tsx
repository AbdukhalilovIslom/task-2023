import { createContext, ReactNode, useContext, useState } from "react";

import {
  Post,
  Context,
  User,
  DeleteItem,
  Album,
  Todo,
  PostFilter,
  TodoFilter,
} from "../data/interfaces";

const defaultSavedPosts = JSON.stringify([]);
const defaultPhotoPag = JSON.stringify({ page: 1, limit: 10, location: 0 });
const defaultPostPag = JSON.stringify({ page: 1, limit: 10, location: 0 });
const defaultTodoPag = JSON.stringify({ page: 1, limit: 10, location: 0 });

const DEFAULT_VALUES = {
  saveds: [],
  posts: null,
  todos: null,
  checkedList: [],
  users: null,
  open: false,
  dialogItem: null,
  savedPosts: JSON.parse(
    localStorage.getItem("savedPosts") || defaultSavedPosts
  ),
  openSelected: false,
  postCount: String(localStorage.getItem("postCount") || 10),
  deleteItem: {
    open: false,
    value: null,
  },
  photoPagination: JSON.parse(
    localStorage.getItem("photoPagination") || defaultPhotoPag
  ),
  postPagination: JSON.parse(
    localStorage.getItem("postPagination") || defaultPostPag
  ),
  todoPagination: JSON.parse(
    localStorage.getItem("todoPagination") || defaultTodoPag
  ),
  albums: null,
  postFilter: "Title" as PostFilter,
  todoFilter: "Status" as TodoFilter,
  setPostFilter: () => {},
  setTodoFilter: () => {},
  setAlbums: () => {},
  setPosts: () => {},
  setTodos: () => {},
  setCheckedList: () => {},
  setUsers: () => {},
  setOpen: () => {},
  setDialogItem: () => {},
  setSavedPosts: () => {},
  setOpenSelected: () => {},
  setPostCount: () => {},
  setDeleteItem: () => {},
  setPhotoPagination: () => {},
  setPostPagination: () => {},
  setTodoPagination: () => {},
};

const AppContext = createContext<Context>(DEFAULT_VALUES);
const useAppContext = () => useContext(AppContext);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const saveds = JSON.parse(
    localStorage.getItem("savedPosts") || defaultSavedPosts
  );
  const [posts, setPosts] = useState<Post[] | null>(DEFAULT_VALUES.posts);
  const [todos, setTodos] = useState<Todo[] | null>(DEFAULT_VALUES.posts);
  const [checkedList, setCheckedList] = useState<number[]>(
    DEFAULT_VALUES.checkedList
  );
  const [users, setUsers] = useState<User[] | null>(DEFAULT_VALUES.users);
  const [open, setOpen] = useState<boolean>(DEFAULT_VALUES.open);
  const [dialogItem, setDialogItem] = useState<Post | null>(
    DEFAULT_VALUES.dialogItem
  );
  const [savedPosts, setSavedPosts] = useState<number[]>(
    DEFAULT_VALUES.savedPosts
  );
  const [openSelected, setOpenSelected] = useState(DEFAULT_VALUES.openSelected);
  const [postCount, setPostCount] = useState<string>(DEFAULT_VALUES.postCount);
  const [postFilter, setPostFilter] = useState<PostFilter>(
    DEFAULT_VALUES.postFilter
  );
  const [todoFilter, setTodoFilter] = useState<TodoFilter>(
    DEFAULT_VALUES.todoFilter
  );
  const [photoPagination, setPhotoPagination] = useState(
    DEFAULT_VALUES.photoPagination
  );
  const [postPagination, setPostPagination] = useState(
    DEFAULT_VALUES.postPagination
  );
  const [todoPagination, setTodoPagination] = useState(
    DEFAULT_VALUES.todoPagination
  );
  const [deleteItem, setDeleteItem] = useState<DeleteItem>(
    DEFAULT_VALUES.deleteItem
  );
  const [albums, setAlbums] = useState<Album[] | null>(null);

  return (
    <AppContext.Provider
      value={{
        saveds,
        posts,
        todos,
        checkedList,
        users,
        open,
        dialogItem,
        savedPosts,
        openSelected,
        postCount,
        deleteItem,
        photoPagination,
        postPagination,
        todoPagination,
        albums,
        postFilter,
        todoFilter,
        setTodoFilter,
        setPostFilter,
        setAlbums,
        setPosts,
        setTodos,
        setUsers,
        setCheckedList,
        setOpen,
        setDialogItem,
        setSavedPosts,
        setOpenSelected,
        setPostCount,
        setDeleteItem,
        setPhotoPagination,
        setPostPagination,
        setTodoPagination,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { useAppContext, ContextProvider };

import { Dispatch, SetStateAction } from "react";

export interface Context {
  saveds: number[];
  posts: Post[] | null;
  todos: Todo[] | null;
  checkedList: number[];
  users: User[] | null;
  open: boolean;
  dialogItem: Post | null;
  savedPosts: number[];
  openSelected: boolean;
  postCount: string;
  photoPagination: photoPagination;
  postPagination: postPagination;
  todoPagination: todoPagination;
  deleteItem: DeleteItem;
  albums: Album[] | null;
  postFilter: PostFilter;
  todoFilter: TodoFilter;
  setTodoFilter: Dispatch<SetStateAction<TodoFilter>>;
  setPostFilter: Dispatch<SetStateAction<PostFilter>>;
  setAlbums: Dispatch<SetStateAction<Album[] | null>>;
  setPosts: Dispatch<SetStateAction<Post[] | null>>;
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
  setCheckedList: Dispatch<SetStateAction<number[]>>;
  setUsers: Dispatch<SetStateAction<User[] | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDialogItem: Dispatch<SetStateAction<Post | null>>;
  setSavedPosts: Dispatch<SetStateAction<number[]>>;
  setOpenSelected: Dispatch<SetStateAction<boolean>>;
  setPostCount: Dispatch<SetStateAction<string>>;
  setDeleteItem: Dispatch<SetStateAction<DeleteItem>>;
  setPhotoPagination: Dispatch<SetStateAction<photoPagination>>;
  setPostPagination: Dispatch<SetStateAction<postPagination>>;
  setTodoPagination: Dispatch<SetStateAction<todoPagination>>;
}

export type PostFilter = "ID" | "User" | "Saved" | "Title";
export type TodoFilter = "New" | "Status" | "Title";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface DeleteItem {
  open: boolean;
  value: number | null;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface photoPagination {
  page: number;
  limit: number;
  location: number;
}
export interface postPagination {
  page: number;
  limit: number;
  location: number;
}
export interface todoPagination {
  page: number;
  limit: number;
  location: number;
}

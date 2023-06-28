import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useRequest";
import { useAppContext } from "../../context";
import Pagination from "../../components/todos/pagination/pagination";
import Tasks from "../../components/todos/tasks/tasks";
import Filter from "../../components/todos/filter/filter";

import "./style.scss";

export default function Todos() {
  const { request } = useHttp();
  const [loading, setLoading] = useState(false);
  const { todoPagination, todos, setTodoPagination, setTodos } =
    useAppContext();

  useEffect(() => {
    request(
      `/todos?_limit=${todoPagination.limit}&_page=${todoPagination.page}`
    ).then((res) => {
      setTodos(res);
      setLoading(false);
    });
  }, [todoPagination]); // eslint-disable-line

  return (
    <div>
      <div className="todo__filter">
        <Filter />
      </div>
      <Tasks />
      <Pagination loading={loading} setLoading={setLoading} />
    </div>
  );
}

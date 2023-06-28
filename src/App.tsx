import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppContext } from "./context";
import { useHttp } from "./hooks/useRequest";

// Pages
const Posts = lazy(() => import("./pages/posts/posts"));
const Photos = lazy(() => import("./pages/photos/photos"));
const Tasks = lazy(() => import("./pages/todos/todos"));
const PhotoView = lazy(() => import("./pages/photos/view/View"));

// Components
const Header = lazy(() => import("./components/header/header"));

function App() {
  const { request } = useHttp();
  const { setUsers } = useAppContext();

  useEffect(() => {
    request(`/users`).then(setUsers);
  }, []); // eslint-disable-line

  return (
    <div className="app container">
      <Header />
      <Suspense fallback={<></>}>
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<Posts />} />
          <Route path="photos">
            <Route index element={<Photos />} />
            <Route path="view/:id" element={<PhotoView />} />
          </Route>
          <Route path="/tasks" element={<Tasks />} />

          {/* Not found */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

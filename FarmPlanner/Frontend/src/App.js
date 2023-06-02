import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Field from "./pages/Field/Field";
import Categories from "./pages/categories/Categories";
import Schema from "./pages/schema/Schema"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout>
      <Schema/>
    </Layout>,
  },
  {
    path: "/field/:id",
    element: <Layout>
      <Field/>
    </Layout>
  },
  {
    path: "/categories",
    element: <Layout>
      <Categories/>
    </Layout>
  },
]);

function App() {
  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;

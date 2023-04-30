import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Field from "./components/Field/Field";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
  },
  {
    path: "/field/:id",
    element: <Layout>
      <Field/>
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

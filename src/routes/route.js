import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login";
import SignUp from "../pages/signup";
import Book from "../pages/book";
import ErrorPage from "./errorPage";
import ProtectedRoutes from "./protectedRoute";
import PublicRoutes from "./publicRoute";

import Header from "../components/header";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Header />
            <Book></Book>
          </>
        ),
      },
    ],
  },
]);

export default router;

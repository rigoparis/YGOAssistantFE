import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/root";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateAccount from "./pages/createAccount";
import RecoverAccount from "./pages/recoverAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "createAccount",
        element: <CreateAccount />,
      },
      {
        path: "recoverAccount",
        element: <RecoverAccount />,
      },
    ],
  },
]);

export default router;
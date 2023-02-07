import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import ExamRoute from "./routes/ExamRoute";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import RegisterRoute from "./routes/RegisterRoute";
import ResultsHistoryRoute from "./routes/ResultsHistoryRoute";
import ResultsRoute from "./routes/ResultsRoute";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <LoginRoute />,
      },
      {
        path: "register",
        element: <RegisterRoute />,
      },
      {
        path: "exam",
        element: <ExamRoute />,
      },
      {
        path: "results_history",
        element: <ResultsHistoryRoute />,
      },
      {
        path: "results",
        element: <ResultsRoute />,
      },
      {
        path: "",
        element: <HomeRoute />,
      },
    ],
  },
]);

export default router;

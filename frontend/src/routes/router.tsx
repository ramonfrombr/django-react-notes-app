import { createBrowserRouter } from "react-router-dom";
import ExamRoute from "./routes/ExamRoute";
import HomeRoute from "./routes/HomeRoute";
import ResultsRoute from "./routes/ResultsRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
  },
  {
    path: "/exam",
    element: <ExamRoute />,
  },
  {
    path: "/results",
    element: <ResultsRoute />,
  },
]);

export default router;

import { Navigate, type RouteObject } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error/ErrorPage";
import Trending from "./pages/trending/Trending";
import NotFound from "./pages/404/NotFound";
import TrendingInfinite from "./pages/trending/TrendingInfinite";
import Movies from "./pages/movies/Movies";
import TV from "./pages/tv/TV";
import Favorites from "./pages/favorites/Favorites";
import MovieDetails from "./pages/movie-details/MovieDetails";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Trending />,
        children: [
          {
            path: ":page",
            element: <Trending />,
          },
        ],
      },
      {
        path: "trending-infinite",
        element: <TrendingInfinite />,
      },
      {
        path: "movies",
        element: <Movies />,
        children: [
          {
            path: ":page",
            element: <Movies />,
          },
        ],
      },
      {
        path: "tv",
        element: <TV />,
        children: [
          {
            path: ":page",
            element: <TV />,
          },
        ],
      },
      {
        path: "movie",
        element: <MovieDetails />,
        children: [
          {
            path: ":mediaId",
            element: <MovieDetails />,
          },
        ],
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate to="/not-found" replace />,
      },
    ],
  },
];

export default routes;

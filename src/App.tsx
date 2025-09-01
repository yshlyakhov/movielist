import { Navigate, Route, Routes } from "react-router-dom";
import Movies from "./pages/movies/Movies";
import Navigation from "./shared/navigation/Navigation";
import Favorites from "./pages/favorites/Favorites";
import MoviesProvider from "./contexts/MoviesProvider";
import MovieDetails from "./pages/movie-details/MovieDetails";
import NotFound from "./pages/404/NotFound";
import Trending from "./pages/trending/Trending";
import TV from "./pages/tv/TV";
import TrendingInfinite from "./pages/trending/TrendingInfinite";

const App = () => {
  return (
    <>
      <Navigation />
      <MoviesProvider>
        <Routes>
          <Route path="/" element={<Trending />}>
            <Route path=":page" element={<Trending />} />
          </Route>
          <Route path="/trending-infinite" element={<TrendingInfinite />} />
          <Route path="/movies" element={<Movies />}>
            <Route path=":page" element={<Movies />} />
          </Route>
          <Route path="/movie" element={<MovieDetails />}>
            <Route path="/movie/:mediaId" element={<MovieDetails />} />
          </Route>
          <Route path="/tv" element={<TV />}>
            <Route path=":page" element={<TV />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </MoviesProvider>
    </>
  );
};

export default App;

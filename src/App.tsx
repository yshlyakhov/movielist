import { Navigate, Route, Routes } from "react-router-dom";
import Movies from "./pages/movies/Movies";
import Navigation from "./shared/navigation/Navigation";
import Favorites from "./pages/favorites/Favorites";
import MoviesProvider from "./contexts/MoviesProvider";
import MovieDetails from "./pages/movie-details/MovieDetails";
import NotFound from "./pages/404/NotFound";
import Trending from "./pages/trending/Trending";
import Series from "./pages/series/Series";

const App = () => {
  return (
    <>
      <Navigation />
      <MoviesProvider>
        <Routes>
          <Route path="/" element={<Trending />}>
            <Route path=":page" element={<Trending />} />
          </Route>
          <Route path="/movies" element={<Movies />}>
            <Route path=":page" element={<Movies />} />
          </Route>
          <Route path="/movie" element={<MovieDetails />}>
            <Route path="/movie/:mediaId" element={<MovieDetails />} />
          </Route>
          <Route path="/series" element={<Series />}>
            <Route path=":page" element={<Series />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </MoviesProvider>
    </>
  );
};

export default App;

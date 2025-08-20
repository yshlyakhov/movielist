import { Navigate, Route, Routes } from "react-router-dom";
import Movies from "./pages/movies/Movies";
import Navigation from "./shared/navigation/Navigation";
import Favorites from "./pages/favorites/Favorites";
import MoviesProvider from "./contexts/MoviesProvider";
import MovieDetails from "./pages/movie-details/MovieDetails";
import NotFound from "./pages/404/NotFound";

const App = () => {
  return (
    <>
      <Navigation />
      <MoviesProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies" element={<Movies />}>
            <Route path=":page" element={<Movies />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie" element={<MovieDetails />}>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </MoviesProvider>
    </>
  );
};

export default App;

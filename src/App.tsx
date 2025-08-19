import { Route, Routes } from "react-router-dom";
import Movies from "./pages/movies/Movies";
import Navigation from "./shared/Navigation";
import Favorites from "./pages/favorites/Favorites";
import MoviesProvider from "./contexts/MoviesProvider";

const App = () => {
  return (
    <>
      <Navigation />
      <MoviesProvider>
        <Routes>
          <Route path="/movies" element={<Movies />}>
            <Route path=":page" element={<Movies />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          {/* <Route path="/movie" element={<MovieDetails />}>
          <Route path=":id" element={<MovieDetails />} />
        </Route> */}
        </Routes>
      </MoviesProvider>
    </>
  );
};

export default App;

import { Outlet } from "react-router-dom";
import Navigation from "./shared/navigation/Navigation";
import MoviesProvider from "./contexts/MoviesProvider";

const App = () => {
  return (
    <>
      <Navigation />
      <MoviesProvider>
        <Outlet />

        {/* <Routes>
          <Route path="/" element={<Trending />}>
            <Route path=":page" element={<Trending />} />
          </Route>
          <Route path="/trending-infinite" element={<TrendingInfinite />} />
          <Route path="/movies" element={<Movies />}>
            <Route path=":page" element={<Movies />} />
          </Route>
          <Route path="/movie" element={<MovieDetails />}>
            <Route path=":mediaId" element={<MovieDetails />} />
          </Route>
          <Route path="/tv" element={<TV />}>
            <Route path=":page" element={<TV />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes> */}
      </MoviesProvider>
    </>
  );
};

export default App;

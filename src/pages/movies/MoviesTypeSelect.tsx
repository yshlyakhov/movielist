import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { MOVIES_TYPES, type MovieType } from "./movies.models";

interface Props {
  moviesType: MovieType;
  onChange: (type: MovieType) => void;
}

const MoviesTypeSelect = ({ moviesType, onChange }: Props) => {
  // const [movieType, setMovieType] = useState<MovieType>({
  //   id: 1,
  //   label: "Popular",
  // });

  const handleChange = (event: SelectChangeEvent<number>) => {
    const type = MOVIES_TYPES.find(
      (v) => v.id === event.target.value
    ) as MovieType;
    // setMovieType(type);
    onChange(type);
  };

  return (
    <FormControl sx={{ margin: 0, minWidth: 240 }} size="medium">
      <InputLabel id="movie-type-select-label">Movies</InputLabel>
      <Select
        labelId="movie-type-select-label"
        id="movie-type-select"
        value={moviesType.id}
        label="Movies"
        onChange={handleChange}
      >
        {MOVIES_TYPES.map((type) => (
          <MenuItem value={type.id}>{type.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MoviesTypeSelect;

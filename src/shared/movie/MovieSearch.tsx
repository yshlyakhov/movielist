import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface Props {
  label: string;
  q: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

const MovieSearch = ({ label, q, onChange, onSubmit }: Props) => {
  const [inputValue, setInputValue] = useState(q);

  return (
    <form
      className="movies-search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(inputValue);
      }}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
          onChange(event.target.value);
        }}
      />

      <Button size="large" type="submit" variant="contained">
        Search
      </Button>
    </form>
  );
};

export default MovieSearch;

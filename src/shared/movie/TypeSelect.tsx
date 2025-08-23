import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface MovieProps<T> {
  label: string;
  items: T[];
  itemsType: T;
  onChange: (type: T) => void;
}

const TypeSelect = <T extends { id: number; label: string }>({
  label,
  items,
  itemsType,
  onChange,
}: MovieProps<T>) => {
  // handlers
  const handleChange = (event: SelectChangeEvent<number>) => {
    const type = items.find((v) => v.id === event.target.value) as T;
    onChange(type);
  };

  return (
    <FormControl sx={{ margin: 0, minWidth: 240 }} size="medium">
      <InputLabel id="movie-type-select-label">{label}</InputLabel>
      <Select
        labelId="movie-type-select-label"
        id="movie-type-select"
        value={itemsType.id}
        label={label}
        onChange={handleChange}
      >
        {items.map((type) => (
          <MenuItem value={type.id}>{type.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeSelect;

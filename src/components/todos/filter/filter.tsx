import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppContext } from "../../../context";
import { TodoFilter } from "../../../data/interfaces";

const filters = ["New", "Status", "Title"];

export default function Filter() {
  const { todoFilter, setTodoFilter } = useAppContext();

  const handleChange = (event: SelectChangeEvent) => {
    setTodoFilter(event.target.value as TodoFilter);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120, color: "#fff" }}>
      <InputLabel
        sx={{ color: "#fff" }}
        id="demo-simple-select-autowidth-label"
      >
        Sort
      </InputLabel>
      <Select
        sx={{ color: "#fff" }}
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={todoFilter}
        onChange={handleChange}
        autoWidth
        label="Sort"
      >
        {filters.map((el, index) => {
          return (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

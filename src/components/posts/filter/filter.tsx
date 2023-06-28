import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppContext } from "../../../context";
import { PostFilter } from "../../../data/interfaces";

import "./style.scss";

const filters = ["ID", "User", "Saved", "Title"];

export default function Filter() {
  const { postFilter, setPostFilter } = useAppContext();

  const handleChange = (event: SelectChangeEvent) => {
    setPostFilter(event.target.value as PostFilter);
  };

  return (
    <div className="filter">
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
          value={postFilter}
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
    </div>
  );
}

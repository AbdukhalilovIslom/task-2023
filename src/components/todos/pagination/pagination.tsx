import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppContext } from "../../../context";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Loading from "../../loading/loading";
import "./style.scss";

export default function Pagination({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { todoPagination, setTodoPagination } = useAppContext();

  //  this value is based on default jsonplaceholder parameters
  const paginationInfo = [
    {
      limit: 10,
      page: 10,
    },
    {
      limit: 20,
      page: 5,
    },
    {
      limit: 50,
      page: 2,
    },
    {
      limit: 100,
      page: 0,
    },
    {
      limit: 10000,
      page: 0,
      name: "Все",
    },
  ];

  const handleChangePhotosLimit = (event: SelectChangeEvent) => {
    setTodoPagination({
      ...todoPagination,
      location: Number(event.target.value),
      limit: paginationInfo[Number(event.target.value)].limit,
      page: 1,
    });
    localStorage.setItem(
      "todoPagination",
      JSON.stringify({
        ...todoPagination,
        location: Number(event.target.value),
        limit: paginationInfo[Number(event.target.value)].limit,
        page: 1,
      })
    );
    setLoading(true);
  };

  return (
    <div className="todo__pag">
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          sx={{ color: "#fff" }}
          id="demo-simple-select-autowidth-label"
        >
          Count
        </InputLabel>
        <Select
          sx={{ color: "#fff" }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={String(todoPagination.location)}
          onChange={handleChangePhotosLimit}
          autoWidth
          label="Age"
        >
          {paginationInfo.map(({ limit, name }, index) => {
            return <MenuItem value={index}>{name ? name : limit}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <div>
        {Array(paginationInfo[todoPagination.location]?.page)
          .fill(0)
          .map((_, index) => {
            return (
              <span
                onClick={() => {
                  setTodoPagination({ ...todoPagination, page: index + 1 });
                  localStorage.setItem(
                    "todoPagination",
                    JSON.stringify({ ...todoPagination, page: index + 1 })
                  );
                  setLoading(true);
                }}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderBottom:
                    index + 1 === todoPagination.page
                      ? "1px solid red"
                      : "1px solid transparent",
                }}
              >
                {index + 1}
              </span>
            );
          })}
        <Loading loading={loading} />
      </div>
    </div>
  );
}

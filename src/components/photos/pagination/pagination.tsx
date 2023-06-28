import React, { Dispatch, SetStateAction, useState } from "react";
import { handleScrollTop } from "../../../utils/index";
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
  const { photoPagination, setPhotoPagination } = useAppContext();

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
    handleScrollTop();
    setPhotoPagination({
      ...photoPagination,
      location: Number(event.target.value),
      limit: paginationInfo[Number(event.target.value)].limit,
      page: 1,
    });
    localStorage.setItem(
      "photoPagination",
      JSON.stringify({
        ...photoPagination,
        location: Number(event.target.value),
        limit: paginationInfo[Number(event.target.value)].limit,
        page: 1,
      })
    );
    setLoading(true);
  };

  return (
    <div className="photo__pag">
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120, color: "#fff" }}>
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
          value={String(photoPagination.location)}
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
        {Array(paginationInfo[photoPagination.location]?.page)
          .fill(0)
          .map((_, index) => {
            return (
              <span
                onClick={() => {
                  handleScrollTop();
                  setPhotoPagination({ ...photoPagination, page: index + 1 });
                  localStorage.setItem(
                    "photoPagination",
                    JSON.stringify({ ...photoPagination, page: index + 1 })
                  );
                  setLoading(true);
                }}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderBottom:
                    index + 1 === photoPagination.page
                      ? "1px solid #fff"
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

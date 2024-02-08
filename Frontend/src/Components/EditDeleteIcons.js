import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddEditModal from "./AddEditModal";
import RemoveIcon from "@mui/icons-material/Remove";

export default function EditDeleteIcons({ deleteAction, rows }) {
  return (
    <>
      <AddEditModal rows={rows} />

      <RemoveIcon
        onClick={deleteAction}
        color="action"
        sx={{
          borderRadius: "50px",
          backgroundColor: "rgb(222, 225, 231)",
          width: "30px",
          height: "30px",
          margin: "0px 2px",
          padding: "4px",
        }}
      />
    </>
  );
}

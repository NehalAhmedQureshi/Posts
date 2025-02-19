import { Typography } from "@mui/material";
import { ThumbDownOffAlt } from "@mui/icons-material";
import React from "react";

export default function DisLikeButton({ text, onClick }) {
  return (
    <Typography sx={{ display: "flex", alignItems: "center" }}>
      <ThumbDownOffAlt fontSize="small" onClick={onClick} />
      {text}{" "}
    </Typography>
  );
}

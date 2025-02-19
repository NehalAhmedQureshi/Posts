import { Typography } from "@mui/material";
import { ThumbUpOffAlt } from "@mui/icons-material";

import React from "react";

export default function LikeButton({ text, onClick }) {
  return (
    <Typography sx={{ display: "flex", alignItems: "center" }}>
      <ThumbUpOffAlt fontSize="small" onClick={onClick} />
      {text}
    </Typography>
  );
}

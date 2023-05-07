import React from "react";
import Button from "@mui/material/Button";

function MyButton(props) {
  const {label, onClick, sx} = props;
  return (
    <Button variant="contained" onClick={onClick} sx={sx}>
      {label}
    </Button>
  );
}

export default MyButton;

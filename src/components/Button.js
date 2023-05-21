import React from "react";
import Button from "@mui/material/Button";

function MyButton({ label, onClick, margin }) {
  return (
    <Button variant="contained" onClick={onClick} style={{
      margin: `${margin}px`
    }}>
      {label}
    </Button>
  );
}

export default MyButton;

import React from "react";
import Button from "@mui/material/Button";

function MyButton(props) {
  const { label, onClick, margin} = props;
  console.log(props);
  return (
    <Button variant="contained" onClick={onClick} style={{
      margin: `${margin}px`
    }}>
      {label}
    </Button>
  );
}

export default MyButton;

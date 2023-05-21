import { useState } from "react";
import MyButton from "./Button";
import { NeoGraph } from "./KnowledgeGraph";  
import { Backdrop } from "@mui/material";
import { Grid } from "@mui/joy";

const Message = ({ message, index }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (message.cypher === "") {
    return (
    <div className={`message ${message.source}`}>
      <a href={message.link} target="_blank" rel="noreferrer"> {message.text} </a>
    </div>
    );
  }
  else {
    return (
      <div className={`message ${message.source}`}>
        <MyButton
          label={"Show the reasoning path"}
          onClick={handleOpen}
          margin={8}
        />
          <Backdrop open={open}>
            <Grid justifyContent={"center"} alignItems={"center"}>
              <NeoGraph
                width={800}
                height={600}
                containerId={`message-${index}`}
                neo4jUri={process.env.REACT_APP_NEO4J_URI}
                neo4jUser={process.env.REACT_APP_NEO4J_USER}
                neo4jPassword={process.env.REACT_APP_NEO4J_PASSWORD}
                cypher={message.cypher}
                backgroundColor={"#f5f5f5"}
              />
              <MyButton
                label={"Close the reasoning path"}
                onClick={handleClose}
                margin={8}
              />
            </Grid>
          </Backdrop>
        </div>
    )
  }
}

export default Message
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
    // if no cypher, means it is message
    if (message.source === "system") {
      return (
        <div className={`message ${message.source}`}>
          {message.text + "  "}
          <a href={message.link} target="_blank" rel="noreferrer" className="foot-note">
            {`新聞連結: ${message.company}`}
          </a>
        </div>
      );
    }
    else {
      return (
        <div className={`message ${message.source}`}>
          {message.text}
        </div>
      );
    }
  }
  else {
    // show the reasoning path
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
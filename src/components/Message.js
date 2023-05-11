import { NeoGraph } from "./KnowledgeGraph";  

const Message = ({ message, index }) => {
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
        <NeoGraph
          width={400}
          height={300}
          containerId={`message-${index}`}
          neo4jUri={process.env.REACT_APP_NEO4J_URI}
          neo4jUser={process.env.REACT_APP_NEO4J_USER}
          neo4jPassword={process.env.REACT_APP_NEO4J_PASSWORD}
          cypher={message.cypher}
          backgroundColor={"#f5f5f5"}
        />
      </div>
    )
  }
}

export default Message
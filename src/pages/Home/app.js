import { useEffect, useState } from "react"
import { Grid, Paper } from "@mui/material"
import { InputForm } from "../components/Inputs"
import { NeoGraph } from "../components/KnowledgeGraph"
import DrawerAppBar from "../components/AppBar"
import Chatroom from "../components/Chatroom"
import MyButton from "../components/Button"
import examples from "../components/data"


const Home = () => {
    const [formData, setFormData] = useState({});
    const [submitStatus, setSubmitStatus] = useState(false);
    const [cypher, setCypher] = useState("");
    const [newsId, setNewsId] = useState("");
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    const handleClick = () => {
      setSubmitStatus(true);
    }
    
    useEffect(() => {
      if (!submitStatus) return;
      const data = formData;
      console.log(JSON.stringify(data));
      fetch("http://127.0.0.1:8000/knowledge-graph", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        "body": JSON.stringify(data)
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          setCypher(data.cypher);
          setNewsId(data.news_id);
        })
        .finally(() => setSubmitStatus(false));
    }, [formData, submitStatus]);
    
    return (
      <Paper sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #CCCCCC 100%)',
      }}>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <DrawerAppBar />
          <Grid container justifyContent="left" alignItems="center">
            <MyButton label={"範例一"} onClick={() => setFormData(examples[0])} />
            <MyButton label={"範例二"} onClick={() => setFormData(examples[1])} />
            <MyButton label={"範例三"} onClick={() => setFormData(examples[2])} />
          </Grid>
          <InputForm
            formData={formData}
            setFormData={handleChange}
            handleClick={handleClick}
          />
          {console.log(process.env.NEO4J_URI)}
          <div style={{display: "flex"}}>
            <NeoGraph
              width={800}
              height={600}
              containerId={"id1"}
              neo4jUri={process.env.REACT_APP_NEO4J_URI}
              neo4jUser={process.env.REACT_APP_NEO4J_USER}
              neo4jPassword={process.env.REACT_APP_NEO4J_PASSWORD}
              cypher={cypher}
              backgroundColor={"#EEEEEE"}
              />
            <Chatroom news_id={newsId}/>
          </div>
        </Grid>
      </Paper>
    );
}

export default Home;
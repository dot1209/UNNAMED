import { useEffect, useState } from "react"
import { Typography } from "@mui/joy"
import { Backdrop, Grid, Paper } from "@mui/material"
import { InputForm } from "../../components/Inputs"
import { NeoGraph } from "../../components/KnowledgeGraph"
import DrawerAppBar from "../../components/AppBar"
import { Chatroom, FabChatroom } from "../../components/Chatroom"
import MyButton from "../../components/Button"
import examples from "../../components/data"
import './App.css'
import { PacmanLoader } from "react-spinners"


const Home = () => {
    const [formData, setFormData] = useState({});
    const [snipper, setSnipper] = useState(false);
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
      setSnipper(true);
      fetch("http://140.116.245.147:888/knowledge-graph", {
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
        .finally(() => {
          setSubmitStatus(false);
          setSnipper(false);
        });
    }, [formData, submitStatus]);
    
    return (
      <Paper sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #CCCCCC 100%)',
      }}>
        <Backdrop open={snipper}>
          <PacmanLoader color="#36d7b7" loading={snipper}/>
        </Backdrop>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <DrawerAppBar />
          <Grid container justifyContent="left" alignItems="center">
            <MyButton
              label={"範例一"}
              margin={8}
              onClick={() => setFormData(examples[0])} />
            <MyButton
              label={"範例二"}
              margin={8}
              onClick={() => setFormData(examples[1])} />
            <MyButton
              label={"範例三"}
              margin={8}
              onClick={() => setFormData(examples[2])} />
          </Grid>
          <InputForm
            formData={formData}
            setFormData={handleChange}
            handleClick={handleClick}
          />
          <Grid display={"flex"}>
            <Grid container justifyContent={"center"}>
              <Typography level='h4'> 事件因果關係知識圖譜 </Typography>
              <NeoGraph
                width={800}
                height={800}
                containerId={"id1"}
                neo4jUri={process.env.REACT_APP_NEO4J_URI}
                neo4jUser={process.env.REACT_APP_NEO4J_USER}
                neo4jPassword={process.env.REACT_APP_NEO4J_PASSWORD}
                cypher={cypher}
                backgroundColor={"#EEEEEE"}
                />
            </Grid>
            <Chatroom news_id={newsId}/>
          </Grid>
        </Grid>
      </Paper>
    );
}

export default Home;
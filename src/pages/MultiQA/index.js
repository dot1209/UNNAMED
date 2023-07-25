import { Backdrop, Grid, Paper } from "@mui/material"
import DrawerAppBar from "../../components/AppBar"
import { Chatroom } from "../../components/Chatroom"
import examples from "../../components/question_data"


const MultiQA = () => {
  return (
    <Paper sx={{
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #CCCCCC 100%)',
    }}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <DrawerAppBar />
        {/* <Grid container justifyContent="left" alignItems="center">
          <MyButton
            label={"範例一"}
            margin={8}/>
          <MyButton
            label={"範例二"}
            margin={8}/>
        </Grid> */}
        <Grid container justifyContent="left" alignItems="center" display={"flex"}>
          <Chatroom w={"800px"} h={"800px"}/>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MultiQA;
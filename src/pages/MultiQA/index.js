import { Backdrop, Box, Grid, Paper } from "@mui/material"
import DrawerAppBar from "../../components/AppBar"
import { Chatroom } from "../../components/Chatroom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";


const MultiQA = () => {
  const [kg, setKg] = useState('');
  const handleChange = (event) => {
    setKg(event.target.value);
  };

  return (
    <Paper sx={{
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #CCCCCC 100%)',
    }}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <DrawerAppBar />
          <Grid container flexDirection={"column"} paddingLeft={4}>
            <InputLabel>Knowledge Graph</InputLabel>
            <Select
              name="kg"
              value={kg}
              label="Knowledge Graph"
              onChange={setKg}
              sx={{width: "25%"}}
            >
            {/* TODO: Hard-cored here, use useEffect to fetch all kgs */}
              <MenuItem value={"test2"}>test2</MenuItem>
              <MenuItem value={"drcd"}>drcd</MenuItem>
            </Select>
          </Grid>
        <Grid container justifyContent="left" alignItems="center" display={"flex"}>
          <Chatroom kg={kg} w={"800px"} h={"800px"}/>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MultiQA;
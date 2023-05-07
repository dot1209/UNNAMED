import { Grid, Paper } from "@mui/material";  
import DrawerAppBar from "../../components/AppBar"

const About = () => {
    return (
      <Paper sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #CCCCCC 100%)',
      }}>
        <Grid container justifyContent="center" alignItems="center">
          <DrawerAppBar />
          <Grid sx={{padding: 25}}>About page</Grid>
        </Grid>
      </Paper>
    );
}

export default About;
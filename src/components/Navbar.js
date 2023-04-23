import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Navbar() {

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const navigate = useNavigate();

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>

      <AppBar color='default' position="static" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookMyBus
          </Typography>
          <Button onClick={() => navigate('/')} color="inherit">Reservation</Button>
          <Button onClick={() => navigate('/dashboard')} color="inherit">Dashboard</Button>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      </Box>
    </div>
  );
}

export default Navbar;

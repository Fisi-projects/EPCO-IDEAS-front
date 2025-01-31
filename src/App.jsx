import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import './App.css';
import ClippedDrawer from './components/Sidebar/Sidebar';
import {Box, Typography} from '@mui/material';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
        <ClippedDrawer/>
        <Box sx={{marginTop:'70px'}}>
          {/* Probar componente aqui */}
        </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;

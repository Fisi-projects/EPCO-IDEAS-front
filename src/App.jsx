import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import './App.css';
import ClippedDrawer from './components/Sidebar/Sidebar';
import {Box} from '@mui/material';
import RequestsTable from './pages/requests'; // Importar la tabla


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
        <ClippedDrawer/>
        <Box sx={{ marginTop: '70px', width: '100%' }}>
        <RequestsTable /> {/* Mostrar la tabla */}
        </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;

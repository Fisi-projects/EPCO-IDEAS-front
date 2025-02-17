import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import './App.css';
import ClippedDrawer from './components/Sidebar/Sidebar';
import {Box} from '@mui/material';
import RequestsTable from './pages/requests'; // Importar la tabla
import { Route, Routes } from 'react-router';
import SignIn from './pages/login';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/wasa' element={<h1>wasaaaa</h1>} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/' element={
            <Box sx={{ display: 'flex', justifyContent:'center' }}>
            <ClippedDrawer/>
            <Box sx={{ marginTop: '70px', width: '100%'}}>
            <RequestsTable /> {/* Mostrar la tabla */}
            </Box>
            </Box>
          }/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

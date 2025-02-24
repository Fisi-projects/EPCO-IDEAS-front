import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import './App.css';
import ClippedDrawer from './components/Sidebar/Sidebar';
import {Box} from '@mui/material';
import RequestsTable from './pages/requests'; // Importar la tabla solicitudes
import TechsTable from './pages/techs'; // Importar la tabla tecnicos
import ProductsTable from './pages/products'; // Importar la tabla productos
import { Route, Routes } from 'react-router';
import SignIn from './pages/login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './routes/ProtectedRoutes';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/*' element={
              <Box sx={{ display: 'flex', justifyContent:'center' }}>
              <ClippedDrawer/>
              <Box sx={{ marginTop: '70px', width: '100%'}}>
                <Routes>
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/' element={<RequestsTable />} />
                    <Route path='/techs' element={<TechsTable />} />
                    <Route path='/products' element={<ProductsTable />} />
                    <Route path='*' element={<h1>404 Página no encontrada</h1>} />
                  </Route>
                  {/* Aca ponen las rutas que iran dentro del sidebar y header */}
                </Routes>
              </Box>
              </Box>
            }/>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

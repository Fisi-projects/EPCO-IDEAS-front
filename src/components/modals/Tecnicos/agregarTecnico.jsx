import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem
  } from '@mui/material';
import axios from 'axios';
  
  const AgregarTecnico = ({ open, onClose, handleRefresh}) => {
    const handleSave = () =>{
      console.log('Guardado');
      console.log(
        { nombre: document.getElementById('nombre').value,
          apellido: document.getElementById('apellido').value,
          email: document.getElementById('email').value,
          celular: document.getElementById('celular').value,
          documento: document.getElementById('documento').value,
          fecha_nac: document.getElementById('fecha_nac').value}
      )
      axios.post('https://epco-ideas-back.onrender.com/users/tecnicos/all',{
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        documento: document.getElementById('documento').value,
        fecha_nac: document.getElementById('fecha_nac').value
      }
    ).then((response) => {
      console.log(response.data);
      alert('Tecnico agregado');
      handleRefresh();
    }).catch((error) => {
      console.log(error);
      alert('Error al agregar tecnico');
    });
    onClose();
    }
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
            Agregar Tecnico
        </DialogTitle>
        <DialogContent sx={{borderBottom: '1px solid #d1d1d1'}}>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box>
              <Typography variant="h4" fontWeight="bold">Nombres</Typography>
              <TextField id="nombre" placeholder="Titulo de solicitud" fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Apellidos</Typography>
              <TextField id="apellido" placeholder="Nombre del cliente" fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Correo Electronico</Typography>
              <TextField id="email" placeholder="Ingrese el correo electronico" fullWidth></TextField>
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                <Box>
                <Typography variant="h4" fontWeight="bold">Celular</Typography>
                <TextField id="celular" placeholder="Ingrese el celular" fullWidth></TextField>
                </Box>
                <Box>
                <Typography variant="h4" fontWeight="bold">DNI</Typography>
                <TextField id="documento" placeholder="Ingrese el DNI" fullWidth></TextField>
                </Box>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Fecha de Nacimiento</Typography>
                                    <TextField
                                        id="fecha_nac"
                                        fullWidth
                                        label="Fecha de Nacimiento"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        //value={fechaNac}
                                        //onChange={(e) => setFechaNac(e.target.value)}
                                    />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{m: '5px 15px'}}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
      </Dialog>
    );
  };
  
  export default AgregarTecnico;
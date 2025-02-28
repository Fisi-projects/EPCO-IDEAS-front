import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem
  } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
  
  const EditarTecnico = ({ open, onClose, request, handleRefresh }) => {
    if (!request) return null; // Si no hay solicitud, no renderizar nada

    const saveTecnico = () => {
      axios.put(`https://epco-ideas-back.onrender.com/users/tecnicos/update/${request.id}`,{
        nombres: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('celular').value,
        dni: document.getElementById('documento').value,
        fecha_nac: document.getElementById('fecha_nac').value
      }
    ).then((response) => {
      handleRefresh();
      console.log(response.data);
      alert('Tecnico actualizado');
    }
    ).catch((error) => {
      console.log(error);
      alert('Error al actualizar tecnico');
    });
    onClose();
  }

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
            Editar datos del Tecnico
            <Typography variant="body2">ID - {request.id}</Typography>
        </DialogTitle>
        <DialogContent sx={{borderBottom: '1px solid #d1d1d1'}}>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box>
              <Typography variant="h4" fontWeight="bold">Nombres</Typography>
              <TextField id="nombre" placeholder="Titulo de solicitud" defaultValue={request.nombres} fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Apellidos</Typography>
              <TextField id="apellido" placeholder="Nombre del cliente" defaultValue={request.apellidos} fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Correo Electronico</Typography>
              <TextField id="email" placeholder="Ingrese el correo electronico" defaultValue={request.email} fullWidth></TextField>
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                <Box>
                <Typography variant="h4" fontWeight="bold">Celular</Typography>
                <TextField id="celular" placeholder="Ingrese el celular" defaultValue={request.telefono} fullWidth></TextField>
                </Box>
                <Box>
                <Typography variant="h4" fontWeight="bold">DNI</Typography>
                <TextField id="documento" placeholder="Ingrese el DNI" defaultValue={request.dni} fullWidth></TextField>
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
                                        defaultValue={request.fecha_nac.split('T')[0]}
                                        //value={fechaNac}
                                        //onChange={(e) => setFechaNac(e.target.value)}
                                    />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{m: '5px 15px'}}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={saveTecnico}>Guardar</Button>
      </DialogActions>
      </Dialog>
    );
  };
  
  export default EditarTecnico;
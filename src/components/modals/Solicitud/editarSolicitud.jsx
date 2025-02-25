import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem
  } from '@mui/material';
  import { useState } from 'react';
  
  const EditarSolicitud = ({ open, onClose, request }) => {
    if (!request) return null; // Si no hay solicitud, no renderizar nada
    const [estado, setEstado] = useState('');
    const [tecnico, setTecnico] = useState('');
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
            Detalles de la Solicitud
            <Typography variant="body2">N° {request.id}</Typography>
        </DialogTitle>
        <DialogContent sx={{borderBottom: '1px solid #d1d1d1', height:'460px'}}>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box>
              <Typography variant="h4" fontWeight="bold">Título</Typography>
              <TextField id="titulo" placeholder="Titulo de solicitud" defaultValue="Solicitud predeterminada" fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Cliente</Typography>
              <TextField id="cliente" placeholder="Nombre del cliente" defaultValue="Nombre-Cliente" fullWidth></TextField>
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                <Box>
                <Typography variant="h4" fontWeight="bold">Celular</Typography>
                <TextField id="celular" placeholder="N° de celular" defaultValue="961219000" fullWidth></TextField>
                </Box>
                <Box>
                <Typography variant="h4" fontWeight="bold">Fecha</Typography>
                <TextField id="fecha" placeholder="Fecha de creacion" defaultValue="Fecha asignada" fullWidth></TextField>
                </Box>
            </Box>
            
            <Box>
              <Typography variant="h4" fontWeight="bold">Productos</Typography>
              <TextField id="productos" placeholder="Productos elegidos" defaultValue="Producto(s) elegidos" fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Descripcion del caso</Typography>
              <TextField id="descripcion" placeholder="Ingrese los detalles de la solicitud" defaultValue="Descripcion detallada" fullWidth multiline rows={3}></TextField>
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                <Box sx={{flex: 1}}>
                    <Typography variant="h4" fontWeight="bold">Estado del caso</Typography>
                    <FormControl fullWidth>
                        <Select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                            <MenuItem value="En proceso">En proceso</MenuItem>
                            <MenuItem value="En espera">En espera</MenuItem>
                            <MenuItem value="Finalizado">Finalizado</MenuItem>
                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{flex: 1}}>
                    <Typography variant="h4" fontWeight="bold">Equipo de trabajo</Typography>
                    <FormControl fullWidth>
                            <Select id="equipo" value={tecnico} onChange={(e) => setTecnico(e.target.value)}>
                                <MenuItem value="Trabajador1">Trabajador 1</MenuItem>
                                <MenuItem value="Trabajador2">Trabajador 2</MenuItem>
                                <MenuItem value="Trabajador3">Trabajador 3</MenuItem>
                                <MenuItem value="Trabajador4">Trabajador 4</MenuItem>
                            </Select>
                    </FormControl>
                </Box>
            </Box>

          </Box>
        </DialogContent>
        <DialogActions sx={{m: '5px 15px'}}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={onClose}>Guardar</Button>
      </DialogActions>
      </Dialog>
    );
  };
  
  export default EditarSolicitud;
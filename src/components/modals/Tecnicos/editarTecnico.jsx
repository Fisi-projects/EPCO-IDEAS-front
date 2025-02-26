import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem
  } from '@mui/material';
  
  const EditarTecnico = ({ open, onClose, request }) => {
    if (!request) return null; // Si no hay solicitud, no renderizar nada

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
              <TextField id="nombre" placeholder="Titulo de solicitud" defaultValue="Solicitud predeterminada" fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Apellidos</Typography>
              <TextField id="apellido" placeholder="Nombre del cliente" defaultValue="Nombre-Cliente" fullWidth></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Correo Electronico</Typography>
              <TextField id="email" placeholder="Ingrese el correo electronico" defaultValue="example@domain.com" fullWidth></TextField>
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                <Box>
                <Typography variant="h4" fontWeight="bold">Celular</Typography>
                <TextField id="celular" placeholder="Ingrese el celular" defaultValue="987654321" fullWidth></TextField>
                </Box>
                <Box>
                <Typography variant="h4" fontWeight="bold">DNI</Typography>
                <TextField id="documento" placeholder="Ingrese el DNI" defaultValue="961219000" fullWidth></TextField>
                </Box>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Fecha de Nacimiento</Typography>
              <TextField id="fecha_nac" placeholder="xx/xx/20xx" defaultValue="xx/xx/20xx" sx={{width:'190px'}}></TextField>
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
  
  export default EditarTecnico;
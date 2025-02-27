import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

const EliminarSolicitud = ({ open, onClose, request, handleRefresh }) => {
  if (!request) return null; // Si no hay solicitud, no renderizar nada

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/solicitudes/delete/${request.id}`);
      if (response.status === 200) {
        console.log('Solicitud eliminada correctamente');
        handleRefresh();
        onClose();
      }
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
        Confirmar Eliminación
      </DialogTitle>
      <DialogContent sx={{ borderBottom: '1px solid #d1d1d1' }}>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <Typography variant="body1">
            ¿Está seguro de que desea eliminar la solicitud con el título "{request.title}"?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: '5px 15px' }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EliminarSolicitud;
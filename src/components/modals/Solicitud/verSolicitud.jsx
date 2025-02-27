import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const VerSolicitud = ({ open, onClose, request }) => {
  if (!request) return null; // Si no hay solicitud, no renderizar nada

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
      Detalles de la Solicitud
      <Typography variant="body2">N° {request.id}</Typography>
    </DialogTitle>
      <DialogContent sx={{borderBottom: '1px solid #d1d1d1'}}>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <Box display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="bold">Título</Typography>
            <Typography variant="body2">{request.title}</Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="bold">Cliente</Typography>
            <Typography variant="body2">{request.cliente_nombre}</Typography>
          </Box>
          <Box display="flex" justifyContent={'space-between'} >
            <Box display="flex" flexDirection="column" width={'50%'}>
              <Typography variant="body2" fontWeight="bold">Celular</Typography>
              <Typography variant="body2">{request.cliente_celular}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" width={'50%'}>
              <Typography variant="body2" fontWeight="bold">Fecha</Typography>
              <Typography variant="body2">{request.fecha}</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="bold">Productos</Typography>
            {
              request.productos_nombres.map((producto, index) => (
                <Typography variant="body2" key={index}>
                  {producto.length > 20 ? `${producto.substring(0, 50)}...` : producto}
                </Typography>
              ))
            }
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="bold">Descripción</Typography>
            <Typography variant="body2">{request.descripcion}</Typography>
          </Box>
          {/* <Box display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="bold">Dirección</Typography>
            <Typography variant="body2">{request.direccion}</Typography>
          </Box> */}
          <Box display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="bold">Estado</Typography>
            <Typography variant="body2">{request.estado}</Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="bold">Equipo de trabajo</Typography>
            <Typography variant="body2">{request.tecnico_nombre}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" sx={{ m: '5px 10px' }}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerSolicitud;

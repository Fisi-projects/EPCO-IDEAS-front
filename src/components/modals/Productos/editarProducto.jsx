import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem
  } from '@mui/material';
  import {Remove, Add} from '@mui/icons-material';
  import { useState } from 'react';
  
const EditarProducto = ({ open, onClose, request }) => {
    const [stock, setStock] = useState(10); // Default stock value
    const handleStockChange = (change) => {
        setStock((prev) => Math.max(0, prev + change));
    };
    if (!request) return null;
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
                Agregar Producto
            </DialogTitle>
            <DialogContent sx={{ borderBottom: '1px solid #d1d1d1' }}>
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Nombre</Typography>
                        <TextField id="nombre" placeholder="Nombre del producto" fullWidth defaultValue="Producto X" />
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Descripcion del producto</Typography>
                        <TextField id="descripcion" placeholder="Descripcion del producto" fullWidth multiline rows={3} defaultValue="Descripción del producto X" />
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Imagen del producto</Typography>
                        <TextField id="imagen" placeholder="Suba la imagen del producto" fullWidth defaultValue="imagen.jpg" />
                    </Box>
                    <Box>
                        <Typography variant='h4' fontWeight="bold">Stock</Typography>
                        <Box display="flex" gap={1}>
                            <Button onClick={() => handleStockChange(-1)} variant="outlined" disabled={stock === 0}>
                                <Remove />
                            </Button>
                            <TextField value={stock} sx={{ width: "70px", textAlign: 'center' }} />
                            <Button onClick={() => handleStockChange(1)} variant="outlined">
                                <Add />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ m: '5px 15px' }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={onClose}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};
  
export default EditarProducto;
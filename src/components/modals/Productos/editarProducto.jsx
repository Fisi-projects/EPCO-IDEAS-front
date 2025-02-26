import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem,
    styled
} from '@mui/material';
import { Remove, Add } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const EditarProducto = ({ open, onClose, request }) => {
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (request) {
            setStock(request.stock || 0);
            setImage(request.image || null);
        }
    }, [request]);

    const sendUpdate = () =>{
        axios.put('https://epco-ideas-back.onrender.com/productos/update', {
            id: request.id,
            name: document.getElementById('nombre').value,
            description: document.getElementById('descripcion').value,
            price: document.getElementById('precio').value,
            stock: stock,
            image: image
        })
    }

    const handleStockChange = (change) => {
        setStock((prev) => Math.max(0, prev + change));
    };

    const handleImageChange = (e) =>{
        const selectedFile = e.target.files[0];
        const filetype = selectedFile.type;
        if(!filetype.includes('image')){
            alert('El archivo seleccionado no es una imagen');
            return;
        }
        setImage(URL.createObjectURL(selectedFile));
    }


    if (!request) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
                Editar Producto
            </DialogTitle>
            <DialogContent sx={{ borderBottom: '1px solid #d1d1d1' }}>
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Nombre</Typography>
                        <TextField id="nombre" placeholder="Nombre del producto" fullWidth defaultValue={request?.name} />
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Descripcion del producto</Typography>
                        <TextField id="descripcion" placeholder="Descripcion del producto" fullWidth multiline rows={3} defaultValue={request.description} />
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Precio del producto</Typography>
                        <TextField id="imagen" placeholder="Precio del producto" fullWidth defaultValue={request.price} />
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Imagen del Producto</Typography>
                        <Button
                            component="label"
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Subir imagen
                            <VisuallyHiddenInput type="file" multiple  onChange={(e) => handleImageChange(e)}/>
                        </Button>
                        {image && <img src={image} alt="Imagen del producto" style={{ width: 'auto', height: '250px', objectFit: 'cover', marginTop:'10px' }} />}
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
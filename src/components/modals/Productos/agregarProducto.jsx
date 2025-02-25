import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem,
    styled
  } from '@mui/material';
  import {Remove, Add} from '@mui/icons-material';
  import { useState } from 'react';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useNavigate } from 'react-router';


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


  const AgregarProducto = ({ open, onClose, handleRefresh}) => {
    const [stock, setStock] = useState(0);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [image, setImage] = useState(''); 
    const [file, setFile] = useState(null);
    const Navigate = useNavigate();
  
    const handleImageChange = (e) =>{
      const selectedFile = e.target.files[0];
      const filetype = selectedFile.type;
      if(!filetype.includes('image')){
          alert('El archivo seleccionado no es una imagen');
          return;
      }
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }


    const sendData = async () =>{
      const formData = new FormData();
      formData.append('name', nombre);
      formData.append('description', descripcion);
      formData.append('price', precio);
      formData.append('stock', stock);
      if (image) {
          formData.append('image', file);
      }

      try {
            await axios.post('http://localhost:3000/productos/create', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
            });
          alert('Producto agregado exitosamente');
          onClose();
          handleRefresh();

      } catch (error) {
          console.error('Error al agregar el producto:', error);
          alert('Hubo un error al agregar el producto');
      }
    }
    
    const handleStockChange = (change) => {
        setStock((prev) => Math.max(0, prev + change));
        };

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
            Agregar Producto
        </DialogTitle>
        <DialogContent sx={{borderBottom: '1px solid #d1d1d1'}}>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box>
              <Typography variant="h4" fontWeight="bold">Nombre</Typography>
              <TextField id="nombre" placeholder="Nombre del producto" fullWidth 
                onChange={(e) => setNombre(e.target.value)}
              ></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Precio del producto</Typography>
              <TextField id="precio" placeholder="Precio del producto" fullWidth 
                onChange={(e) => setPrecio(e.target.value)}
              ></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Descripcion del producto</Typography>
              <TextField id="descripcion" placeholder="Descripcion del producto" 
                onChange={(e) => setDescripcion(e.target.value)}
                fullWidth multiline rows={3}></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Imagen del producto</Typography>
              
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
                        <Remove/>
                    </Button>
                    <TextField value={stock} sx={{ width: "70px", textAlign:'center' }}/>
                    <Button onClick={() => handleStockChange(1)} variant="outlined" >
                        <Add/>
                    </Button>
                </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{m: '5px 15px'}}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={sendData}>Guardar</Button>
      </DialogActions>
      </Dialog>
    );
  };
  
  export default AgregarProducto;
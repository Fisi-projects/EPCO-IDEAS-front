import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Add, Remove } from "@mui/icons-material";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

export default function ModalComponent(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [stock, setStock] = useState(0);
    const handleStockChange = (change) => {
        setStock((prev) => Math.max(0, prev + change));
      };
    
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
            open={open}
            onClose={handleClose}
            >
                <Box sx={style} >
                    <Box sx={{borderBottom: 1 }}> 
                        <Typography variant="h6" component="h2" sx={{mb:2}} >
                        Agregar Producto
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" gap={2} mt={2} >
                        <Box display="flex" flexDirection="column" >
                            <Typography>Nombre</Typography>
                            <TextField
                            placeholder="Ingrese el nombre del producto"
                            size="small"
                            /> 
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography>Descripcion del producto</Typography>
                            <TextField
                                placeholder="Descripcion"
                                size="small"
                            />
                            </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography>Imagen de producto</Typography>
                            <TextField
                                placeholder="Imagen"
                                size="small"
                            />
                        </Box>
                        <Box sx={{borderBottom: 1}}>
                            <Typography>Stock</Typography>
                            <Box display="flex" gap={1} mb={4} >
                                <Button onClick={() => handleStockChange(-1)} variant="outlined" sx={{ color: 'gray', borderColor: 'gray'}}>
                                    <Remove/>
                                </Button>
                                <TextField value={stock} size="small" sx={{ width: "75px" }}/>
                                <Button onClick={() => handleStockChange(1)} variant="outlined" sx={{ color: 'gray', borderColor: 'gray'}}>
                                    <Add/>
                                </Button>
                            </Box>
                        </Box>
                   </Box>
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                        <Button onClick={handleClose} variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Cancelar</Button>
                        <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>Guardar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};
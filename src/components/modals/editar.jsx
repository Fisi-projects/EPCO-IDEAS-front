import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
    
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            >
                <Box sx={style}>
                    <Box sx={{borderBottom: 1, }}> 
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:2}} >
                        Agregar Tecnico
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={2} mt={2} >
                        <Box display="flex" flexDirection="column" >
                            <Typography>Nombre</Typography>
                            <TextField
                            placeholder="Ingrese el nombre del tecnico"
                            /> 
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography>Descripcion del producto</Typography>
                            <TextField
                                placeholder="Apellidos de tecnico"
                                
                            />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography>Correo electronico</Typography>
                            <TextField
                                placeholder="example@gmail.com"
                            />
                        </Box>
                        <Box display="flex" gap={4}>
                            <Box display="flex" flexDirection="column">
                                <Typography>Celular</Typography>
                                <TextField
                                    placeholder="Celular"
                                />
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography>DNI</Typography>
                                <TextField
                                    placeholder="Ingresa DNI"
                                />
                            </Box>
                        </Box>
                        
                        <Box sx={{borderBottom: 1}}>
                            <Box mb={3}>
                                <Typography>Fecha de nacimiento</Typography>
                                <TextField
                                    placeholder="F. de nacimiento"
                                />
                            </Box>
                        </Box>
                   </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Cancelar</Button>
                        <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>Guardar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};
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
                        Detalle de Solicitud
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={2} mt={2} >
                        <Box display="flex" flexDirection="column" >
                            <Typography>Titulo</Typography>
                            <TextField
                            placeholder="Titulo asignado"
                            /> 
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography>Cliente</Typography>
                            <TextField
                                placeholder="Cliente asignado"
                                
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
                                <Typography>Fecha</Typography>
                                <TextField
                                    placeholder="Fecha"
                                />
                            </Box>
                        </Box>
                        
                        <Box display="flex" flexDirection="column">
                            <Typography>Productos</Typography>
                            <TextField
                                placeholder="Productos elegidos"
                            />
                        </Box>
                        
                        <Box sx={{borderBottom: 1}}>
                            <Box display="flex" flexDirection="column" mb={3}>
                                <Typography>Descripcion del caso</Typography>
                                <TextField
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
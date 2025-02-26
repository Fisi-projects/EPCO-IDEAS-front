import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
                    <Box > 
                        <Typography align="center" id="modal-modal-title" variant="h6" component="h2" sx={{mb:4}} >
                        Estas seguro de eliminar este elemento
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                        <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Cancelar</Button>
                        <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>Eliminar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};
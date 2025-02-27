import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BorderAllRounded } from "@mui/icons-material";
import axios from "axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

export default function EliminarElemento({open, onClose, request, handleRefresh, url}) {
    if (!request) return null;
    
    const onDelete = () =>{
        axios.delete(`${url}/${request.id}`)
        .then(() => {
            alert("Elemento eliminado");
            onClose();
            handleRefresh();
        })
        .catch(() => {
            alert("Error al eliminar el elemento");
            onClose(); 
        }
        );
        
    }

    return (
        <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Box > 
                    <Typography align="center" id="modal-modal-title" variant="h5" component="h2" sx={{mb:4}} >
                    Estas seguro de eliminar este elemento
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                    <Button variant="outlined" onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={onDelete} >Eliminar</Button>
                </Box>
            </Box>
        </Modal>
);
};
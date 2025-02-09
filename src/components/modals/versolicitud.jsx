import { useState, useEffect } from "react";
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

    const [datos, setDatos] = useState(null);

    useEffect(() => {
        fetch("/datos.json")
            .then((response) => response.json())
            .then((data) => setDatos(data));
    }, []);

    if (!datos) return <div>Cargando...</div>;

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
            open={open}
            onClose={handleClose}
            >
                <Box sx={style} >
                    <Box> 
                            <Typography variant="h6" component="h2">Detalles de Solicitud</Typography>
                            <Typography variant="subtitle2" color="textSecondary">{datos.id}</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" gap={2} mt={2} sx={{borderBottom: 1, borderTop: 1}} >
                        <Box display="flex" flexDirection="column" mt={2}>
                            <Typography variant="body2" fontWeight="bold">Titulo</Typography>
                            <Typography variant="body2">{datos.titulo}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body2" fontWeight="bold">Cliente</Typography>
                            <Typography variant="body2">{datos.cliente}</Typography>
                        </Box>
                        <Box display="flex" gap={21} >
                            <Box display="flex" flexDirection="column">
                            <Typography variant="body2" fontWeight="bold">Celular</Typography>
                            <Typography variant="body2">{datos.celular}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                            <Typography variant="body2" fontWeight="bold">Fecha</Typography>
                            <Typography variant="body2">{datos.fecha}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body2" fontWeight="bold">Productos</Typography>
                            <Typography variant="body2">{datos.productos.join(", ")}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body2" fontWeight="bold">Descripcion</Typography>
                            <Typography variant="body2">{datos.descripcion}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" mb={2}>
                            <Typography variant="body2" fontWeight="bold">Direccion</Typography>
                            <Typography variant="body2">{datos.direccion}</Typography>
                        </Box>
                   </Box>
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                        <Button onClick={handleClose} variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Cancelar</Button>
                        <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>Guardar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};
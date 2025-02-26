import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';

const AgregarSolicitud = ({ open, onClose }) => {
  const [product, setProduct] = useState('');
  const [estado, setEstado] = useState('');
  const [tecnico, setTecnico] = useState('');

return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
            Solicitud
            <IconButton onClick={onClose} sx={{ position: 'absolute', right: 15, top: 10 }}>
                <Close />
            </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '10px !important' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField id="titulo" fullWidth label="Título" placeholder="Ingrese el título" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select id="productos" value={product} onChange={(e) => setProduct(e.target.value)} label="Producto">
                            <MenuItem value="Producto 1">Producto 1</MenuItem>
                            <MenuItem value="Producto 2">Producto 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="cliente" fullWidth label="Cliente" placeholder="Ingrese el cliente" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="ubicacion" fullWidth label="Ubicación" placeholder="Ingrese la ubicación" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="celular" fullWidth label="Celular" placeholder="Ingrese el celular" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="fecha" fullWidth label="Fecha" placeholder="Ingrese la fecha" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                            <MenuItem value="En proceso">En proceso</MenuItem>
                            <MenuItem value="En espera">En espera</MenuItem>
                            <MenuItem value="Finalizado">Finalizado</MenuItem>
                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select id="tecnico" value={tecnico} onChange={(e) => setTecnico(e.target.value)}>
                            <MenuItem value="Trabajador1">Trabajador 1</MenuItem>
                            <MenuItem value="Trabajador2">Trabajador 2</MenuItem>
                            <MenuItem value="Trabajador3">Trabajador 3</MenuItem>
                            <MenuItem value="Trabajador4">Trabajador 4</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="descripcion" fullWidth label="Descripción del caso" placeholder="Ingrese la descripción" multiline rows={3} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions sx={{m: '0px 15px 10px'}}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={onClose}>Guardar</Button>
        </DialogActions>
    </Dialog>
);
};

export default AgregarSolicitud;
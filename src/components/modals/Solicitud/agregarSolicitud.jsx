import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, FormControl, Select, MenuItem, IconButton, Typography, Box, InputLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AgregarSolicitud = ({ open, onClose, handleRefresh }) => {
    // Datos de Solicitud
    const [titulo, setTitulo] = useState('');
    const [producto, setProducto] = useState('');
    const [clienteExistente, setClienteExistente] = useState('');
    const [estado, setEstado] = useState('');
    const [tecnico, setTecnico] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');

    // Datos de cliente nuevo
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNac, setFechaNac] = useState('');

    // Estado para alternar entre cliente existente o nuevo
    const [isClienteNuevo, setIsClienteNuevo] = useState(false);

    // Para Dropdowns
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);

    useEffect(() => {
        axios.get('https://epco-ideas-back.onrender.com/productos/all')
        .then((res) => {
            setProductos(res.data);
        })
        .catch((error) => {
            console.error('Error al obtener los productos:', error);
        });

        axios.get('https://epco-ideas-back.onrender.com/users/clientes/all')
        .then((res) => {
            setClientes(res.data);
        })
        .catch((error) => {
            console.error('Error al obtener los clientes:', error);
        });

        axios.get('https://epco-ideas-back.onrender.com/users/tecnico/nombres')
        .then((res) => {
            setTecnicos(res.data);
        })
        .catch((error) => {
            console.error('Error al obtener los técnicos:', error);
        });
    }, []);
        

    // Manejo del envío de datos
    const handleSave = async () => {
        try {
            const formatFecha = (date) => { // 2025-02-15T00:00:00.000Z
                const [year, month, day] = date.split('-');
                return new Date(year, month - 1, day).toISOString();
            }

            let solicitudData = {
                title: titulo,
                productos: [producto],
                fecha: formatFecha(fecha),
                descripcion: descripcion,
                estado: estado,
                tecnico_id: tecnico,
            };

            let dataToSend = { solicitudData };

            if (isClienteNuevo) {
                // Si es un cliente nuevo, incluir los datos del cliente
                const clienteData = {
                    nombres: nombres,
                    apellidos: apellidos,
                    email: email,
                    dni: dni,
                    direccion: direccion,
                    telefono: telefono,
                    fecha_nac: formatFecha(fechaNac),
                };
                dataToSend.clienteData = clienteData;
            } else {
                // Si es un cliente existente, incluir solo el ID
                solicitudData.cliente_id = clienteExistente;
            }

            const response = await axios.post('https://epco-ideas-back.onrender.com/solicitudes/create', dataToSend);
            if (response.status === 201) {
                console.log('Solicitud creada exitosamente:', response.data);
                handleRefresh();
                onClose();
            } else {
                console.error('Error al crear la solicitud:', response.data);
            }
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Crear Solicitud
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 15, top: 10 }}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ paddingTop: '10px !important' }}>
                <Grid container spacing={2}>
                    {/* Título */}
                    <Grid item xs={12}>
                        <TextField
                            id="titulo"
                            fullWidth
                            label="Título"
                            placeholder="Ingrese el título"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </Grid>

                    {/* Producto */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-productos">Producto</InputLabel>
                            <Select
                                id="productos"
                                value={producto}
                                onChange={(e) => setProducto(e.target.value)}
                                labelId="select-productos"
                                label="Producto"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: '50%',
                                        },
                                    },
                                }}
                            >
                                {productos.map((producto) => (
                                    <MenuItem key={producto.id} value={producto.id}>{producto.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Cliente */}
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => setIsClienteNuevo(!isClienteNuevo)}
                        >
                            {isClienteNuevo ? 'Usar Cliente Existente' : 'Crear Cliente Nuevo'}
                        </Button>
                    </Grid>

                    {/* Cliente Existente */}
                    {!isClienteNuevo && (
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-clientes">Cliente Existente</InputLabel>
                                <Select
                                    id="cliente"
                                    value={clienteExistente}
                                    onChange={(e) => setClienteExistente(e.target.value)}
                                    label="Cliente Existente"
                                    labelId="select-clientes"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: '50%',
                                            },
                                        },
                                    }}
                                >
                                    {clientes.map((cliente) => (
                                        <MenuItem key={cliente.id} value={cliente.id}>{cliente.nombres} {cliente.apellidos}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}

                    {/* Cliente Nuevo */}
                    {isClienteNuevo && (
                        <Box
                            sx={{
                                transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
                                opacity: isClienteNuevo ? 1 : 0,
                                transform: isClienteNuevo ? 'translateY(0)' : 'translateY(-20px)',
                                backgroundColor: '#E5E4E2',
                                p: 2,
                                borderRadius: 1,
                                mt: 2,
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>Datos del Cliente Nuevo</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="nombres"
                                        fullWidth
                                        label="Nombres"
                                        placeholder="Ingrese los nombres"
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="apellidos"
                                        fullWidth
                                        label="Apellidos"
                                        placeholder="Ingrese los apellidos"
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        label="Email"
                                        placeholder="Ingrese el email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="dni"
                                        fullWidth
                                        label="DNI"
                                        placeholder="Ingrese el DNI"
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="direccion"
                                        fullWidth
                                        label="Dirección"
                                        placeholder="Ingrese la dirección"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="telefono"
                                        fullWidth
                                        label="Teléfono"
                                        placeholder="Ingrese el teléfono"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="fechaNac"
                                        fullWidth
                                        label="Fecha de Nacimiento"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={fechaNac}
                                        onChange={(e) => setFechaNac(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {/* Ubicación */}
                    {/* <Grid item xs={12} sm={6}>
                        <TextField
                            id="ubicacion"
                            fullWidth
                            label="Ubicación"
                            placeholder="Ingrese la ubicación"
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                        />
                    </Grid> */}

                    {/* Celular */}
                    {/* <Grid item xs={12} sm={6}>
                        <TextField
                            id="celular"
                            fullWidth
                            label="Celular"
                            placeholder="Ingrese el celular"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                        />
                    </Grid> */}

                    {/* Fecha */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="fecha"
                            fullWidth
                            label="Fecha"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </Grid>

                    {/* Estado */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-estado">Estado</InputLabel>
                            <Select
                                id="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                label="Estado"
                                labelId="select-estado"
                            >
                                <MenuItem value="En proceso">En proceso</MenuItem>
                                <MenuItem value="En espera">En espera</MenuItem>
                                <MenuItem value="Finalizado">Finalizado</MenuItem>
                                <MenuItem value="Cancelado">Cancelado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Técnico */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-tecnico">Técnico</InputLabel>
                            <Select
                                id="tecnico"
                                value={tecnico}
                                onChange={(e) => setTecnico(e.target.value)}
                                label="Técnico"
                                labelId="select-tecnico"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: '50%',
                                        },
                                    },
                                }}
                            >
                                {tecnicos.map((tecnico) => (
                                    <MenuItem key={tecnico.id} value={tecnico.id}>{tecnico.nombreCompleto} {tecnico.apellidos}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Descripción */}
                    <Grid item xs={12}>
                        <TextField
                            id="descripcion"
                            fullWidth
                            label="Descripción del caso"
                            placeholder="Ingrese la descripción"
                            multiline
                            rows={3}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ m: '0px 15px 10px' }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AgregarSolicitud;
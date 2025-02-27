import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Button,
    Typography, Box,
    FormControl, Select, MenuItem,
    InputLabel
  } from '@mui/material';
import axios from 'axios';
  import { useEffect, useState } from 'react';
  
  const EditarSolicitud = ({ open, onClose, request, handleRefresh }) => {
    if (!request) return null; // Si no hay solicitud, no renderizar nada
    const [tecnico, setTecnico] = useState('');

    const [titulo, setTitulo] = useState(request.title || '');
    //const [producto, setProducto] = useState(); Editar productos nop
    const [clienteId, setClienteId] = useState(request.cliente_id || '');
    const [estado, setEstado] = useState(request.estado || '');
    const [tecnicoId, setTecnicoId] = useState(request.tecnico_id || '');
    const [descripcion, setDescripcion] = useState(request.descripcion || '');
    const [fecha, setFecha] = useState(request.fecha || '');
    

    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);

    useEffect(() => {
      console.log(request);
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
      

    const handleUpdate = async () => {
      try {
        const formatFecha = (date) => {
          const fecha = new Date(date);
          const year = fecha.getFullYear();
          const month = String(fecha.getMonth() + 1).padStart(2, '0');
          const day = String(fecha.getDate()).padStart(2, '0');
          const hours = String(fecha.getHours()).padStart(2, '0');
          const minutes = String(fecha.getMinutes()).padStart(2, '0');
          const seconds = String(fecha.getSeconds()).padStart(2, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        let solicitudUpdated = {
          title: titulo,
          cliente_id: clienteId,
          estado: estado,
          tecnico_id: tecnicoId,
          descripcion: descripcion,
          fecha: formatFecha(fecha)
        }

        solicitudUpdated = Object.fromEntries(
          Object.entries(solicitudUpdated).filter(([_, v]) => v !== '')
        );
        
        const response = await axios.put(`https://epco-ideas-back.onrender.com/solicitudes/update/${request.id}`, solicitudUpdated);

        if (response.status === 200 || response.status === 201 || response.status === 204) { 
          console.log('Solicitud actualizada correctamente');
          handleRefresh();
          onClose();
        }

      } catch (error) {
        console.error('Error al actualizar la solicitud:', error);
      }
    }

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ borderBottom: '1px solid #d1d1d1' }}>
            Detalles de la Solicitud
            <Typography variant="body2">N° {request.id}</Typography>
        </DialogTitle>
        <DialogContent sx={{borderBottom: '1px solid #d1d1d1', height:'460px'}}>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box>
              <Typography variant="h4" fontWeight="bold">Título</Typography>
              <TextField id="titulo" placeholder="Titulo de solicitud" defaultValue={request.title} fullWidth onChange={(e)  => setTitulo(e.target.value)}></TextField>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">Cliente</Typography>
              <FormControl fullWidth> 
                <Select
                  id="cliente"
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  label="Cliente"
                  labelId="select-clientes"
                  defaultValue={request.cliente_id}
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
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                {/* <Box>
                <Typography variant="h4" fontWeight="bold">Celular</Typography>
                <TextField id="celular" placeholder="N° de celular" defaultValue="961219000" fullWidth></TextField>
                </Box> */}
                <Box>
                <Typography variant="h4" fontWeight="bold">Fecha</Typography>
                <TextField 
                  id="fecha" 
                  placeholder="Fecha de creacion" 
                  defaultValue={request.fecha}
                  fullWidth type="date"
                  onChange={(e) => setFecha(e.target.value)}
                ></TextField>
                </Box>
            </Box>
            
            {/* <Box>
              <Typography variant="h4" fontWeight="bold">Productos</Typography>
              <TextField id="productos" placeholder="Productos elegidos" defaultValue="Producto(s) elegidos" fullWidth></TextField>
            </Box> */}
            <Box>
              <Typography variant="h4" fontWeight="bold">Descripcion del caso</Typography>
              <TextField id="descripcion" placeholder="Ingrese los detalles de la solicitud" defaultValue={request.descripcion} fullWidth multiline rows={3}></TextField>
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
                <Box sx={{flex: 1}}>
                    <Typography variant="h4" fontWeight="bold">Estado del caso</Typography>
                    <FormControl fullWidth>
                        <Select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} defaultValue={request.estado}>
                            <MenuItem value="En proceso">En proceso</MenuItem>
                            <MenuItem value="En espera">En espera</MenuItem>
                            <MenuItem value="Finalizado">Finalizado</MenuItem>
                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{flex: 1}}>
                    <Typography variant="h4" fontWeight="bold">Equipo de trabajo</Typography>
                    <FormControl fullWidth>
                            <Select id="equipo" value={tecnico} onChange={(e) => setTecnicoId(e.target.value)} defaultValue={request.tecnico_id}>
                              {tecnicos.map((tecnico) => (
                                  <MenuItem key={tecnico.id} value={tecnico.id}>{tecnico.nombreCompleto}</MenuItem>
                              ))}
                            </Select>
                    </FormControl>
                </Box>
            </Box>

          </Box>
        </DialogContent>
        <DialogActions sx={{m: '5px 15px'}}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleUpdate}>Guardar</Button>
      </DialogActions>
      </Dialog>
    );
  };
  
  export default EditarSolicitud;
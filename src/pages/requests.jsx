import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Button, Box, IconButton, Chip, Grid, Pagination, Typography,
  InputLabel, Select, MenuItem, FormControl, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Visibility, Download, Delete, FilterList, Edit, Add, Remove, Close } from '@mui/icons-material';
import data from '../data/db.json';

const RequestsTable = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Activo');
  const [priority, setPriority] = useState('Media');
  const [product, setProduct] = useState('');
  const rows = data.solicitud;

  // useEffect(() => {
  //   fetch('http://localhost:3000/solicitud')
  //     .then(response => response.json())
  //     .then(data => setRows(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage - 1);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredRows = rows.filter((row) =>
    row.titulo.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <Box sx={{ padding: "20px 25px" }}>
      <Typography variant="h2">Lista de Solicitudes</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Buscar"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button variant="outlined" startIcon={<FilterList />}>Filtrar por</Button>
        </Box>
      
      <Button variant="contained" onClick={handleOpen}>Agregar Solicitud</Button>
      </Box>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Solicitud
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 15, top: 10 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '10px !important' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Título" placeholder="Ingrese el título" /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Select value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Seleccione el producto"> 
                  {rows.map((row) => <MenuItem key={row.id} value={row.producto}>{row.producto}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Cliente" placeholder="Ingrese el cliente" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Ubicación" placeholder="Ingrese la ubicación" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Celular" placeholder="Ingrese el celular" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Fecha" placeholder="Ingrese la fecha" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Estado actual" placeholder="Ingrese el estado" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Equipo de trabajo" placeholder="Ingrese el equipo" /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Descripción del caso" placeholder="Ingrese la descripción" multiline rows={3} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
      {/* Tabla */}
      <Box>
        <Paper sx={{ padding: '10px 20px 15px'}}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID', 'Título', 'Cliente', 'Productos', 'Estado', 'Técnico', 'Acciones'].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 'bold'}}>
                      {head !== 'Acciones' ? (
                        <TableSortLabel
                          active={orderBy === head.toLowerCase()}
                          direction={orderBy === head.toLowerCase() ? order : 'asc'}
                          onClick={() => handleRequestSort(head.toLowerCase())}
                        >
                          {head}
                        </TableSortLabel>
                      ) : head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{width:"70px"}}>{row.id}</TableCell>
                    <TableCell>{row.titulo}</TableCell>
                    <TableCell>{row.cliente}</TableCell>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.estado}
                        sx={{
                          backgroundColor: 
                            row.estado === 'En proceso' ? '#EBF3EB' : 
                            row.estado === 'En espera' ? '#FFF4E5' : 
                            row.estado === 'Finalizado' ? '#E5F6FF' : 
                            '#FDECEC',
                          color: 
                            row.estado === 'En proceso' ? '#9DDDAF' : 
                            row.estado === 'En espera' ? '#FFC078' : 
                            row.estado === 'Finalizado' ? '#69BFF8' : 
                            '#F27573',
                          borderRadius: '3px',
                          padding: '4px 8px',
                          width: '92px',
                          height: '25px',
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.tecnico}</TableCell>
                    <TableCell>
                        <Box
                            sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            gap: 1
                            }}
                        >
                            {[Visibility, Edit, Download, Delete].map((Icon, index) => (
                            <Box
                                key={index}
                                sx={{
                                border: `1px solid ${index === 3 ? 'red' : '#676767'}`,
                                borderRadius: 1,
                                p: 0.5,
                                height: '35px',
                                width: '35px',
                                transition: 'background-color 0.3s',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '&:hover': {
                                    backgroundColor: index === 3 ? 'rgba(255, 0, 0, 0.2)' : '#e0e0e0'
                                }
                                }}
                            >
                                <IconButton
                                sx={{
                                    color: index === 3 ? 'red' : '#676767',
                                    height: '20px',
                                    width: '20px',
                                    '&:hover': { backgroundColor: 'transparent' }
                                }}
                                >
                                <Icon />
                                </IconButton>
                            </Box>
                            ))}
                        </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Grid container justifyContent="flex-end" mt={2}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
            shape="circular"
            size="small"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                color: '#444444',
                border: '1px solid #D9D9D9',
                '&:hover': {
                  backgroundColor: '#b0b0b0'
                },
                '&.Mui-selected': {
                  backgroundColor: '#D9D9D9',
                  color: '#444444',
                },
              },
            }}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default RequestsTable;
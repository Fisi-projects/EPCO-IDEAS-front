import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Button, Box, IconButton, Grid, Pagination, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Edit, Delete, Close } from '@mui/icons-material';
import data from '../data/db.json';

const ProductsTable = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const filter = '';
  const [open, setOpen] = useState(false);
  const techs = data.productos;

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

  const filteredTechs = techs.filter((tech) =>
    tech.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTechs.length / rowsPerPage);

  return (
    <Box sx={{ padding: '25px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2">Almacén de Productos</Typography>
        <Button variant="contained" onClick={handleOpen}>Agregar Producto</Button>
      </Box>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Agregar Técnico
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 20, top: 20 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '10px !important' }}> {/* Que carlos termine de hacer este botón :v*/}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Nombre" placeholder="Ingrese el nombre" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Apellido" placeholder="Ingrese el apellido" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="DNI" placeholder="Ingrese el DNI" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Fecha de Nacimiento" placeholder="Ingrese la fecha" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Teléfono" placeholder="Ingrese el teléfono" /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
      
      <Box>
        <Paper sx={{ padding: '10px 20px 15px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID', 'Imagen', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Acciones'].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 'bold' }}>
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
                {filteredTechs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tech) => (
                  <TableRow key={tech.id}>
                    <TableCell>{tech.id}</TableCell>
                    <TableCell>
                       <img src={tech.imagen} alt={tech.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    </TableCell>                   
                    <TableCell>{tech.nombre}</TableCell>
                    <TableCell>{tech.descripcion}</TableCell>
                    <TableCell>{tech.precio}</TableCell>
                    <TableCell>{tech.stock}</TableCell>
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
                            {[Edit, Delete].map((Icon, index) => (
                            <Box
                                key={index}
                                sx={{
                                border: `1px solid ${index === 1 ? 'red' : '#676767'}`,
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
                                    backgroundColor: index === 1 ? 'rgba(255, 0, 0, 0.2)' : '#e0e0e0'
                                }
                                }}
                            >
                                <IconButton
                                sx={{
                                    color: index === 1 ? 'red' : '#676767',
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
                '&:hover': { backgroundColor: '#b0b0b0' },
                '&.Mui-selected': { backgroundColor: '#D9D9D9', color: '#444444' },
              },
            }}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsTable;

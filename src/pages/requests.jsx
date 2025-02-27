import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Button, Box, IconButton, Chip, Grid, Pagination, Typography,
  InputLabel, Select, MenuItem, FormControl, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Visibility, Download, Delete, FilterList, Edit, Add, Remove, Close } from '@mui/icons-material';
import data from '../data/db.json';
import AgregarSolicitud from '../components/modals/Solicitud/agregarSolicitud';
import VerSolicitud from '../components/modals/Solicitud/verSolicitud';
import EditarSolicitud from '../components/modals/Solicitud/editarSolicitud';

import EliminarSolicitud from '../components/modals/Solicitud/EliminarSolicitud';
import axios from 'axios';


const RequestsTable = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [openAgregarSolicitud, setOpenAgregarSolicitud] = useState(false);
  const [openVerSolicitud, setOpenVerSolicitud] = useState(false);
  const [openEditarSolicitud, setOpenEditarSolicitud] = useState(false);

  const [openEliminarSolicitud, setOpenEliminarSolicitud] = useState(false);
  const [rows, setRows] = useState([]);


  useEffect(() => {
    console.log('Requests being fetched');
    axios.get('https://epco-ideas-back.onrender.com/solicitudes/table') 
    .then((res) => {
      const sortedData = res.data.sort((a, b) => a.id - b.id);
      setRows(sortedData);
      console.log(sortedData);
    })
    .catch((error) => {
      console.log(error);
    });
  } , [])

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage - 1);
  };

  const handleOpenAgregarSolicitud = () => setOpenAgregarSolicitud(true);
  const handleCloseAgregarSolicitud = () => setOpenAgregarSolicitud(false);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenVerSolicitud = (request) => {
    setSelectedRequest(request);
    setOpenVerSolicitud(true);
  };

  const handleCloseVerSolicitud = () => {
    setOpenVerSolicitud(false);
  };
  
  const handleOpenEditarSolicitud = (request) => {
    setSelectedRequest(request);
    setOpenEditarSolicitud(true);
  };

  const handleCloseEditarSolicitud = () => {
    setOpenEditarSolicitud(false);
  };

  const handleOpenEliminarSolicitud = (request) => {

    setSelectedRequest(request);
    setOpenEliminarSolicitud(true);
  };

  const handleCloseEliminarSolicitud = () => {
    setOpenEliminarSolicitud(false);
  };

  const handleRefresh = () => {
    axios.get('https://epco-ideas-back.onrender.com/solicitudes/table') 
    .then((res) => {
      const sortedData = res.data.sort((a, b) => a.id - b.id);
      setRows(sortedData);
    })
    .catch((error) => {
      console.log(error);
    });
  };


  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(filter.toLowerCase())
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
      
      <Button variant="contained" onClick={handleOpenAgregarSolicitud}>Agregar Solicitud</Button>
      </Box>
      
      <Box>
        <Paper sx={{ padding: '10px 20px 15px'}}>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  {['ID', 'Título', 'Cliente', 'Productos', 'Estado', 'Técnico', 'Acciones'].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 'bold',...(head === 'Acciones' && { textAlign: 'center' })}}>
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
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.cliente_nombre}</TableCell>
                    <TableCell>
                      {row.productos_nombres.map((producto, index) => (
                        <p key={index}>
                          {producto.length > 20 ? `${producto.substring(0, 20)}...` : producto}
                        </p>
                      ))}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={row?.estado}
                        sx={{
                          backgroundColor: 
                            row?.estado === 'En proceso' ? '#EBF3EB' : 
                            row?.estado === 'En espera' ? '#FFF4E5' : 
                            row?.estado === 'Finalizado' ? '#E5F6FF' : 
                            '#FDECEC',
                          color: 
                            row?.estado === 'En proceso' ? '#9DDDAF' : 
                            row?.estado === 'En espera' ? '#FFC078' : 
                            row?.estado === 'Finalizado' ? '#69BFF8' : 
                            '#F27573',
                          borderRadius: '3px',
                          padding: '4px 8px',
                          width: '92px',
                          height: '25px',
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>

                    <TableCell>{row.tecnico_nombre}</TableCell>

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
                          <IconButton onClick={() => handleOpenVerSolicitud(row)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%'}}>
                            <Visibility />
                          </IconButton>
                          <IconButton onClick={() => handleOpenEditarSolicitud(row)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%'}}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleOpenVerSolicitud(row)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%'}}>
                            <Download />
                          </IconButton>
                          <IconButton onClick={() => handleOpenEliminarSolicitud(row)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%', borderColor: '#F03D3E', color: '#F03D3E'}}>
                            <Delete />
                          </IconButton>
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
      <AgregarSolicitud 
        open={openAgregarSolicitud} 
        onClose={handleCloseAgregarSolicitud} 
        handleRefresh={handleRefresh}
      />
      <VerSolicitud
        open={openVerSolicitud}
        onClose={handleCloseVerSolicitud}
        request={selectedRequest}
      />
      <EditarSolicitud
        open={openEditarSolicitud}
        onClose={handleCloseEditarSolicitud}
        request={selectedRequest}
        handleRefresh={handleRefresh}
      />
      <EliminarSolicitud
        open={openEliminarSolicitud}
        onClose={handleCloseEliminarSolicitud}
        request={selectedRequest}
        handleRefresh={handleRefresh}
      />
      <EliminarElemento
        open={openEliminarSolicitud}
        onClose={handleCloseEliminarSolicitud}
        request={selectedRequest}
        handleRefresh={handleRefresh}
      />
    </Box>
  );
};

export default RequestsTable;
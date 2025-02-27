import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Button, Box, IconButton, Grid, Pagination, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Edit, Delete, Close, FilterList } from '@mui/icons-material';
import data from '../data/db.json';
import EditarTecnico from '../components/modals/Tecnicos/editarTecnico';
import AgregarTecnico from '../components/modals/Tecnicos/agregarTecnico';
import EliminarElemento from '../components/modals/eliminarElemento';

const TechsTable = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [openAgregarTecnico, setOpenAgregarTecnico] = useState(false);
  const [openEditarTecnico, setOpenEditarTecnico] = useState(false);
  const [openEliminarTecnico, setOpenEliminarTecnico] = useState(false);
  const techs = data.techs;

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage - 1);
  };

  const handleOpenAgregarTecnico = () => setOpenAgregarTecnico(true);
  const handleCloseAgregarTecnico = () => setOpenAgregarTecnico(false);

  const handleOpenEditarTecnico = (request) => {
    setSelectedRequest(request);
    setOpenEditarTecnico(true);
  };

  const handleCloseEditarTecnico = () => {
    setOpenEditarTecnico(false);
  };
  const handleOpenEliminarTecnico = (request) => {
    setSelectedRequest(request);
    setOpenEliminarTecnico(true);
  };
  const handleCloseEliminarTecnico = () => {
    setOpenEliminarTecnico(false);
  };
  const filteredTechs = techs.filter((tech) =>
    tech.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTechs.length / rowsPerPage);

  return (
    <Box sx={{ padding: '20px 25px' }}>
      <Typography variant="h2">Técnicos</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Buscar"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button variant="outlined" startIcon={<FilterList />}>Filtrar por</Button>
        </Box>
        <Button variant="contained" onClick={handleOpenAgregarTecnico}>Agregar tecnico</Button>
      </Box>
      
      <Box>
        <Paper sx={{ padding: '10px 20px 15px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID', 'Nombre', 'Apellido', 'Celular', 'Correo', 'DNI', 'F.Nacimiento', 'Acciones'].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 'bold', ...(head === 'Acciones' && { textAlign: 'center' })}}>
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
                    <TableCell sx={{width:"70px"}}>{tech.id}</TableCell>
                    <TableCell>{tech.nombre}</TableCell>
                    <TableCell>{tech.apellido}</TableCell>
                    <TableCell>{tech.celular}</TableCell>
                    <TableCell>{tech.correo}</TableCell>
                    <TableCell>{tech.dni}</TableCell>
                    <TableCell>{tech.fecha_nacimiento}</TableCell>
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
                            <IconButton onClick={() => handleOpenEditarTecnico(tech)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%'}}>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleOpenEliminarTecnico(tech)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%', borderColor: '#F03D3E', color: '#F03D3E'}}>
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
                '&:hover': { backgroundColor: '#b0b0b0' },
                '&.Mui-selected': { backgroundColor: '#D9D9D9', color: '#444444' },
              },
            }}
          />
        </Grid>
      </Box>
      <AgregarTecnico
        open={openAgregarTecnico}
        onClose={handleCloseAgregarTecnico}
      />
      <EditarTecnico
        open={openEditarTecnico}
        onClose={handleCloseEditarTecnico}
        request={selectedRequest}
      />
      <EliminarElemento
        open={openEliminarTecnico}
        onClose={handleCloseEliminarTecnico}
        request={selectedRequest}
      />
    </Box>
  );
};

export default TechsTable;

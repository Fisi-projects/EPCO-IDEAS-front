import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Button, Box, IconButton, Grid, Pagination, Typography, Menu, MenuItem
} from '@mui/material';
import { Edit, Delete,  FilterList, ArrowDropDown } from '@mui/icons-material';
import EditarTecnico from '../components/modals/Tecnicos/editarTecnico';
import AgregarTecnico from '../components/modals/Tecnicos/agregarTecnico';
import EliminarElemento from '../components/modals/eliminarElemento';
import { useEffect } from 'react';
import axios from 'axios';

const url= 'https://epco-ideas-back.onrender.com/users/tecnicos/delete';

const TechsTable = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [filterField, setFilterField] = useState('nombres'); // Campo por defecto para filtrar
  const [openAgregarTecnico, setOpenAgregarTecnico] = useState(false);
  const [openEditarTecnico, setOpenEditarTecnico] = useState(false);
  const [openEliminarTecnico, setOpenEliminarTecnico] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [techs, setTechs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // Para el menú desplegable

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRefresh = () => {
    setRefresh(!refresh);
  }

  useEffect(()=>{
    axios.get('https://epco-ideas-back.onrender.com/users/tecnicos/all')
    .then((response) => {
      console.log(response.data);
      setTechs(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },
  [refresh]);

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
  
  // Abrir menú de filtros
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Cerrar menú de filtros
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Seleccionar campo de filtrado
  const handleFilterFieldSelect = (field) => {
    setFilterField(field);
    setFilter(''); // Limpiar el filtro actual
    handleFilterClose();
  };

  // Filtrar técnicos 
  const filteredTechs = techs.filter((tech) => {
    if (!filter) return true;
    
    const filterValue = filter.toLowerCase();
    switch(filterField) {
      case 'id':
        return tech.id.toString().includes(filterValue);
      case 'nombres':
        return tech.nombres.toLowerCase().includes(filterValue);
      case 'apellidos':
        return tech.apellidos.toLowerCase().includes(filterValue);
      case 'telefono':
        return tech.telefono.toLowerCase().includes(filterValue);
      case 'email':
        return tech.email.toLowerCase().includes(filterValue);
      case 'dni':
        return tech.dni.toLowerCase().includes(filterValue);
      case 'fecha_nac':
        return tech.fecha_nac.split('T')[0].includes(filterValue);
      default:
        return tech.nombres.toLowerCase().includes(filterValue);
    }
  });

  const totalPages = Math.ceil(filteredTechs.length / rowsPerPage);


  const getFilterFieldLabel = () => {
    switch(filterField) {
      case 'id': return 'ID';
      case 'nombres': return 'Nombre';
      case 'apellidos': return 'Apellido';
      case 'telefono': return 'Celular';
      case 'email': return 'Correo';
      case 'dni': return 'DNI';
      case 'fecha_nac': return 'F.Nacimiento';
      default: return 'Nombre';
    }
  };

  return (
    <Box sx={{ padding: '20px 25px' }}>
      <Typography variant="h2">Técnicos</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '20px' }}>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            variant="outlined"
            placeholder={`Buscar por ${getFilterFieldLabel()}`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button 
            variant="outlined" 
            startIcon={<FilterList />}
            endIcon={<ArrowDropDown />}
            onClick={handleFilterClick}
          >
            Filtrar por: {getFilterFieldLabel()}
          </Button>
          
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleFilterFieldSelect('id')}>ID</MenuItem>
            <MenuItem onClick={() => handleFilterFieldSelect('nombres')}>Nombre</MenuItem>
            <MenuItem onClick={() => handleFilterFieldSelect('apellidos')}>Apellido</MenuItem>
            <MenuItem onClick={() => handleFilterFieldSelect('telefono')}>Celular</MenuItem>
            <MenuItem onClick={() => handleFilterFieldSelect('email')}>Correo</MenuItem>
            <MenuItem onClick={() => handleFilterFieldSelect('dni')}>DNI</MenuItem>
            <MenuItem onClick={() => handleFilterFieldSelect('fecha_nac')}>F.Nacimiento</MenuItem>
          </Menu>
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
                    <TableCell>{tech.nombres}</TableCell>
                    <TableCell>{tech.apellidos}</TableCell>
                    <TableCell>{tech.telefono}</TableCell>
                    <TableCell>{tech.email}</TableCell>
                    <TableCell>{tech.dni}</TableCell>
                    <TableCell>{tech.fecha_nac.split('T')[0]}</TableCell>
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
        handleRefresh={handleRefresh}
      />
      <EditarTecnico
        open={openEditarTecnico}
        onClose={handleCloseEditarTecnico}
        request={selectedRequest}
        handleRefresh={handleRefresh}
      />
      <EliminarElemento
        open={openEliminarTecnico}
        onClose={handleCloseEliminarTecnico}
        request={selectedRequest}
        url={url}
        handleRefresh={handleRefresh}
      />
    </Box>
  );
};

export default TechsTable;
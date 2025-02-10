import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Button, Box, IconButton, Chip, Grid, Pagination, Typography
} from '@mui/material';
import { Visibility, Download, Delete, FilterList, Edit } from '@mui/icons-material';

const createData = (id, title, client, product, status, technician) => {
  return { id, title, client, product, status, technician };
};

const clients = ['Jeremy Rosillo', 'Sebastián Cueto', 'Kelly Bellido', 'Ricardo Calderon', 'Carlos Mendoza', 'Sebastian Castillo', 'Jhonatan Bartolo'];
const products = ['Fisi', 'Uywa', 'Tachitoteam', 'Time2Share', 'Fisitech'];
const statuses = ['Activo', 'Pendiente', 'Completado', 'Cancelado'];
const technicians = ['Ninguno'];

const rows = Array(25).fill().map((_, index) => 
  createData(
    index + 1, 
    `Solicitud ${index + 1}`, 
    clients[Math.floor(Math.random() * clients.length)], 
    products[Math.floor(Math.random() * products.length)], 
    statuses[Math.floor(Math.random() * statuses.length)], 
    technicians[Math.floor(Math.random() * technicians.length)]
  )
);

const RequestsTable = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage - 1);
  };

  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <Box sx={{ padding: "25px"}}>
      <Typography variant="h2" >Lista de Solicitudes</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Buscar"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button variant="outlined" startIcon={<FilterList />}>Filtrar por</Button>
        </Box>
        <Box> Aqui va tu parte carlitos </Box> 
      </Box>
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
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.client}</TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        sx={{
                          backgroundColor: 
                            row.status === 'Activo' ? '#EBF3EB' : 
                            row.status === 'Pendiente' ? '#FFF4E5' : 
                            row.status === 'Completado' ? '#E5F6FF' : 
                            '#FDECEC',
                          color: 
                            row.status === 'Activo' ? '#9DDDAF' : 
                            row.status === 'Pendiente' ? '#FFC078' : 
                            row.status === 'Completado' ? '#69BFF8' : 
                            '#F27573',
                          borderRadius: '3px',
                          padding: '4px 8px',
                          width: '92px',
                          height: '25px',
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.technician}</TableCell>
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

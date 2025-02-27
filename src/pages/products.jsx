import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TableSortLabel, TextField, Button, Box, IconButton, Grid, Pagination, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Edit, Delete, Close, FilterList } from '@mui/icons-material';
import AgregarProducto from '../components/modals/Productos/agregarProducto';
import EditarProducto from '../components/modals/Productos/editarProducto';
import EliminarElemento from '../components/modals/eliminarElemento';
import axios from 'axios';

const urlEliminate = 'https://epco-ideas-back.onrender.com/productos/delete'

const ProductsTable = () => {
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [openAgregarProducto, setOpenAgregarProducto] = useState(false);
  const [openEditarProducto, setOpenEditarProducto] = useState(false);
  const [openEliminarProducto, setOpenEliminarProducto] = useState(false);
  const [products, setProducts] = useState(null);
  const [Refresh, setRefresh] = useState(false);  //state para actualizar la tabla cuando se edita o eliminan productos
  //const products = data.productos;

  const handleRefresh = ()=>{
    setRefresh(!Refresh)
  }

  useEffect(()=>{
    console.log('wasa')
    axios.get('https://epco-ideas-back.onrender.com/productos/all')
    .then((res) => {
      //console.log(res.data)
      setProducts(res.data)
      }
    )
    .catch((error) => {
      console.log(error);
    });
  },[Refresh])

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage - 1);
  };

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenAgregarProducto = () => setOpenAgregarProducto(true);
  const handleCloseAgregarProducto = () => setOpenAgregarProducto(false);

  const handleOpenEditarProducto = (request) => {
    setSelectedRequest(request);
    setOpenEditarProducto(true);
    console.log(request)
  };

  const handleCloseEditarProducto = () => {
    setOpenEditarProducto(false);
  };

  const handleOpenEliminarProducto = (request) => {
    setSelectedRequest(request);
    setOpenEliminarProducto(true);
    console.log(request)
  }
  const handleCloseEliminarProducto = () => {
    setOpenEliminarProducto(false);
  }

  const filteredProducts = products ? products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  ) : [];

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  return (
    <Box sx={{ padding: '20px 25px' }}>
      <Typography variant="h2">Almacén de Productos</Typography>
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
        <Button variant="contained" onClick={handleOpenAgregarProducto}>Agregar Producto</Button>
      </Box>
      
      <Box>
        <Paper sx={{ padding: '10px 20px 15px'}}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID', 'Imagen', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Acciones'].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 'bold',...(head === 'Acciones' && { textAlign: 'center' }) }}>
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
                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                       <img src={product.image} alt={product.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    </TableCell>                   
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>S/{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
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
                        <IconButton onClick={() => handleOpenEditarProducto(product)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%'}}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleOpenEliminarProducto(product)} sx={{border: '1px solid #D9D9D9', borderRadius: '10%', borderColor: '#F03D3E', color: '#F03D3E'}}>
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
      <AgregarProducto
        open={openAgregarProducto}
        onClose={handleCloseAgregarProducto}
        handleRefresh={handleRefresh}
      />
      <EditarProducto
        open={openEditarProducto}
        onClose={handleCloseEditarProducto}
        request={selectedRequest}
      />
      <EliminarElemento
        open={openEliminarProducto}
        onClose={handleCloseEliminarProducto}
        request={selectedRequest}
        url={urlEliminate}
      />
    </Box>
  );
};

export default ProductsTable;

import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Card, CardContent, Typography, Pagination, Select, MenuItem, CardActions } from '@mui/material';
import AddModal from './ModalFields/AddModal';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldsOwnerRequest } from '../../../redux/actions/Owner/fieldsActions';
import DeleteModal from './ModalFields/DeleteModal';
import EditModal from './ModalFields/EditModal';

function Fields() {
  const ITEMS_PER_PAGE = 9;

  // State management
  const [fields, setFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [infoDetail, setInfoDetail] = useState(''); 

  const { data} = useSelector(state => state.fieldsOwner);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFieldsOwnerRequest(sessionStorage.getItem('userRoleId')));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFields(data);
    }
  }, [data]);

  const filteredData = fields.filter((field) => {
    const matchesSearchTerm = field.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? field.address.includes(selectedLocation) : true;
    const matchesSport = selectedSport ? field.sport === selectedSport : true;

    return matchesSearchTerm && matchesLocation && matchesSport;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = () => {
    setCurrentPage(1);
    setShowResults(true);
  };

  const handleDelete = (field) => {
    setInfoDetail(field)
    setOpenDeleteModal(true)
  }

  const handleEdit = (field) => {
    setInfoDetail(field)
    setOpenEditModal(true)
  }

  return (
    <Container className='w-full bg-white pt-5 rounded-md h-[calc(100vh-80px)]'>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">Tất cả địa điểm</MenuItem>
            <MenuItem value="Quận 10">Quận 10</MenuItem>
            <MenuItem value="Bình Thạnh">Bình Thạnh</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">Tất cả thể loại</MenuItem>
            <MenuItem value="Bóng đá">Bóng đá</MenuItem>
            <MenuItem value="Cầu lông">Cầu lông</MenuItem>
            <MenuItem value="Bóng chuyền">Bóng chuyền</MenuItem>
            <MenuItem value="Bóng rổ">Bóng rổ</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
            Thêm sân mới
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {paginatedData.map((field) => (
          <Grid item xs={12} sm={4} key={field.endPoint}>
            <Card className='shadow-md hover:shadow-xl'>
              <CardContent>
                <Grid container>
                  <Grid item xs = {12}>
                    <img src={field.pictureUrl} alt={field.name} style={{ width: '100%', height: '200px' }} />
                  </Grid>
                  <Grid item xs = {12}>
                  <Typography variant="h6">{field.name}</Typography>
                  <Typography color="textSecondary" className='min-h-12'>{field.address}</Typography>
                  <Typography>{field.sport}</Typography>
                  <Typography>{field.priceRange}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className='flex justify-between'>
                <Button size="small"  variant="outlined" onClick={() => handleEdit(field)}>Chỉnh sửa</Button>
                <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(field)}>Xóa</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} className='flex justify-center items-center'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          sx={{ marginTop: 2 }}
        />
      </Grid>

      <AddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
      <EditModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} infoDetail={infoDetail}/> 
      <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} infoDetail={infoDetail}/>
    </Container>
  );
}

export default Fields;

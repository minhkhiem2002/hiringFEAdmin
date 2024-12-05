import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add, Edit, Delete, LocationOn, SportsSoccer, AttachMoney } from '@mui/icons-material';
import AddModal from './ModalFields/AddModal';
import DeleteModal from './ModalFields/DeleteModal';
import EditModal from './ModalFields/EditModal';
import Loading from '../../../components/Loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldDetailOwnerRequest, getFieldsOwnerRequest } from '../../../redux/actions/Owner/fieldsActions';

function Fields() {
  const ITEMS_PER_PAGE = 6;

  const [fields, setFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [infoDetail, setInfoDetail] = useState('');

  const { data, isLoading, addSuccess, deleteSuccess, editSuccess } = useSelector(
    (state) => state.fieldsOwner
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFieldsOwnerRequest(sessionStorage.getItem('userRoleId')));
  }, []);

  useEffect(() => {
    if (addSuccess || editSuccess || deleteSuccess) {
      dispatch(getFieldsOwnerRequest(sessionStorage.getItem('userRoleId')));
    }
  }, [addSuccess, deleteSuccess, editSuccess]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
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

  const handleDelete = (field) => {
    setInfoDetail(field);
    dispatch(getFieldDetailOwnerRequest(field.endPoint));
    setOpenDeleteModal(true);
  };

  const handleEdit = (field) => {
    setInfoDetail(field);
    dispatch(getFieldDetailOwnerRequest(field.endPoint));
    setOpenEditModal(true);
  };

  return (
    <Container className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-6 rounded-xl shadow-lg">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <TextField
              label="Tìm kiếm sân"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3"
            />
            <div className="flex w-full md:w-2/3 gap-4">
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                displayEmpty
                className="flex-grow"
              >
                <MenuItem value="">Tất cả địa điểm</MenuItem>
                <MenuItem value="Quận 1">Quận 1</MenuItem>
                <MenuItem value="Quận 2">Quận 2</MenuItem>
                <MenuItem value="Quận 3">Quận 3</MenuItem>
                <MenuItem value="Quận 4">Quận 4</MenuItem>
                <MenuItem value="Quận 5">Quận 5</MenuItem>
              </Select>
              <Select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                displayEmpty
                className="flex-grow"
              >
                <MenuItem value="">Tất cả thể loại</MenuItem>
                <MenuItem value="Bóng đá">Bóng đá</MenuItem>
                <MenuItem value="Cầu lông">Cầu lông</MenuItem>
                <MenuItem value="Bóng chuyền">Bóng chuyền</MenuItem>
                <MenuItem value="Bóng rổ">Bóng rổ</MenuItem>
              </Select>
            </div>
            <Tooltip title="Thêm sân">
              <IconButton
                onClick={() => setOpenAddModal(true)}
                className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-4 rounded-full shadow-xl hover:shadow-2xl"
              >
                <Add fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>

          <Grid container spacing={4}>
            {paginatedData.map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field.endPoint}>
                <Card className="relative overflow-hidden rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-blue-100 via-white to-gray-50">
                  <img
                    src={field.pictureUrl}
                    alt={field.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-blue-700 mb-2 truncate">
                      {field.name}
                    </Typography>
                    <div className="flex items-center mb-3 text-gray-600">
                      <LocationOn fontSize="small" className="mr-2 text-red-500" />
                      {field.address}
                    </div>
                    <div className="flex items-center mb-3 text-green-600">
                      <SportsSoccer fontSize="small" className="mr-2" />
                      {field.sport}
                    </div>
                    <div className="flex items-center text-blue-600 font-semibold">
                      <AttachMoney fontSize="small" className="mr-2" />
                      {field.priceRange}
                    </div>
                  </CardContent>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(field)}
                      className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-lg"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(field)}
                      className="bg-red-100 hover:bg-red-200 p-2 rounded-full shadow-lg"
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div className="flex justify-center mt-8">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
            />
          </div>

          <AddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
          <EditModal
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            fieldData={infoDetail}
          />
          <DeleteModal
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            infoDetail={infoDetail}
          />
        </>
      )}
    </Container>
  );
}

export default Fields;

import React, { useState, useEffect } from "react";
import { IconButton, Pagination, Button, TextField, Select, MenuItem } from "@mui/material";
import { Edit, Palette, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getProductRequest } from "../../../redux/actions/Owner/productActions";
import Loading from "../../../components/Loading/loading";
import AddModal from "./ModalProductEquipment/AddModal";
import AddModalColor from "./ModalProductEquipment/AddModalColor";
import { fetchColorsRequest, fetchSizesRequest } from "../../../redux/actions/Owner/FilterProductActions";

const ProductEquipment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddColorModal, setOpenAddColorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState("");

  console.log('Size', selectedSize)
  const itemsPerPage = 9;

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.product);

  const { colors: colorData } = useSelector((state) => state.filterProduct);
  const { sizes: sizeData } = useSelector((state) => state.filterProduct);

  useEffect(() => {
    dispatch(fetchColorsRequest());
    dispatch(fetchSizesRequest());
  }, []);

  useEffect(() => {
    const params = {
      PageSize: itemsPerPage,
      PageNumber: 1, // Reset to first page when fetching
    };
    dispatch(getProductRequest(params));
  }, []);

  const filteredProducts = data?.products?.filter((product) => {
    const matchesSearch = !searchQuery || product.sport?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = !selectedColor || product.colorEndpoints?.some((color) => color.colorCode === selectedColor);
    const matchesCategory = !selectedCategory || product.categoryName === selectedCategory;
    const matchesSize = !selectedSize || (Array.isArray(product.sizes) && product.sizes.includes(selectedSize));
  
    return matchesSearch && matchesColor && matchesCategory && matchesSize;
  });
  

  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleChangeColor = (item) => {
    setSelectedItem(item.sportProductId);
    setOpenAddColorModal(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <TextField
            label="Tìm kiếm sản phẩm"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
         <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">Tất cả màu sắc</MenuItem>
            {colorData?.map((color) => (
              <MenuItem key={color.id} value={color.value}>
                {color.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">Tất cả thể loại</MenuItem>
            <MenuItem value="Football">Bóng đá</MenuItem>
            <MenuItem value="Basketball">Bóng rổ</MenuItem>
          </Select>
          <Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">Tất cả kích cỡ</MenuItem>
            {sizeData?.map((size) => (
              <MenuItem key={size.id} value={size}>
                {size.value}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
          Thêm sản phẩm
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6">
            {paginatedProducts?.map((product) => (
              <div key={product.endPoint} className="border rounded-lg shadow-md p-4 relative">
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-700">Giá: {product.price.toLocaleString()}đ</p>
                  <p className="text-gray-700">Thể loại: {product.categoryName}</p>
                  <div className="flex gap-2 mt-2">
                    {product.colorEndpoints.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.colorCode }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-3 right-2 flex gap-2">
                  <IconButton size="small" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="secondary" onClick={() => handleChangeColor(product)}>
                    <Palette fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination
              count={Math.ceil((filteredProducts?.length || 0) / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
      <AddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
      <AddModalColor openAddModal={openAddColorModal} setOpenAddModal={setOpenAddColorModal} id={selectedItem} />
    </div>
  );
};

export default ProductEquipment;

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination
} from '@mui/material';
import Logo from '../../../assets/images/logo_res_img.png'
import WarningIcon from '../../../assets/icons/WarningIcon.svg'
import CartItem from "./carditem";
import { useDispatch, useSelector } from 'react-redux';
import { getBoPhanRequest } from '../../../redux/actions/QLGM/BoPhanActions/nhapBDBP_QLGM';
import axios from 'axios';
import { baseUrl } from './../../../redux/const_api';

const createData = (name, number) => {
  return { name, number };
};

const ListBoPhan = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const getBoPhanDashboard = () => {
    return axios.get(baseUrl + `DsBps/GetDashboard?iddkdn=${sessionStorage.getItem('iddkdn')}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoPhanDashboard();
        const dataWorking = response?.data?.data.filter((item) => item.tt == 'Đang hoạt động');
        setRows(dataWorking);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  },[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full h-fit border rounded-[3px] shadow-md flex flex-col">
      <div className="flex-grow flex flex-col">
        <TableContainer className="flex-grow px-2" style={{ height:'450px'}}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '83.33%' }}><span className='text-lg font-semibold text-slate-500'>Bộ phận</span></TableCell>
                {/* <TableCell style={{ width: '16.67%' }}>
                  <div className="h-7 w-7  items-center bg-slate-100 px-1 py-1 rounded-md">
                        <img src = {WarningIcon} alt = 'icon' className="w-full h-full justify-left object-cover"/>
                  </div></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>
                    <CartItem image={Logo} name={row.Htcbql} Tgbp={row.Tgbp} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          className = 'w-full text-xs'
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default ListBoPhan;

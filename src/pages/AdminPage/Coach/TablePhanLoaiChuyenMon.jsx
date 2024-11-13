import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  DataGrid,
  Column,
  LoadPanel,
  Editing,
  ColumnChooser,
  Export,
  SearchPanel,
  HeaderFilter,
  Paging,
  Pager,
  StateStoring,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import { Grid } from "@mui/material";
import AddModal from "./ModalPhanLoaiChuyenMon/AddModal";
import EditModal from "./ModalPhanLoaiChuyenMon/EditModal";
import DeleteModal from "./ModalPhanLoaiChuyenMon/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { getNhapPhanLoaiChuyenMonQLGMRequest } from "../../../redux/actions/QLGM/NhapDanhMucActions/NhapPLCM_QLGMActions";
import Loading from "../../Loading/loading";

const allowedPageSizes = [5, 10, 15, 20];

function TablePhanLoaiChuyenMon() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [infoDetail, setInfoDetail] = useState(null);
  const [infoDetailShow, setInfoDetailShow] = useState(null);
  const [dataTableStaff, setDataTableStaff] = useState([]);
  const [page, setPage] = useState(0);
  const dataGridRef = useRef(null);
  const dispatch = useDispatch();

  const { data, addSuccess, editSuccess, deleteSuccess, isLoading } =
    useSelector((state) => state.nhapdanhmucPLCM_QLGM);

  useEffect(() => {
    if (!data) {
      dispatch(getNhapPhanLoaiChuyenMonQLGMRequest());
    }
    setInfoDetail(null);
    setInfoDetailShow(null);
    if (sessionStorage.getItem("danhmucStorageKey")) {
      sessionStorage.removeItem("danhmucStorageKey");
    }
  }, []);

  useEffect(() => {
    if (data) {
      setDataTableStaff(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (addSuccess || editSuccess || deleteSuccess) {
      dispatch(getNhapPhanLoaiChuyenMonQLGMRequest());
    }
    if (addSuccess == true) {
      sessionStorage.setItem(
        "danhmucStorageKey",
        JSON.stringify({ selectedRowKeys: [data.Idplcm] })
      );
    }
    if (editSuccess == true && infoDetailShow != null) {
      sessionStorage.setItem(
        "danhmucStorageKey",
        JSON.stringify({
          selectedRowKeys: [infoDetailShow.Idplcm],
          pageIndex: page,
        })
      );
    }
    if (deleteSuccess == true && infoDetailShow != null) {
      sessionStorage.setItem(
        "danhmucStorageKey",
        JSON.stringify({
          selectedRowKeys: [infoDetailShow.Idplcm],
          pageIndex: page,
        })
      );
    }
  }, [addSuccess, editSuccess, deleteSuccess, dispatch]);

  const onSelectionChanged = useCallback((e) => {
    let selectedData = e.selectedRowsData[0];
    setInfoDetail(selectedData);
    setInfoDetailShow(selectedData);
    if (dataGridRef.current) {
      const instance = dataGridRef.current.instance;
      const pageIndex = instance.pageIndex();
      setPage(pageIndex);
    }
  });

  const handleToolbarPreparing = (e) => {
    e.toolbarOptions.items.unshift({
      widget: "dxButton",
      options: {
        icon: "add",
        text: "Thêm mới",
        hint: "Thêm mới phân loại chuyên môn",
        onClick: () => setOpenAddModal(true),
        elementAttr: {
          class: "custom-add-button",
        },
      },
      location: "before",
    });
  };

  const handleEditClick = (e) => {
    const rowData = e.row.data;
    setInfoDetail(rowData);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (e) => {
    const rowData = e.row.data;
    setInfoDetail(rowData);
    setOpenDeleteModal(true);
  };

  const memoizedDataGrid = useMemo(
    () => (
      <DataGrid
        id="documentTypeGrid"
        dataSource={dataTableStaff}
        showBorders
        showRowLines
        selection={{ mode: "single" }}
        hoverStateEnabled
        height="100%"
        allowColumnResizing
        allowColumnReordering
        columnAutoWidth
        showColumnLines
        onSelectionChanged={onSelectionChanged}
        onToolbarPreparing={handleToolbarPreparing}
        onRowRemoving={handleDeleteClick}
        scrolling={{ mode: "standard" }}
        noDataText="Không có dữ liệu để hiển thị"
        loading={true}
        keyExpr="Idplcm"
        ref={dataGridRef}
      >
        <SearchPanel visible placeholder="Tìm kiếm" width={300} />
        <ColumnChooser disabled />
        <Export
          enabled
          allowExportSelectedData
          texts={{
            exportAll: "Xuất toàn bộ dữ liệu",
            exportSelectedRows: "Xuất dữ liệu được chọn",
            exportTo: "Xuất dưới dạng Excel",
          }}
        />
        <StateStoring
          enabled={true}
          type="sessionStorage"
          storageKey="danhmucStorageKey"
        />
        <HeaderFilter visible />
        <LoadPanel height={150} width={400} text="Loading data..." />
        <Editing
          mode="row"
          allowAdding={false}
          allowDeleting
          allowUpdating
          useIcons
        />
        <Paging defaultPageSize={15} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          showPageSizeSelector={true}
          showNavigationButtons={true}
        />
        <Column
          caption="Sửa/Xóa"
          type="buttons"
          alignment="center"
          buttons={[
            {
              name: "edit",
              icon: "edit",
              hint: "Chỉnh sửa",
              onClick: handleEditClick,
            },
            {
              name: "delete",
              hint: "Xóa",
              onClick: handleDeleteClick,
            },
          ]}
        />
        <Column
          alignment="center"
          dataField="Idplcm"
          caption="Số ghi"
          allowSorting={true}
          defaultSortOrder="desc"
          visible={false}
        />
        <Column
          alignment="left"
          dataField="Plnghd"
          caption="Phân loại nguồn hoạt động"
        />
        <Column
          alignment="left"
          dataField="Plcmbp"
          caption="Chuyên môn của bộ phận"
        />
        <Column alignment="left" dataField="nd" caption="Người nhập" />
      </DataGrid>
    ),
    [dataTableStaff]
  );

  return (
    <div className="bg-white w-full rounded-[3px] shadow-xl px-2">
      <style>
        {`
          .dx-datagrid-rowsview .dx-selection.dx-row:not(.dx-row-focused):not(.dx-row-removed) > td {
            background-color: #4590FF;
            color: white;
          }
          .dx-datagrid-headers {
            color: #4590FF !important;
            font-weight: 600;
            border-radius: 4px 4px 0 0;
          }
          .dx-datagrid .dx-header-filter:before {
            content: "\\f050 ";
          }
          .dx-datagrid {
            font-family: 'Gilroy';
          }
        `}
      </style>
      {!isLoading ? (
        <>
          <Grid container>
            <Grid item xs={12} className="justify-center">
              <div className="flex w-full justify-start items-center">
                <p className="text-2xl font-semibold py-2 text-[#4590FF]">
                  Nhập phân loại chuyên môn của bộ phận
                </p>
              </div>
              <div style={{ height: "79.9vh" }}>{memoizedDataGrid}</div>
            </Grid>
          </Grid>
          <EditModal
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            infoDetail={infoDetail}
          />
          <AddModal
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
          />
          <DeleteModal
            openDeleteModal={openDeleteModal}
            infoDetail={infoDetail}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default TablePhanLoaiChuyenMon;
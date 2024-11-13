import DocumentIcon from '../assets/icons/Document.svg'

const ketxuatData = {
  qlns: [
    { text: "Sổ danh sách cán bộ", icon: DocumentIcon, filter: "sodanhsachcanbo" },
    { text: "Sổ các biến động cán bộ của doanh nghiệp", icon: DocumentIcon, filter: "socacbiendongcuacanbocuadoanhnghiep" },
    { text: "Thống kê số lượng trong guồng máy doanh nghiệp", icon: DocumentIcon, filter: "thongkesoluongtrongguongmaydoanhnghiep" },
    { text: "Thống kê số lượng cán bộ trong doanh nghiệp", icon: DocumentIcon, filter: "thongkesoluongcanbotrongdoanhnghiep" },
    { text: "Sổ mô tả công việc doanh nghiệp", icon: DocumentIcon, filter: "somotacongviecdoanhnghiep" },
    { text: "Sổ giao công việc", icon: DocumentIcon, filter: "sogiaocongviec" },
    { text: "Sổ vị trí việc làm", icon: DocumentIcon, filter: "sovitrivieclam" },
    { text: "Sổ vị trí việc làm quy hoạch", icon: DocumentIcon, filter: "sovitrivieclamquyhoach" },
    { text: "Sổ cán bộ quy hoạch của doanh nghiệp", icon: DocumentIcon, filter: "socanboquyhoachcuadoanhnghiep" }
  ],
  qlgm: [
    {
      title: "Sổ Thị Trường",
      items: [
        { text: "Sổ sản phẩm", icon: DocumentIcon, filter: "sosanpham"},
        { text: "Sổ sản phẩm theo không gian", icon: DocumentIcon, filter: "sosanphamtheokhonggian"},
        { text: "Sổ địa danh", icon: DocumentIcon, filter: "sodiadanh"},
        { text: "Sổ địa bàn", icon: DocumentIcon, filter: "sodiaban"},
        { text: "Sổ nhóm khách hàng", icon: DocumentIcon, filter: "sonhomkhachhang"},
        { text: "Sổ chức năng khách hàng", icon: DocumentIcon, filter: "sochucnangkhachhang"},
      ]
    },
    {
      title: "Sổ Guồng Máy",
      items: [
        { text: "Sổ các bộ phận", icon: DocumentIcon, filter: "socacbophan"},
        { text: "Đơn vị doanh nghiệp (Guồng máy)", icon: DocumentIcon, filter: "socautrucguongmay"},
        { text: "Sổ nhiệm vụ giao", icon: DocumentIcon, filter: "sonhiemvu"},
        { text: "Sổ biến động Bộ phận - Bộ phận mới", icon: DocumentIcon, filter: "sobiendongbophanmoi"},
        { text: "Sổ biến động Bộ phận - Thay đổi bộ phận", icon: DocumentIcon, filter: "sobiendongthaydoibophan"},
        { text: "Sổ biến động Guồng máy - Guồng máy mới", icon: DocumentIcon, filter: "sobiendongguongmaymoi"},
        { text: "Sổ biến động nhiệm vụ", icon: DocumentIcon, filter: "sobiendongnhiemvu"},
      ]
    },
    {
      title: "Sổ Dự Báo",
      items: [
        { text: "Sổ dự báo khách hàng và doanh số theo địa danh", icon: DocumentIcon, filter: "dubaokhdsdiadanh"},
        { text: "Dự báo khách hàng và doanh số theo SPDV", icon: DocumentIcon, filter: "dubaokhdsspdv"},
        { text: "Dự báo thu các bộ phận***", icon: DocumentIcon, filter: "dubaothucacbophan"},
      ]
    },
    {
      title: "Tổng Hợp Thị Trường",
      items: [
        { text: "Tổng hợp thị trường của doanh nghiệp", icon: DocumentIcon, filter: "tonghopthitruongcuadoanhnghiep"},
      ]
    },
    {
      title: "Tổng Hợp Guồng Máy",
      items: [
        { text: "Tổng hợp bộ phận, đơn vị doanh nghiệp", icon: DocumentIcon, filter: "tonghopbophandonvidoanhnghiep"},
        { text: "Tổng hợp cán bộ điều hành và số cán bộ***", icon: DocumentIcon, filter: "tonghopcanbodieuhanhvasocanbo"},
        { text: "Tổng hợp các biến động guồng máy doanh nghiệp***", icon: DocumentIcon, filter: "tonghopcacbiendongguongmaydoanhnghiep"},
      ]
    },
    {
      title: "Tổng Hợp Dự Báo",
      items: [
        { text: "Tổng hợp dự báo khách hàng và doanh số (theo đơn vị)***", icon: DocumentIcon, filter: "tonghopdubaokhachhangvadoanhsotdv"},
        { text: "Tổng hợp dự báo thu các đơn vị (theo đơn vị)***", icon: DocumentIcon, filter: "tonghopdubaothucacdonvitdv"},
      ]
    },
  ],
  thtc: [
    {
      title: "Sổ Tài Chính",
      items: [
        { text: "Sổ vụ việc (Sổ chứng từ ghi sổ)", icon: DocumentIcon, filter: "sovuviec"},
        { text: "Sổ chứng từ kế toán", icon: DocumentIcon, filter: "sochungtuketoan"},
        { text: "Sổ cái", icon: DocumentIcon, filter: "socai"},
        { text: "Sổ cân đối nguồn", icon: DocumentIcon, filter: "socandoinguon"},
        { text: "Sổ cái chi tiết đơn vị", icon: DocumentIcon, filter: "socaichitietdonvi"},
        { text: "Sổ chứng từ chi tiết cán bộ", icon: DocumentIcon, filter: "sochungtuchitietcanbo"},
      ]
    },
    {
      title: "Tổng Hợp Báo Cáo",
      items: [
        { text: "Bảng cân đối nguồn", icon: DocumentIcon, filter: "bangcandoinguon"},
        { text: "Báo cáo lưu chuyển tiền tệ", icon: DocumentIcon, filter: "baocaoluuchuyentiente"},
        { text: "Báo cáo kết quả hoạt động kinh doanh", icon: DocumentIcon, filter: "baocaoketquahoatdongkinhdoanh"},
      ]
    },
  ],
};

export default ketxuatData
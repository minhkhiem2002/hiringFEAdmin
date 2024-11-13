import SearchIcon from '../assets/icons/Window Search.svg'

const tracuuData = {
  traCuu: [
    {
      title: "Tra cứu thị trường",
      items: [
        { text: "Nhóm sản phẩm dịch vụ", icon: SearchIcon, filter: "nhomsanphamdichvu" },
        { text: "Sản phẩm theo không gian", icon: SearchIcon, filter: "sanphamtheokhonggian" },
        { text: "Địa bàn - Địa danh", icon: SearchIcon, filter: "diabandiadanh" },
        { text: "Nhóm khách hàng", icon: SearchIcon, filter: "nhomkhachhang" },
        { text: "Chức năng khách hàng", icon: SearchIcon, filter: "chucnangkhachhang" },
      ]
    },
    {
      title: "Tra cứu guồng máy",
      items: [
        { text: "Bộ phận doanh nghiệp", icon: SearchIcon, filter: "bophandoanhnghiep" },
        { text: "Người điều hành các bộ phận", icon: SearchIcon, filter: "nguoidieuhanhcacbophan" },
        {
          title: "Thị trường giao cho guồng máy",
          icon: SearchIcon,
          items: [
            { text: "Địa bàn giao cho bộ phận", icon: SearchIcon, filter: "diabancuabophan" },
            { text: "Sản phẩm dịch vụ giao cho bộ phận", icon: SearchIcon, filter: "sanphamcuabophan" },
            { text: "Nhóm khách hàng giao cho bộ phận", icon: SearchIcon, filter: "khachhangcuabophan" }
          ]
        },
        { text: "Đơn vị doanh nghiệp", icon: SearchIcon, filter: "donvidoanhnghiep" },
      ]
    },
    {
      title: "Tra cứu dự báo",
      items: [
        { text: "Khách hàng và doanh số theo địa danh, đơn vị và PLKH", icon: SearchIcon, filter: "khachhangdoanhsodiadanhdonviplkh" },
        { text: "Khách hàng và doanh số theo SPDV, đơn vị và PLKH", icon: SearchIcon, filter: "khachhangdoanhsospdvdonviplkh" },
        { text: "Thu các bộ phận", icon: SearchIcon, filter: "thucacbophan" },
      ]
    },
  ]
};

export default tracuuData;

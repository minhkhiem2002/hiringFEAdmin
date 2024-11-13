import SearchIcon from '../assets/icons/Window Search.svg'

const tracuuData = {
  traCuu: [
    {
      title: "Thông tin cán bộ",
      items: [
        { text: "Danh sách cán bộ", icon: SearchIcon, filter: "danhsachcanbo" },
        { text: "Thông tin người thân", icon: SearchIcon, filter: "thongtinnguoithan" },
        { text: "Nơi ở cán bộ", icon: SearchIcon, filter: "noiocanbo" },
        { text: "Quan hệ xã hội", icon: SearchIcon, filter: "quanhexahoi" },
        { text: "Sức khỏe", icon: SearchIcon, filter: "suckhoe" }
      ]
    },
    {
      title: "Thông tin tài liệu",
      items: [
        { text: "Tài liệu cán bộ", icon: SearchIcon, filter: "tailieucanbo" },
        { text: "Tài liệu doanh nghiệp", icon: SearchIcon, filter: "tailieudoanhnghiep" }
      ]
    },
    {
      title: "Vị trí việc làm - quy hoạch",
      items: [
        { text: "Khối lượng giao việc", icon: SearchIcon, filter: "khoiluonggiaoviec" },
        { text: "Vị trí việc làm - mô tả", icon: SearchIcon, filter: "vitrivieclammota" },
        { text: "Quy hoạch cán bộ", icon: SearchIcon, filter: "quyhoachcanbo" }
      ]
    }
  ]
};

export default tracuuData;

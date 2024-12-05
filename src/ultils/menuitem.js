import ChangeIcon from '../assets/icons/Collaborator Male.svg';
import FolderIcon from '../assets/icons/searchfile 1.svg'
import SearchIcon from '../assets/icons/Window Search.svg'
import ChangeUserIcon from '../assets/icons/Change User.svg'
import ClipBoardIcon from '../assets/icons/Clipboard List.svg'
import PrintIcon from '../assets/icons/Print.svg'
import PositionIcon from '../assets/icons/Lawyer.svg'
import SettingIcon from '../assets/icons/Gears.svg'
import ListIcon from '../assets/icons/Sorting.svg'
import InfoIcon from '../assets/icons/Name Tag.svg'
import BranchIcon from '../assets/icons/Code Fork.svg'
import SecurityFieldIcon from '../assets/icons/Security Shield.svg'
import UserIcon from '../assets/icons/Male User.svg'
import RequestServiceIcon from '../assets/icons/Request Service.svg'
import DashboardIcon from '../assets/icons/Dashboard Layout.svg'
import InfoPopupIcon from '../assets/icons/Info Popup.svg'
import Window11Icon from '../assets/icons/Windows 11.svg'
import CashIcon from '../assets/icons/Cash App.svg'
import CustomerInsightIcon from '../assets/icons/CustomerInsightIcon.svg'
import HierachyIcon from '../assets/icons/Hierarchy.svg'
import StallIcon from '../assets/icons/Stall.svg'
import EstimateIcon from '../assets/icons/Estimated Growth.svg'
import FinanceIcon from '../assets/icons/Financial Dynamic Presentation.svg'
import ManagerIcon from '../assets/icons/Manager.svg'
import TreeIcon from '../assets/icons/Tree Structure.svg'
import DocumentIcon from '../assets/icons/Document.svg'
import StaticIcon from '../assets/icons/Static Views.svg'
import BookIcon from '../assets/icons/Book.svg'
import BuyIcon from '../assets/icons/Buy For Change.svg'
import CircleIcon from '../assets/icons/Circle Chart.svg'
import MediumIcon from '../assets/icons/Medium Priority.svg'
import NetworkIcon from '../assets/icons/Network.svg'
import ProductIcon from '../assets/icons/Product.svg'
import MapIcon from '../assets/icons/Map Marker.svg'
import ThreePeopleIcon from '../assets/icons/Three People.svg'

const menuData = (role) => {
  const dataMenu = {
    qlgm: [
    ],
  }
  if (role && role =='Admin') {
    dataMenu.qlgm.push(
      { text: "Quản lý khách hàng", icon: ThreePeopleIcon, path: "managecustomer" }
    )
    dataMenu.qlgm.push(
      { text: "Quản lý chủ sân", icon: ThreePeopleIcon, path: "manageowner" }
    )
    dataMenu.qlgm.push(
      { text: "Quản lý sân", icon: ThreePeopleIcon, path: "managefields" }
    )
    dataMenu.qlgm.push(
      { text: "Quản lý voucher", icon: ThreePeopleIcon, path: "managevouchers" }
    )
    dataMenu.qlgm.push(
      { text: "Quản lý thiết bị", icon: ThreePeopleIcon, path: "product" }
    )
  }
  if (role && role =='Owner') {
    dataMenu.qlgm.push(
      { text: "Quản lý sân", icon: ThreePeopleIcon, path: "managefields" }
    )
    dataMenu.qlgm.push(
      { text: "Quản lý voucher", icon: ThreePeopleIcon, path: "managevouchers" }
    )
    dataMenu.qlgm.push(
      { text: "Quản lý thiết bị", icon: ThreePeopleIcon, path: "product" }
    )
  }
  return dataMenu['qlgm']
};

export default menuData;

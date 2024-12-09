import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_ORDERS_REQUEST,
    getOrdersSuccess,
    getOrdersFailure,
    UPDATE_ORDER_STATUS_REQUEST,
    updateOrderStatusSuccess,
    updateOrderStatusFailure,
    REJECT_ORDER_REQUEST,
    rejectOrderSuccess,
    rejectOrderFailure
} from "../../actions/Admin/orderActions";
import { sportUrl } from "../../const_api";
import { toast } from "react-toastify";

// API calls
function getOrdersApi(params) {
    return axios.get('https://sportappdemo.azurewebsites.net/api/AdminDashboard/GetOrders',
        {params});
}

function updateOrderStatusApi(orderId) {
    return axios.patch('https://sportappdemo.azurewebsites.net/api/Order/UpdateOrderStatus', {
        orderId,
    });
}

function rejectOrderApi(data) {
    return axios.patch('https://sportappdemo.azurewebsites.net/api/Order/RejectOrder', data );
}

// Worker Sagas
function* getOrders(action) {
    try {
        const response = yield call(getOrdersApi, action.payload);

        if (response) {
            yield put(getOrdersSuccess(response.data)); 
        }
    } catch (error) {
        console.error(error);
        toast.error("Lấy danh sách orders thất bại!", {
            autoClose: 1000,
        });
        yield put(getOrdersFailure(error)); 
    }
}

function* updateOrderStatus(action) {
    try {
        const { orderId } = action.payload;
        const response = yield call(updateOrderStatusApi, orderId);

        if (response) {
            yield put(updateOrderStatusSuccess());
            toast.success("Cập nhật trạng thái đơn hàng thành công!", {
                autoClose: 1000,
            });
        }
    } catch (error) {
        console.error(error);
        toast.error("Cập nhật trạng thái đơn hàng thất bại!", {
            autoClose: 1000,
        });
        yield put(updateOrderStatusFailure(error)); 
    }
}

function* rejectOrder(action) {
    try {
        const { data } = action.payload;
        const response = yield call(rejectOrderApi, data);

        if (response) {
            yield put(rejectOrderSuccess());
            toast.success("Đơn hàng đã bị từ chối!", {
                autoClose: 1000,
            });
        }
    } catch (error) {
        console.error(error);
        toast.error("Từ chối đơn hàng thất bại!", {
            autoClose: 1000,
        });
        yield put(rejectOrderFailure(error)); 
    }
}

// Watcher Sagas
function* orderAdminSagas() {
    yield takeLatest(GET_ORDERS_REQUEST, getOrders);
    yield takeLatest(UPDATE_ORDER_STATUS_REQUEST, updateOrderStatus);
    yield takeLatest(REJECT_ORDER_REQUEST, rejectOrder);
}

export default orderAdminSagas;

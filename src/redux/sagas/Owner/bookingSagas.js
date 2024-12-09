import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_BOOKING_BY_OWNER_REQUEST,
    PATCH_STATUS_BOOKING_BY_OWNER_REQUEST,
    REJECT_BOOKING_BY_OWNER_REQUEST,
    getBookingByOwnerSuccess,
    getBookingByOwnerFailure,
    patchStatusBookingByOwnerSuccess,
    patchStatusBookingByOwnerFailure,
    rejectBookingByOwnerSuccess,
    rejectBookingByOwnerFailure,
} from "../../actions/Owner/bookingActions";
import { toast } from "react-toastify";

function getBookingByOwnerApi(params) {
    return axios.get(
        "https://sportappdemo.azurewebsites.net/api/OwnerDashboard/GetBookingByOwner",
        params 
    );
}

function patchStatusBookingByOwnerApi(bookingId) {
    return axios.patch(
        `https://sportappdemo.azurewebsites.net/api/Booking/UpdateBookingStatus`,
        { bookingId }
    );
}

function rejectBookingByOwnerApi(data) {
    return axios.patch(
        `https://sportappdemo.azurewebsites.net/api/Booking/RejectBooking`,
        data
    );
}

function* getBookingByOwner(action) {
    try {
        const params = action.payload;
        const response = yield call(getBookingByOwnerApi, params);

        if (response.status === 200) {
            yield put(getBookingByOwnerSuccess(response.data));
        }
    } catch (error) {
        console.error(error);
        toast.error("Lấy danh sách booking thất bại!", {
            autoClose: 1000,
        });
        yield put(getBookingByOwnerFailure());
    }
}

function* patchStatusBookingByOwner(action) {
    try {
        const bookingId = action.payload.bookingId;
        const response = yield call(patchStatusBookingByOwnerApi, bookingId);

        if (response.status === 200) {
            toast.success("Cập nhật trạng thái booking thành công!", {
                autoClose: 1000,
            });
            yield put(patchStatusBookingByOwnerSuccess(response.data));
        }
    } catch (error) {
        console.error(error);
        toast.error("Cập nhật trạng thái booking thất bại!", {
            autoClose: 1000,
        });
        yield put(patchStatusBookingByOwnerFailure());
    }
}

function* rejectBookingByOwner(action) {
    try {
        const data = action.payload.data;
        const response = yield call(rejectBookingByOwnerApi, data);

        if (response.status === 200) {
            toast.success("Từ chối booking thành công!", {
                autoClose: 1000,
            });
            yield put(rejectBookingByOwnerSuccess(response.data));
        }
    } catch (error) {
        console.error(error);
        toast.error("Từ chối booking thất bại!", {
            autoClose: 1000,
        });
        yield put(rejectBookingByOwnerFailure());
    }
}

// Watcher Saga
function* bookingByOwnerSagas() {
    yield takeLatest(GET_BOOKING_BY_OWNER_REQUEST, getBookingByOwner);
    yield takeLatest(PATCH_STATUS_BOOKING_BY_OWNER_REQUEST, patchStatusBookingByOwner);
    yield takeLatest(REJECT_BOOKING_BY_OWNER_REQUEST, rejectBookingByOwner);
}

export default bookingByOwnerSagas;

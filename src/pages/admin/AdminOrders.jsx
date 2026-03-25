import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import OrderModal from "../../components/OrderModal";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { useNavigate } from "react-router";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOrders = async (page = 1) => {
    try {
      const ordersRes = await axios.get(
        `${BASE_URL}/api/${API_PATH}/admin/orders?page=${page}`,
      );

      setOrders(ordersRes.data.orders);
      setPagination(ordersRes.data.pagination);
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  useEffect(() => {
    // 從 cookie 取出 token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("crystalToken="))
      ?.split("=")[1];

    if (token) {
      axios.defaults.headers.common.Authorization = token;
      getOrders();
    } else {
      // 沒 token → 導回登入
      navigate("/admin/adminlogin");
    }
  }, []);

  //日期轉換
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000)
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "/");
  };

  //刪除單一訂單
  const delOrder = async (id) => {
    if (!window.confirm("確定要刪除這筆訂單嗎？")) return;

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/${API_PATH}/admin/order/${id}`,
      );
      dispatch(createAsyncMessage(response.data));
      getOrders();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  const handleShow = async (orderId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/${API_PATH}/order/${orderId}`,
      );

      setOrderDetail(res.data.order); // 存資料
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container vh-100" style={{ paddingTop: "100px" }}>
        <h2 className="text-center fw-bold mb-3">訂單列表</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">訂單ID</th>
              <th scope="col">客戶姓名</th>
              <th scope="col">信箱</th>
              <th scope="col">金額</th>
              <th scope="col">是否付款</th>
              <th scope="col">建立時間</th>
              <th scope="col">操作</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <th>{order.id}</th>
                <td>{order.user.name}</td>
                <td>{order.user.email}</td>
                <td>NT${order.total}</td>
                <td>
                  <span
                    className={`badge ${order.is_paid ? "bg-success" : "bg-danger"}`}
                  >
                    {order.is_paid ? "已付款" : "未付款"}
                  </span>
                </td>
                <td>{formatDate(order.create_at)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleShow(order.id)}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => delOrder(order.id)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} onChangePage={getOrders} />
      </div>
      <OrderModal
        showModal={showModal}
        orderDetail={orderDetail}
        handleClose={handleClose}
      />
    </>
  );
}

export default AdminOrders;

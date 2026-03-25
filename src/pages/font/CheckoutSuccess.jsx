import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CheckoutSuccess() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/${API_PATH}/order/${orderId}`,
        );
        setOrderData(res.data.order);
      } catch (err) {
        alert("訂單取得失敗，請稍後再試");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [orderId]);

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (error || !orderData)
    return <p className="text-center py-5">找不到訂單資料</p>;

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow-lg  p-4 text-center">
        <div className="mb-4">
          <h1 className="text-success fw-bold">🎉 訂單完成！</h1>
          <p className="lead text-dark">感謝您的購買，訂單已成功送出。</p>
        </div>

        <div className="text-start mb-4">
          <h4 className="fw-bold border-bottom pb-2">訂單資訊</h4>
          <p className="mb-1">
            <strong>姓名：</strong>
            {orderData.user.name}
          </p>
          <p className="mb-1">
            <strong>Email：</strong>
            {orderData.user.email}
          </p>
          <p className="mb-1">
            <strong>電話：</strong>
            {orderData.user.tel}
          </p>
          <p className="mb-1">
            <strong>取貨門市：</strong>
            {orderData.user.address}
          </p>
        </div>

        <NavLink to="/" className="btn btn-primary btn-lg mt-3">
          回到首頁
        </NavLink>
      </div>
    </div>
  );
}
export default CheckoutSuccess;

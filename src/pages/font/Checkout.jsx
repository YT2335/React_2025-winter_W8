import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { createAsyncMessage } from "../../slice/messageSlice";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ carts: [], final_total: 0 });
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  //送出訂單
  const onSubmit = async (formData) => {
    try {
      const data = {
        user: {
          name: formData.customerName,
          email: formData.customerMail,
          tel: formData.customerTel,
          address: formData.store,
        },
        message: formData.message,
      };

      const response = await axios.post(`${BASE_URL}/api/${API_PATH}/order`, {
        data,
      });

      const orderId = response.data.orderId;

      dispatch(
        createAsyncMessage({
          success: true,
          message: "訂單送出成功！",
        }),
      );

      // 清空表單
      reset();

      navigate(`/checkoutsuccess/${orderId}`);

      // 重新抓購物車
      const getCartRes = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCart(getCartRes.data.data);
    } catch (error) {
      dispatch(
        createAsyncMessage({
          success: false,
          message: error.response?.data?.message || "送出失敗，請稍後再試",
        }),
      );
    }
  };

  // 取得購物車資料
  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCart(res.data.data);
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="banner">
        <div className="card bg-dark text-white">
          <img
            src="https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?q=80&w=1200&h=200&auto=format&fit=crop"
            className="img-fluid opacity-25"
            alt="banner"
          />

          <div className="card-img-overlay container d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-6 display-md-4 fw-bold">Checkout</h1>
          </div>
        </div>
      </div>
      {/* 購買資訊 */}
      <div className="container py-5">
        <h2 className="fw-bold text-primary mb-4">購物清單</h2>
        <table className="table table-hover">
          <thead>
            <tr className="text-center">
              <th>商品圖片</th>
              <th>商品名稱</th>
              <th>數量</th>
              <th>單價</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {cart?.carts.length > 0 ? (
              cart.carts.map((item) => (
                <tr key={item.id} className="text-center align-middle">
                  <td style={{ width: "120px" }}>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="img-fluid"
                    />
                  </td>
                  <td>{item.product.title}</td>
                  <td>{item.qty}</td>
                  <td>NT {item.product.price.toLocaleString()}</td>
                  <td>NT {(item.qty * item.product.price).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  購物車沒有商品
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-end fw-bold">
                總計
              </td>
              <td className="fw-bold">
                NT {cart?.final_total?.toLocaleString() || 0}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* 表單輸入 */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <form className="col-6" onSubmit={handleSubmit(onSubmit)}>
            {/* 收件資訊 */}
            <h2 className="fw-bold text-primary">收件資訊</h2>
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">
                姓名
              </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="Ex.王小明"
                {...register("customerName", {
                  required: "請輸入姓名",
                  minLength: {
                    value: 2,
                    message: "姓名至少 2 個字",
                  },
                })}
              />
              {errors.customerName && (
                <p className="text-danger">{errors.customerName.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="customerTel" className="form-label">
                電話
              </label>
              <input
                type="tel"
                className="form-control"
                id="customerTel"
                placeholder="Ex.0912345678"
                {...register("customerTel", {
                  required: "請輸入電話",
                  minLength: { value: 8, message: "電話至少 8 碼" },
                  pattern: {
                    value: /^\d+$/,
                    message: "電話僅能輸入數字",
                  },
                })}
              />
              {errors.customerTel && (
                <p className="text-danger">{errors.customerTel.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="customerMail" className="form-label">
                信箱
              </label>
              <input
                type="email"
                className="form-control"
                id="customerMail"
                placeholder="name@example.com"
                {...register("customerMail", {
                  required: "請輸入 Email",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Email 格式不正確",
                  },
                })}
              />
              {errors.customerMail && (
                <p className="text-danger">{errors.customerMail.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                備註
              </label>
              <textarea
                id="message"
                className="form-control"
                cols="30"
                rows="10"
                {...register("message")}
              ></textarea>
            </div>

            {/* 配送資訊 */}
            <h2 className="fw-bold text-primary">配送與付款資訊</h2>
            <label htmlFor="delivery" className="form-label">
              配送超商
            </label>
            <select
              className="form-select mb-3"
              aria-label="Default select example"
              id="delivery"
              {...register("delivery", { required: "請選擇配送超商" })}
            >
              <option value="">選擇配送超商</option>
              <option value="711">7-11</option>
              <option value="family">全家</option>
            </select>

            {errors.delivery && (
              <p className="text-danger">{errors.delivery.message}</p>
            )}

            <div className="mb-3">
              <label htmlFor="store" className="form-label">
                取貨門市
              </label>
              <input
                type="text"
                className="form-control"
                id="store"
                placeholder="XX門市"
                {...register("store", {
                  required: "請輸入完整門市名稱（至少 4 字）",
                  minLength: {
                    value: 4,
                    message: "門市至少 4 個字",
                  },
                })}
              />
              {errors.store && (
                <p className="text-danger">{errors.store.message}</p>
              )}
            </div>
            <label htmlFor="payment" className="form-label">
              付款方式
            </label>
            <select
              className="form-select mb-3"
              id="payment"
              {...register("payment", { required: "請選擇付款方式" })}
            >
              <option value="">選擇付款方式</option>
              <option value="transfer">匯款</option>
              <option value="cod">貨到付款</option>
            </select>

            {errors.payment && (
              <p className="text-danger">{errors.payment.message}</p>
            )}

            {/* 按鈕 */}
            <div className="text-end">
              <NavLink to="/cart" className="btn btn-outline-primary me-2">
                返回
              </NavLink>
              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={isSubmitting}
              >
                確認
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;

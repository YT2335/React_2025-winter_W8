import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { createAsyncMessage } from "../../slice/messageSlice";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
        setCart(response.data.data);
      } catch (error) {
        dispatch(createAsyncMessage(error.response.data));
      }
    };
    getCart();
  }, []);

  //更新購物車
  const updateCart = async (cartId, product_id, qty = 1) => {
    try {
      const data = {
        product_id: product_id,
        qty,
      };
      await axios.put(`${BASE_URL}/api/${API_PATH}/cart/${cartId}`, { data });

      const getCart = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
          setCart(response.data.data);
        } catch (error) {
          dispatch(createAsyncMessage(error.response.data));
        }
      };
      getCart();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  //刪除購物車單一商品
  const delSingleCart = async (cartId) => {
    try {
      await axios.delete(`${BASE_URL}/api/${API_PATH}/cart/${cartId}`);

      const getCart = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
          setCart(response.data.data);
        } catch (error) {
          dispatch(createAsyncMessage(error.response.data));
        }
      };
      getCart();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  return (
    <>
      <div className="banner">
        <div className="card bg-dark text-white">
          <img
            src="https://images.unsplash.com/photo-1528399783831-8318d62d10e5?q=80&w=1200&h=200&auto=format&fit=crop"
            className="img-fluid opacity-25"
            alt="banner"
          />

          <div className="card-img-overlay container d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-6 display-md-4 fw-bold">Cart</h1>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {!cart?.carts || cart.carts.length === 0 ? (
          <div className="text-center">
            <p>購物車目前沒有商品，探索我們的精選商品，把喜愛帶回家吧！</p>
            <NavLink to="/products" className="btn btn-primary px-4">
              立即探索
            </NavLink>
          </div>
        ) : (
          <div className="container py-5">
            <table className="table table-hover">
              <thead>
                <tr className="text-center">
                  <th scope="col">商品圖片</th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">數量</th>
                  <th scope="col">單價</th>
                  <th scope="col">刪除</th>
                </tr>
              </thead>
              <tbody>
                {cart?.carts.map((cartItem) => (
                  <tr className="align-middle text-center" key={cartItem.id}>
                    <td className="fixed" style={{ width: "120px" }}>
                      <img
                        src={cartItem.product.imageUrl}
                        alt={cartItem.product.title}
                        className="img-fluid"
                      />
                    </td>
                    <td>{cartItem.product.title}</td>
                    <td className="fixed" style={{ width: "150px" }}>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            const newQty = cartItem.qty - 1;
                            if (newQty <= 0) {
                              delSingleCart(cartItem.id);
                            } else {
                              updateCart(
                                cartItem.id,
                                cartItem.product_id,
                                newQty,
                              );
                            }
                          }}
                        >
                          −
                        </button>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center quantity-input"
                          value={cartItem.qty}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value <= 0) {
                              delSingleCart(cartItem.id);
                            } else {
                              updateCart(
                                cartItem.id,
                                cartItem.product_id,
                                value,
                              );
                            }
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            updateCart(
                              cartItem.id,
                              cartItem.product_id,
                              cartItem.qty + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>NT {cartItem.product.price.toLocaleString()}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => delSingleCart(cartItem.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-end" colSpan="5">
                    總計 NT$ {(cart?.final_total || 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="text-end">
              <NavLink to="/products" className="btn btn-outline-primary me-2">
                繼續選購
              </NavLink>
              <NavLink to="/checkout" className="btn btn-outline-success">
                下一步
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;

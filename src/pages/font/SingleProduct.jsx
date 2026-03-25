import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { createAsyncMessage } from "../../slice/messageSlice";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleProduct, setSingleProduct] = useState({});
  //主圖狀態
  const [mainImage, setMainImage] = useState(null);
  // 預設數量 1
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${API_PATH}/product/${id}`,
      );
      setSingleProduct(response.data.product);
    } catch (error) {
      console.log(error.response);
    }
  };

  //加入購物車
  const addCart = async (id, qty) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      const response = await axios.post(`${BASE_URL}/api/${API_PATH}/cart`, {
        data,
      });
      dispatch(createAsyncMessage(response.data));
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  useEffect(() => {
    if (singleProduct?.imageUrl) {
      setMainImage(singleProduct.imageUrl);
    }
  }, [setSingleProduct]);

  //立即購買
  const handleBuyNow = async () => {
    try {
      // 先加入購物車
      const data = {
        product_id: singleProduct.id,
        qty: qty,
      };
      await axios.post(`${BASE_URL}/api/${API_PATH}/cart`, { data });

      // 導向結帳頁
      navigate("/checkout");
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
      // alert("加入購物車失敗，請稍後再試");
    }
  };

  if (!singleProduct) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="bg-light border-top border-bottom">
      <div className="container py-5">
        <div className="row g-5">
          {/* 左：商品圖片 */}
          <div className="col-md-6">
            {/* 主圖 */}
            <div className="mb-3">
              <img
                src={
                  mainImage ||
                  singleProduct.imageUrl ||
                  `${import.meta.env.BASE_URL}LOGO.jpg`
                }
                alt={singleProduct.title || "商品圖片"}
                className="img-fluid rounded shadow"
              />
            </div>

            {/* 縮圖列 */}
            <div className="d-flex gap-2">
              {[singleProduct.imageUrl, ...(singleProduct.imagesUrl || [])]
                .filter(Boolean)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="img-thumbnail"
                    style={{
                      width: "80px",
                      cursor: "pointer",
                      border:
                        mainImage === img
                          ? "2px solid var(--bs-primary)"
                          : "1px solid #ddd",
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
            </div>
          </div>

          {/* 右：商品資訊 */}
          <div className="col-md-6">
            <h1 className="fw-bold mb-3 text-primary">{singleProduct.title}</h1>

            <div className="mb-3">
              <span className="text-danger fs-4 fw-bold me-2">
                NT${singleProduct.price}
              </span>
              <del className="text-muted">NT${singleProduct.origin_price}</del>
            </div>

            <p className="text-secondary" style={{ whiteSpace: "pre-line" }}>
              {singleProduct.description}
            </p>

            {/* 數量 */}
            <div className="d-flex align-items-center mb-4">
              <label className="me-2">數量：</label>
              <input
                type="number"
                className="form-control w-25"
                min="1"
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(Number(e.target.value) || 1, 1))
                }
              />
            </div>

            {/* 按鈕 */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => addCart(singleProduct.id, qty)}
              >
                加入購物車
              </button>
              <button className="btn btn-primary" onClick={handleBuyNow}>
                立即購買
              </button>
            </div>

            {/* 摺疊內容 */}
            <div className="accordion my-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button fw-bold text-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    礦石介紹
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    className="accordion-body"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {singleProduct.content}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed fw-bold text-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    注意事項
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    className="accordion-body"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {singleProduct.attention}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleProduct;

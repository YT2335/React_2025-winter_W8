import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slice/messageSlice";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductModal({
  closeModal,
  templateProduct,
  setTemplateProduct,
  modalType,
  getProducts,
}) {
  const dispatch = useDispatch();

  const handleModalInputChange = (event) => {
    const { value, name, checked, type } = event.target;
    setTemplateProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 更換圖片
  const handleModalImageChange = (index, value) => {
    setTemplateProduct((prev) => {
      const newImage = [...prev.imagesUrl];
      newImage[index] = value;
      return {
        ...prev,
        imagesUrl: newImage,
      };
    });
  };

  // 新增圖片
  const handleAddImage = () => {
    setTemplateProduct((prev) => {
      const newImage = [...prev.imagesUrl];
      newImage.push("");
      return {
        ...prev,
        imagesUrl: newImage,
      };
    });
  };

  // 移除圖片
  const handleRemoveImage = () => {
    setTemplateProduct((prev) => {
      const newImage = [...prev.imagesUrl];
      newImage.pop();
      return {
        ...prev,
        imagesUrl: newImage,
      };
    });
  };

  //更新商品
  const updateProduct = async (id) => {
    let url = `${BASE_URL}/api/${API_PATH}/admin/product`;
    let method = "post";

    if (modalType === "edit") {
      url = `${BASE_URL}/api/${API_PATH}/admin/product/${id}`;
      method = "put";
    }

    const productData = {
      data: {
        ...templateProduct,
        origin_price: Number(templateProduct.origin_price),
        price: Number(templateProduct.price),
        is_enabled: templateProduct.is_enabled ? 1 : 0,
        imagesUrl: [...templateProduct.imagesUrl.filter((url) => url !== "")],
      },
    };

    try {
      const response = await axios[method](url, productData);
      dispatch(createAsyncMessage(response.data));
      getProducts();
      closeModal();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  //刪除商品
  const delProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/${API_PATH}/admin/product/${id}`,
      );
      dispatch(createAsyncMessage(response.data));
      getProducts();
      closeModal();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content border-0">
          <div
            className={`modal-header bg-${modalType === "delete" ? "danger" : "primary"} text-white`}
          >
            <h5 id="productModalLabel" className="modal-title">
              <span>
                {modalType === "delete"
                  ? "刪除"
                  : modalType === "edit"
                    ? "編輯"
                    : "新增"}
                產品
              </span>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {modalType === "delete" ? (
              <p className="fs-4">
                確定要刪除
                <span className="text-danger">{templateProduct.title}</span>
                嗎?
              </p>
            ) : (
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        輸入圖片網址
                      </label>
                      <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                        value={templateProduct.imageUrl}
                        onChange={(e) => handleModalInputChange(e)}
                      />
                    </div>
                    {templateProduct.imageUrl && (
                      <img
                        className="img-fluid"
                        src={templateProduct.imageUrl}
                        alt="主圖"
                      />
                    )}
                  </div>
                  <div>
                    {templateProduct.imagesUrl.map((url, index) => (
                      <div key={index}>
                        <label htmlFor="imageUrl" className="form-label">
                          輸入圖片網址
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`圖片網址${index + 1}`}
                          value={url}
                          onChange={(event) =>
                            handleModalImageChange(index, event.target.value)
                          }
                        />
                        {url && (
                          <img
                            className="img-fluid"
                            src={url}
                            alt={`副圖${index + 1}`}
                          />
                        )}
                      </div>
                    ))}

                    <button
                      className="btn btn-outline-primary btn-sm d-block w-100"
                      onClick={() => handleAddImage()}
                    >
                      新增圖片
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-danger btn-sm d-block w-100"
                      onClick={() => handleRemoveImage()}
                    >
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      標題
                    </label>
                    <input
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                      value={templateProduct.title}
                      onChange={(e) => handleModalInputChange(e)}
                    />
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label">
                        分類
                      </label>
                      <input
                        name="category"
                        id="category"
                        type="text"
                        className="form-control"
                        placeholder="請輸入分類"
                        value={templateProduct.category}
                        onChange={(e) => handleModalInputChange(e)}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-check-label" htmlFor="collection">
                        系列
                      </label>
                      <select
                        id="collection"
                        name="collection"
                        className="form-select"
                        aria-label="Default select example"
                        value={templateProduct.collection}
                        onChange={(e) => handleModalInputChange(e)}
                      >
                        <option value="">請選擇</option>
                        <option value="bossdesign">老闆設計款</option>
                        <option value="customize">客製化</option>
                        <option value="numerology">生命靈數</option>
                        <option value="starsign">12星座</option>
                        <option value="other">其他</option>
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="unit" className="form-label">
                        單位
                      </label>
                      <input
                        name="unit"
                        id="unit"
                        type="text"
                        className="form-control"
                        placeholder="請輸入單位"
                        value={templateProduct.unit}
                        onChange={(e) => handleModalInputChange(e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="origin_price" className="form-label">
                        原價
                      </label>
                      <input
                        name="origin_price"
                        id="origin_price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入原價"
                        value={templateProduct.origin_price}
                        onChange={(e) => handleModalInputChange(e)}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="price" className="form-label">
                        售價
                      </label>
                      <input
                        name="price"
                        id="price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入售價"
                        value={templateProduct.price}
                        onChange={(e) => handleModalInputChange(e)}
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      產品描述
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      className="form-control"
                      placeholder="請輸入產品描述"
                      value={templateProduct.description}
                      onChange={(e) => handleModalInputChange(e)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      礦石介紹
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      className="form-control"
                      placeholder="請輸入礦石介紹"
                      value={templateProduct.content}
                      onChange={(e) => handleModalInputChange(e)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="attention" className="form-label">
                      注意事項
                    </label>
                    <textarea
                      name="attention"
                      id="attention"
                      className="form-control"
                      placeholder="請輸入注意事項"
                      value={templateProduct.attention}
                      onChange={(e) => handleModalInputChange(e)}
                    ></textarea>
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="form-check">
                      <input
                        name="is_enabled"
                        id="is_enabled"
                        className="form-check-input"
                        type="checkbox"
                        checked={templateProduct.is_enabled}
                        onChange={(e) => handleModalInputChange(e)}
                      />
                      <label
                        className="form-check-label me-3"
                        htmlFor="is_enabled"
                      >
                        是否啟用
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        name="is_featured"
                        id="is_featured"
                        className="form-check-input"
                        type="checkbox"
                        checked={templateProduct.is_featured}
                        onChange={(e) => handleModalInputChange(e)}
                      />
                      <label className="form-check-label" htmlFor="is_featured">
                        精選推薦
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {modalType === "delete" ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => delProduct(templateProduct.id)}
              >
                刪除
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => closeModal()}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => updateProduct(templateProduct.id)}
                >
                  確認
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;

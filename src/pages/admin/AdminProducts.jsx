import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { useNavigate } from "react-router";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminProducts() {
  // 產品資料狀態
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const productModalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const INITIAL_TEMPLATE_DATA = {
    id: "",
    title: "",
    category: "",
    collection: "",
    origin_price: "",
    price: "",
    unit: "",
    description: "",
    content: "",
    attention: `🍀所使用水晶皆為天然水晶 ,冰裂、棉絮等都為天然生成。
🍀本賣場提供客製化服務,如有需要可以多加利用哦。
🍀本賣場所製作的商品，出貨前會進行淨化以及加持，喚醒水晶的能量。`,
    is_enabled: false,
    is_featured: false,
    imageUrl: "",
    imagesUrl: [],
  };

  // Modal 狀態
  const [templateProduct, setTemplateProduct] = useState(INITIAL_TEMPLATE_DATA);
  const [modalType, setModalType] = useState("");

  // 取得產品
  const getProducts = async (page = 1) => {
    try {
      const productsRes = await axios.get(
        `${BASE_URL}/api/${API_PATH}/admin/products?page=${page}`,
      );

      setProducts(productsRes.data.products);
      setPagination(productsRes.data.pagination);
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
      getProducts();
    } else {
      // 沒 token → 導回登入
      navigate("/admin/adminlogin");
    }

    // Bootstrap Modal 初始化
    productModalRef.current = new bootstrap.Modal("#productModal", {
      keyboard: false,
    });
  }, []);

  const openModal = (type, product) => {
    setModalType(type);
    setTemplateProduct({
      ...INITIAL_TEMPLATE_DATA,
      ...product,
    });
    productModalRef.current.show();
  };

  const closeModal = () => {
    productModalRef.current.hide();
  };

  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <h2 className="text-center fw-bold mb-3">商品列表</h2>
        <div className="text-end my-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => openModal("create", INITIAL_TEMPLATE_DATA)}
          >
            建立新的商品
          </button>
        </div>
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">商品ID</th>
              <th scope="col">類別</th>
              <th scope="col">商品圖片</th>
              <th scope="col">商品名稱</th>
              <th scope="col">售價</th>
              <th scope="col">狀態</th>
              <th scope="col">操作</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.imageUrl}
                    style={{ width: "120px" }}
                    className="img-fluid"
                    alt={product.title}
                  ></img>
                </td>
                <td>{product.title}</td>
                <td>NT${product.price}</td>
                <td>
                  <span
                    className={`badge ${product.is_enabled ? "bg-success" : "bg-secondary"}`}
                  >
                    {product.is_enabled ? "上架" : "下架"}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openModal("edit", product)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => openModal("delete", product)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} onChangePage={getProducts} />
      </div>

      <ProductModal
        closeModal={closeModal}
        modalType={modalType}
        templateProduct={templateProduct}
        setTemplateProduct={setTemplateProduct}
        getProducts={getProducts}
      />
    </>
  );
}

export default AdminProducts;

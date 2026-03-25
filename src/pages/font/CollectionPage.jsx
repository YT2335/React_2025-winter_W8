import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CollectionPage() {
  const dispatch = useDispatch();

  const collectionMap = {
    bossdesign: "老闆設計款",
    numerology: "生命靈數",
    starsign: "十二星座",
    customize: "客製化",
  };

  // 假設 useParams() 抓到英文值
  const { collectionName } = useParams();
  // 用對照表轉成中文顯示在 banner
  const displayName = collectionMap[collectionName] || collectionName;

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${API_PATH}/products/all`,
      );

      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filterProducts = products.filter(
    (product) => product.collection === collectionName,
  );
  return (
    <div className="bg-light border-top border-bottom">
      <div className="banner">
        <div className="card bg-dark text-white">
          <img
            src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&h=200&auto=format&fit=crop"
            className="img-fluid opacity-25"
            alt="banner"
          />

          <div className="card-img-overlay container d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-6 display-md-4 fw-bold">{displayName}</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-5 g-4">
          {filterProducts.map((product) => (
            <div className="col-lg-3 col-md-6" key={product.id}>
              <div className="card card-hover h-100 shadow-lg border-0">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h2 className="text-primary fs-4 fw-bold">{product.title}</h2>
                  <p className="fs-5">NT.{product.price}</p>
                </div>
                <NavLink
                  className="stretched-link"
                  to={`/product/${product.id}`}
                ></NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;

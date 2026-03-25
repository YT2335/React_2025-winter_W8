import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const dispatch = useDispatch();

  const getProducts = async (page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${API_PATH}/products?page=${page}`,
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

  return (
    <>
      <div className="banner">
        <div className="card bg-dark text-white">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&h=200&auto=format&fit=crop"
            className="img-fluid opacity-25"
            alt="banner"
          />

          <div className="card-img-overlay container d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-6 display-md-4 fw-bold">ALL ITEMS</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-5 g-4">
          {products.map((product) => (
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
        <Pagination pagination={pagination} onChangePage={getProducts} />
      </div>
    </>
  );
}

export default Products;

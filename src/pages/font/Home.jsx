import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/products/all`);
      setProducts(res.data.products);
    };
    getProducts();
  }, []);

  return (
    <div>
      {/* 1. Hero Banner */}
      <section className="banner-home">
        <div className="card bg-dark text-white">
          <img
            src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=1400&h=500&auto=format&fit=crop"
            className="img-fluid opacity-25 d-none d-lg-block"
            alt="banner"
          />
          <img
            src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=1400&h=500&auto=format&fit=crop"
            className="img-fluid opacity-25 d-lg-none d-block img-300"
            alt="banner"
          />
          <div
            className="card-img-overlay container d-flex flex-column justify-content-center align-items-start"
            data-aos="fade-right"
            data-aos-duration="8000"
          >
            <h1 className="display-6 fs-md-4 fw-bold mb-3">
              找到屬於你的能量水晶
            </h1>
            <p className="fs-5 fs-md-4 ">天然水晶 × 手工設計 × 專屬能量</p>
            <NavLink className="btn btn-outline-light px-4 py-2" to="products">
              立即探索
            </NavLink>
          </div>
        </div>
      </section>

      <div className="container">
        {/* 2. 品牌特色 */}
        <section
          className="py-5 text-center"
          data-aos="fade-up"
          data-aos-duration="8000"
        >
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="text-primary fw-bold">天然水晶</h5>
              <p className="text-muted">嚴選礦石 能量純淨</p>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-primary fw-bold">手工設計</h5>
              <p className="text-muted">每件作品獨一無二</p>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-primary fw-bold">專屬能量</h5>
              <p className="text-muted">找到最適合你的頻率</p>
            </div>
          </div>
        </section>

        {/* 3. 分類入口 */}
        <section className="py-5" data-aos="fade-up" data-aos-duration="5000">
          <h2 className="text-center fw-bold mb-5 text-primary">
            依需求選擇能量
          </h2>

          <div className="row g-4">
            {/* 愛情運 */}
            <div className="col-md-4">
              <div className="card text-white border-0">
                <img
                  src="https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?q=80&w=400&h=300&auto=format&fit=crop"
                  className="card-img"
                  alt="愛情運"
                />
                <div className="card-img-overlay d-flex flex-column justify-content-end align-items-center bg-dark bg-opacity-50">
                  <h3 className="fw-bold">愛情運</h3>
                </div>
              </div>
            </div>

            {/* 財運 */}
            <div className="col-md-4">
              <div className="card text-white border-0">
                <img
                  src="https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=400&h=300&auto=format&fit=crop"
                  className="card-img"
                  alt="財運"
                />
                <div className="card-img-overlay d-flex flex-column justify-content-end align-items-center bg-dark bg-opacity-50">
                  <h3 className="fw-bold">財運</h3>
                </div>
              </div>
            </div>

            {/* 平靜能量 */}
            <div className="col-md-4">
              <div className="card text-white border-0">
                <img
                  src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=400&h=300&auto=format&fit=crop"
                  className="card-img"
                  alt="平靜能量"
                />
                <div className="card-img-overlay d-flex flex-column justify-content-end align-items-center bg-dark bg-opacity-50">
                  <h3 className="fw-bold">平靜能量</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 情境區 */}
        <section className="py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <img
                src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=500&h=400&auto=format&fit=crop"
                className="img-fluid rounded shadow"
                data-aos="fade-right"
              />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h3 className="fw-bold mb-3 text-primary">
                讓水晶陪伴你的每一天
              </h3>
              <p className="text-muted mb-4">
                每一顆水晶都蘊含獨特能量，幫助你找到內在平衡與力量。
              </p>
              <NavLink to="/products" className="btn btn-primary">
                探索更多
              </NavLink>
            </div>
          </div>
        </section>

        {/* 5. 精選商品 */}
        <section className="py-5" data-aos="fade-up" data-aos-duration="5000">
          <h2 className="text-center fw-bold mb-5 text-primary">精選推薦</h2>
          <div className="row g-4">
            {products
              .filter((item) => item.is_featured)
              .slice(0, 4)
              .map((item) => (
                <div className="col-md-3" key={item.id}>
                  <div className="card card-hover h-100 border-0 shadow-sm">
                    <img
                      src={item.imageUrl}
                      className="card-img-top"
                      alt={item.title}
                    />
                    <div className="card-body">
                      <h6 className="fw-bold">{item.title}</h6>
                      <p className="text-danger">NT${item.price}</p>
                    </div>
                    <NavLink
                      className="stretched-link"
                      to={`/product/${item.id}`}
                    ></NavLink>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* 6. 活動公告 */}
        <section className="py-5 bg-light text-center">
          <h2 className="mb-4">最新活動</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="alert alert-primary" role="alert">
                🎁 滿 NT$1,500 即送天然水晶小擺件，數量有限送完為止 🎁
              </div>
            </div>
          </div>
        </section>

        {/* 7. Call to Action */}
        <section className="py-5 text-center">
          <h3 className="fw-bold mb-3 text-primary">開始你的能量旅程</h3>
          <NavLink to="/products" className="btn btn-primary px-5">
            立即選購
          </NavLink>
        </section>

        {/* 8. 資訊區 */}
        <section
          className="py-5 text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="row">
            <div className="col-md-4 mb-5">
              <h6 className="text-primary fw-bold">快速出貨</h6>
              <p className="text-muted">48小時內出貨</p>
            </div>
            <div className="col-md-4 mb-5">
              <h6 className="text-primary fw-bold">安心購買</h6>
              <p className="text-muted">7天鑑賞期</p>
            </div>
            <div className="col-md-4 mb-5">
              <h6 className="text-primary fw-bold">客服支援</h6>
              <p className="text-muted">隨時為你服務</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

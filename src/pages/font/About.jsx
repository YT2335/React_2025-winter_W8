import { useEffect } from "react";
import { useLocation } from "react-router";

function About() {
  //React Router 不會自動 scroll 到 id，從其他頁面進來時，自動滾動到指定區塊需另外寫
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="bg-light border-top border-bottom text-primary">
      <div className="container py-5">
        {/* 標題 */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">關於 CINDY CRYSTAL</h1>
          <p className="text-muted">讓每一天，都有屬於自己的光</p>
        </div>

        <div className="row g-5">
          {/* 左側選單 */}
          <div className="col-md-3">
            <div className="list-group sticky-top" style={{ top: "100px" }}>
              <button
                className="list-group-item list-group-item-action"
                onClick={() =>
                  document
                    .getElementById("brandstory")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                品牌故事
              </button>
              <button
                className="list-group-item list-group-item-action"
                onClick={() =>
                  document
                    .getElementById("care")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                保養方式
              </button>
            </div>
          </div>

          {/* 右側內容 */}
          <div className="col-md-9">
            {/* 品牌故事 */}
            <section id="brandstory" className="mb-5">
              <h3 className="fw-bold mb-4 border-bottom pb-2">品牌故事</h3>

              <p className="lh-lg text-dark">
                CINDY CRYSTAL 誕生於對純粹與光芒的嚮往。
              </p>

              <p className="lh-lg text-dark">
                我們相信，每一件飾品不只是裝飾，而是能夠陪伴生活的微小光芒。
              </p>

              <p className="lh-lg text-dark">
                在日常的片刻之中，一枚戒指、一條項鍊、一副耳環，
                都可能成為記憶與情感的載體。
              </p>

              <p className="lh-lg text-dark">
                以簡約而細緻的設計為核心，選用具有光澤與層次感的材質，
                打造能夠融入日常穿搭的飾品。
              </p>

              <p className="lh-lg fw-semibold">讓每一天，都有屬於自己的光。</p>
            </section>

            {/* 保養方式 */}
            <section id="care">
              <h3 className="fw-bold mb-4 border-bottom pb-2">保養方式</h3>

              <div className="row g-4">
                {/* 卡片 */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src="https://images.unsplash.com/photo-1643081262278-807976f7f2f7?q=80&w=387"
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectPosition: "top",
                        objectFit: "cover",
                      }}
                      alt="避免洗澡"
                    />
                    <div className="card-body text-center">
                      <p className="fw-semibold">
                        <span className="text-danger">避免</span> 洗澡時佩戴
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src="https://images.unsplash.com/photo-1519525770840-fa8a272b02a6?q=80&w=870"
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                      alt="避免摩擦"
                    />
                    <div className="card-body text-center">
                      <p className="fw-semibold">
                        <span className="text-danger">避免</span> 刮擦摩擦
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src="https://images.unsplash.com/photo-1771607501251-31c6cd192ec4?q=80&w=678"
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                      alt="避免潮濕"
                    />
                    <div className="card-body text-center">
                      <p className="fw-semibold">
                        <span className="text-danger">避免</span> 潮濕環境
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

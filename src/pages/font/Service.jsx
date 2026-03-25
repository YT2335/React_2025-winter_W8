import { useEffect } from "react";
import { useLocation } from "react-router";

function Service() {
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
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h1 className="fw-bold mb-3">Customer Service 顧客服務</h1>
            <p className="text-muted fs-6">
              歡迎來到 CINDY CRYSTAL
              水晶手鍊商店，以下為購物相關資訊，請在下單前詳閱。
              <br />
              如有任何問題，歡迎聯絡客服，我們將盡快為您服務。
            </p>
          </div>

          <div className="col-12 col-md-8">
            <ol className="ps-3">
              <li className="mb-5">
                <h4 className="fw-bold mb-3" id="shopping">
                  購物須知
                </h4>
                <ul className="ps-3 lh-lg ">
                  <li>本店商品皆為天然水晶製作，每顆水晶可能略有不同。</li>
                  <li>商品圖片可能因螢幕不同略有色差。</li>
                  <li>手鍊尺寸可能有 ±0.5cm 誤差。</li>
                  <li>訂單成立後如需修改請盡快聯絡客服。</li>
                  <li>客製商品出貨時間可能延長。</li>
                </ul>
              </li>

              <li className="mb-5">
                <h4 className="fw-bold mb-3" id="payment">
                  付款方式
                </h4>
                <p className="lh-lg">
                  我們提供以下付款方式： 信用卡付款（Visa / MasterCard / JCB）
                </p>
                <ul className="ps-3 lh-lg">
                  <li>ATM 轉帳請於 3 日內完成付款</li>
                  <li>付款後將寄送確認信</li>
                </ul>
                <p className="text-muted small">
                  注意事項： ATM 轉帳請於 3日內完成付款，逾期訂單將自動取消。
                  付款完成後系統會寄送確認信至您的電子郵件。
                </p>
              </li>

              <li className="mb-5">
                <h4 className="fw-bold mb-3" id="shipment">
                  配送方式
                </h4>
                <ul className="ps-3 lh-lg">
                  <li>超商取貨（7-11 / 全家 / 萊爾富）約 3–5 天</li>
                  <li>宅配到府（黑貓 / 新竹物流）約 1–3 天</li>
                  <li>滿 NT$1000 免運，未滿：超商 NT$60 / 宅配 NT$100</li>
                </ul>
                <p className="text-muted small">※ 實際配送時間可能因節日延誤</p>
              </li>

              <li className="mb-5">
                <h4 className="fw-bold mb-3" id="customerservice">
                  售後服務
                </h4>
                <p className="lh-lg">若商品有問題，請於 7 日內聯絡客服。</p>
                <p className="lh-lg">Email：service@example.com</p>
                <p className="lh-lg">客服時間：週一至週五 10:00 – 18:00</p>
              </li>

              <li className="mb-5">
                <h4 className="fw-bold mb-3" id="return">
                  退貨政策
                </h4>
                <p className="fw-semibold">可退貨情況</p>
                <ul className="ps-3 lh-lg">
                  <li>商品瑕疵</li>
                  <li>寄錯商品</li>
                </ul>
                <p className="fw-semibold mt-3">無法退貨</p>
                <ul className="ps-3 lh-lg">
                  <li>已使用商品</li>
                  <li>客製商品</li>
                  <li>超過 7 天</li>
                </ul>
                <p className="fw-semibold mt-3">退貨流程</p>
                <ol className="ps-3 lh-lg">
                  <li>聯絡客服並提供訂單編號</li>
                  <li>客服確認退貨申請</li>
                  <li>將商品寄回指定地址</li>
                  <li>商品確認無誤後進行退款</li>
                  <li>退款方式將依原付款方式退回。</li>
                </ol>
              </li>

              <li className="mb-5">
                <h4 className="fw-bold mb-3">其他注意事項</h4>
                <ul className="ps-3 lh-lg">
                  <li>本店保留修改訂單與活動內容之權利。</li>
                  <li>
                    若遇不可抗力因素（天災、物流延誤等），配送時間可能調整。
                  </li>
                  <li>如有未盡事宜，將以本店公告為準。</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;

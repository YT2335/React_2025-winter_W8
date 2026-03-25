function OrderModal({ showModal, orderDetail, handleClose }) {
  return (
    <>
      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">訂單明細</h5>
                <button className="btn-close" onClick={handleClose}></button>
              </div>

              <div className="modal-body">
                {orderDetail ? (
                  <>
                    {/* 顧客資訊 */}
                    <h5 className="fw-bold mb-3">顧客資訊</h5>
                    <p>姓名：{orderDetail.user.name}</p>
                    <p>Email：{orderDetail.user.email}</p>
                    <p>電話：{orderDetail.user.tel}</p>
                    <p>備註：{orderDetail.message || "無"}</p>

                    {/* 配送資訊 */}
                    <h5 className="fw-bold mt-4 mb-3">配送資訊</h5>
                    <p>取貨門市：{orderDetail.user.address}</p>

                    {/* 商品清單 */}
                    <h5 className="fw-bold mt-4 mb-3">商品清單</h5>
                    <table className="table table-sm text-center align-middle">
                      <thead>
                        <tr>
                          <th>圖片</th>
                          <th>商品名稱</th>
                          <th>數量</th>
                          <th>單價</th>
                          <th>小計</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(orderDetail.products).map((item) => (
                          <tr key={item.id}>
                            <td style={{ width: "80px" }}>
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.title}
                                className="img-fluid"
                              />
                            </td>
                            <td>{item.product.title}</td>
                            <td>{item.qty}</td>
                            <td>NT {item.product.price.toLocaleString()}</td>
                            <td>
                              NT{" "}
                              {(item.qty * item.product.price).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* 總金額 */}
                    <div className="text-end fw-bold">
                      總計：NT {orderDetail.total.toLocaleString()}
                    </div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderModal;

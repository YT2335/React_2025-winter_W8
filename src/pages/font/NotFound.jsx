import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light">
      <h1 className="display-1 fw-bold text-danger mb-3">404</h1>
      <h2 className="fw-bold mb-2">這裡沒有水晶，只有空氣 🍃</h2>
      <p className="text-muted mb-4">別擔心，5 秒後帶你回到能量世界</p>
      <button className="btn btn-primary btn-lg" onClick={() => navigate("/")}>
        立即探索
      </button>
    </div>
  );
}

export default NotFound;

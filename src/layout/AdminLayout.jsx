import { getToken, setAuthToken } from "../utils/auth";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

// 設定API
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminLayout() {
  const [token, setToken] = useState(getToken() || "");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      if (!token) {
        navigate("/admin/adminlogin");
        return;
      }

      // 設 axios header
      setAuthToken();

      try {
        // 驗證 token 是否有效
        await axios.post(`${BASE_URL}/api/user/check`);
      } catch (error) {
        logout();
      }
    };

    checkLogin();
  }, [token, navigate]);

  const logout = () => {
    // 刪 cookie + axios header
    document.cookie =
      "crystalToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    delete axios.defaults.headers.common.Authorization;

    // 清掉 state
    setToken("");

    // 導回登入頁
    navigate("/admin/adminlogin");
  };

  return (
    <div className="d-flex flex-column">
      <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light border border-bottom">
          <div className="container">
            <h1 className="navbar-brand mb-0">CINDY CRYSTAL</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-decoration-none"
                    to="adminproducts"
                  >
                    商品管理
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-decoration-none"
                    to="adminorders"
                  >
                    訂單管理
                  </NavLink>
                </li>
              </ul>
              {token ? (
                <button type="button" className="btn" onClick={logout}>
                  <i className="bi bi-box-arrow-right fs-3"></i>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate("/admin/adminlogin")}
                >
                  <i className="bi bi-person fs-3"></i>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow-1 bg-light">
        <Outlet />
      </main>
      <footer className="bg-light border border-top">
        <p className="mt-2 text-muted text-center">
          &copy; 2026~∞ - CINDY CRYSTAL
        </p>
      </footer>
    </div>
  );
}

export default AdminLayout;

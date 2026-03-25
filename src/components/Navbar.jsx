import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const dropdownData = [
    {
      title: "CATEGORY",
      items: [
        { label: "手鍊", link: "/category/手鍊" },
        { label: "擺飾", link: "/category/擺飾" },
      ],
    },
    {
      title: "COLLECTIONS",
      items: [
        { label: "十二星座", link: "/collection/starsign" },
        { label: "生命靈數", link: "/collection/numerology" },
        { label: "老闆設計款", link: "/collection/bossdesign" },
        { label: "客製化", link: "/collection/customize" },
      ],
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-light navbar-expand-lg bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            CINDY CRYSTAL
          </NavLink>

          {/* 漢堡按鈕 */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOffcanvasOpen(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Offcanvas */}
          <div
            className={`offcanvas offcanvas-end ${offcanvasOpen ? "show" : ""}`}
            tabIndex="-1"
            style={{ visibility: offcanvasOpen ? "visible" : "hidden" }}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">CINDY CRYSTAL</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setOffcanvasOpen(false);
                  setOpenDropdown(null);
                }}
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="products"
                    onClick={() => setOffcanvasOpen(false)}
                  >
                    ALL ITEMS
                  </NavLink>
                </li>

                {dropdownData.map((dropdown, index) => (
                  <li key={dropdown.title} className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // 防止被外部 click 關閉
                        setOpenDropdown(openDropdown === index ? null : index);
                      }}
                    >
                      {dropdown.title}
                    </a>

                    <ul
                      className={`dropdown-menu ${
                        openDropdown === index ? "show" : ""
                      }`}
                    >
                      {dropdown.items.map((item) => (
                        <li key={item.label}>
                          <NavLink className="dropdown-item" to={item.link}>
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <ul className="navbar-nav justify-content-end d-none d-lg-flex">
                <NavLink className="nav-item pe-3" to="cart">
                  <i className="bi bi-handbag fs-3"></i>
                </NavLink>
                <NavLink className="nav-item" to="/admin/adminlogin">
                  <i className="bi bi-person fs-3"></i>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* 背景遮罩 */}
      {offcanvasOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setOffcanvasOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;

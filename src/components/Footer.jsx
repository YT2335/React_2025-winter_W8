import { NavLink } from "react-router";

function Footer() {
  const footerData = [
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
    {
      title: "CUSTOMER SERVICE",
      items: [
        { label: "購物須知", link: "/service#shopping" },
        { label: "付款方式", link: "/service#payment" },
        { label: "配送方式", link: "/service#shipment" },
        { label: "售後服務", link: "/service#customerservice" },
        { label: "退貨政策", link: "/service#return" },
      ],
    },
    {
      title: "ABOUT CINDY CRYSTAL",
      items: [
        { label: "品牌故事", link: "/about#brandstory" },
        { label: "保養方式", link: "/about#care" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "bi-facebook", link: "https://www.facebook.com/?locale=zh_TW" },
    {
      icon: "bi-instagram",
      link: "https://www.instagram.com/",
    },
    { icon: "bi-line", link: "https://www.line.me/tw/" },
  ];

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row py-4 d-flex justify-content-between">
          {footerData.map((section) => (
            <div className="col-lg-2 col-md-6" key={section.title}>
              <h2 className="fs-5 text-primary">{section.title}</h2>
              <ul className="list-unstyled">
                {section.items.map((item) => (
                  <li className="mb-2" key={item.label}>
                    <NavLink
                      to={item.link}
                      className="text-muted text-decoration-none"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT US */}
          <div className="col-lg-2 col-md-6">
            <h2 className="fs-5 text-primary">CONTACT US</h2>
            <ul className="list-unstyled d-flex">
              {socialLinks.map((item, index) => (
                <li key={index}>
                  <i className="fs-3 pe-3">
                    <a href={item.link} className="text-muted" target="_blank">
                      <i className={`bi ${item.icon} fs-4`}></i>
                    </a>
                  </i>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-light text-center py-3 border border-top border-white">
        <p className="mb-0 fs-6 text-nowrap">
          © 2026 CINDY CRYSTAL All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

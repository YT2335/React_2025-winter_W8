import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayout";
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/font/Home";
import Cart from "./pages/font/Cart";
import About from "./pages/font/About";
import Products from "./pages/font/Products";
import NotFound from "./pages/font/NotFound";
import Checkout from "./pages/font/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import Service from "./pages/font/Service";
import CategoryPage from "./pages/font/CategoryPage";
import CollectionPage from "./pages/font/CollectionPage";
import SingleProduct from "./pages/font/SingleProduct";
import CheckoutSuccess from "./pages/font/CheckoutSuccess";

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true, // 預設首頁
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "collection/:collectionName",
        element: <CollectionPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkoutsuccess/:orderId",
        element: <CheckoutSuccess />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "service",
        element: <Service />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "adminlogin",
        element: <AdminLogin />,
      },
      {
        path: "adminproducts",
        element: <AdminProducts />,
      },
      {
        path: "adminorders",
        element: <AdminOrders />,
      },
    ],
  },
  {
    path: "*", // 404 頁面
    element: <NotFound />,
  },
]);

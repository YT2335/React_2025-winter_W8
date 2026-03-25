import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createAsyncMessage } from "../../slice/messageSlice";
import { setAuthToken } from "../../utils/auth";

//API設定
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminLogin() {
  const dispatch = useDispatch();

  //登入驗證
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const loginSubmit = async (account) => {
    try {
      const loginRes = await axios.post(`${BASE_URL}/admin/signin`, account);
      // 取得token
      const { token, expired } = loginRes.data;

      // 把 token 存到 cookie
      document.cookie = `crystalToken=${token}; expires=${new Date(expired).toUTCString()}; path=/`;

      // 設定 axios 預設 header (之後所有 axios request 都會自動帶上)
      setAuthToken();

      navigate("/admin/adminproducts");
    } catch (error) {
      dispatch(createAsyncMessage(error.response?.data));
    }
  };

  return (
    <>
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-3 text-primary">管理者登入</h1>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              {...register("username", {
                required: "請輸入 Email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email 格式不正確",
                },
              })}
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", {
                required: "請輸入密碼",
                minLength: {
                  value: 6,
                  message: "密碼長度至少需 6 碼",
                },
              })}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;

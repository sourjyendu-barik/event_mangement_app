import React, { useState } from "react";
import HeaderName from "../reusableComponents/HeaderName";
import TextBtn from "../reusableComponents/TextBtn";
import InputComponent from "../reusableFormComponents/InputComponent";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = ({ authChange }) => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log("Login Data:", formData);
    try {
      await login(formData);
      // console.log("result", data);
      toast.success("User Logged in successful");
      setFormData({ email: "", password: "" });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div>
        <h6 className="mb-5 text-center">
          Login to <HeaderName />
        </h6>
        <form onSubmit={onSubmitHandler}>
          <InputComponent
            label="Email"
            type="email"
            value={formData.email}
            name="email"
            placeholder="Enter your email"
            onChange={onChangeHandler}
            autocomplete="user_name"
          />

          <div style={{ position: "relative" }}>
            <InputComponent
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name="password"
              placeholder="Enter your password"
              onChange={onChangeHandler}
              autoComplete="user-password"
            />

            <div style={{ marginTop: "8px" }}>
              <label style={{ cursor: "pointer", fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  style={{ marginRight: "6px" }}
                />
                Show Password
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-secondary w-100 mt-3">
            Login
          </button>
        </form>
        <p className="mt-3 d-flex justify-content-center align-items-center gap-1">
          New user ?
          <TextBtn
            onClick={() => authChange((prev) => "siginin")}
            name="sigin in here"
          />
        </p>
      </div>
    </>
  );
};

export default Login;

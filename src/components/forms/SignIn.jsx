import axios from "axios";
import HeaderName from "../reusableComponents/HeaderName";
import TextBtn from "../reusableComponents/TextBtn";
import InputComponent from "../reusableFormComponents/InputComponent";
import { useState } from "react";
import { toast } from "react-toastify";
const SignIn = ({ authChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("SignUp Data:", formData);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/signin",
        formData,
      );
      // console.log(data);
      setFormData({ email: "", password: "", name: "", role: "user" });
      toast.success("User register in successfull");
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div>
      <h6 className="mb-5 text-center">
        SignIn to <HeaderName />
      </h6>
      <form onSubmit={onSubmitHandler}>
        <InputComponent
          label="User Name"
          type="text"
          value={formData.name}
          name="name"
          placeholder="Add the user name here"
          onChange={onChangeHandler}
          autocomplete="_name"
        />
        <InputComponent
          label="Email"
          type="email"
          value={formData.email}
          name="email"
          placeholder="Enter your email"
          onChange={onChangeHandler}
          autocomplete="_email"
        />
        <div style={{ position: "relative" }}>
          <InputComponent
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            name="password"
            placeholder="Enter your password"
            onChange={onChangeHandler}
            autoComplete="_password"
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
          Sign In
        </button>
      </form>
      <p className="mt-3 d-flex justify-content-center align-items-center gap-1">
        Already signed up ?{" "}
        <TextBtn
          onClick={() => authChange((prev) => "login")}
          name="login here"
        />
      </p>
    </div>
  );
};

export default SignIn;

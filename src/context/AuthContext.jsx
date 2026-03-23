import { createContext, useContext, useEffect, useState } from "react";
import { AxiosInstance } from "../api/AxiosInstance";
import { ENDPOINT } from "../api/Endpoints";
// Create the context
const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
// Axios default to send cookies
//axios.defaults.withCredentials = true;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(user);
  // Fetch current logged-in user
  const getUser = async () => {
    try {
      const res = await AxiosInstance.get(ENDPOINT.ME);
      setUser(res?.data?.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (formdata) => {
    try {
      const { data } = await AxiosInstance.post(ENDPOINT.LOGIN, formdata);
      console.log("login successfull");
      // Fetch user after login
      await getUser();
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  };

  // Logout function
  const logout = async () => {
    await AxiosInstance.post(ENDPOINT.LOGOUT);
    setUser(null);
  };

  // Fetch user on app load / refresh
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

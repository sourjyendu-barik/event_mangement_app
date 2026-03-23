import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { AxiosInstance } from "../api/AxiosInstance";
import { ENDPOINT } from "../api/Endpoints";
const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { user, loading } = useAuthContext();
  const [events, setEvents] = useState({
    data: [],
    loading: false,
    error: null,
  });

  //   const [projects, setProjects] = useState({
  //     data: [],
  //     loading: false,
  //     error: null,
  //   });

  useEffect(() => {
    if (!loading && user) {
      loadEventList();
      //loadProjects();
    }
  }, [user, loading]);

  const loadEventList = async () => {
    setEvents((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { data } = await AxiosInstance.get(ENDPOINT.EVENTS);
      setEvents({ data, loading: false, error: null });
    } catch (err) {
      setEvents({ data: null, loading: false, error: err.message });
    }
  };

  //   const loadProjects = async () => {
  //     setProjects((prev) => ({ ...prev, loading: true, error: null }));

  //     try {
  //       const res = await fetch("/api/projects");
  //       const data = await res.json();

  //       setProjects({ data, loading: false, error: null });
  //     } catch (err) {
  //       setProjects({ data: [], loading: false, error: err.message });
  //     }
  //   };

  return (
    <DataContext.Provider value={{ events }}>{children}</DataContext.Provider>
  );
};

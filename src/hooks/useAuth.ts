import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const useAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      if (!pathname.includes("register")) navigate("/login");
    }
  }, [pathname, navigate]);
};

export default useAuth;

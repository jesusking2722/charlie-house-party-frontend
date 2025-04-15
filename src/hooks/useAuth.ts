import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      if (!pathname.includes("/register")) navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token) as any;
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("Authorization");
      navigate("/login");
    }
  }, [pathname, navigate]);

  useEffect(() => {
    if (user) {
      // Onboarding logic, if needed:
      // if (!user.emailVerified) navigate("/register");
      // else if (!user.name || !user.country) {
      //   navigate("/onboarding");
      // }
    }
  }, [user, navigate]);
};

export default useAuth;

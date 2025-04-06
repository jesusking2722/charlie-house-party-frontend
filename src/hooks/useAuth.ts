import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

const useAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      if (!pathname.includes("register")) navigate("/login");
    }
  }, [pathname, navigate]);

  useEffect(() => {
    if (user) {
      if (!user.emailVerified) navigate("/register");
      else if (!user.name || !user.country) navigate("/onboarding");
    }
  }, [user]);
};

export default useAuth;

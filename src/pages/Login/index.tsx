import { useState } from "react";
import {
  Button,
  CustomPhoneInput,
  IconButton,
  Input,
  Spinner,
} from "../../components";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useGoogleLogin } from "@react-oauth/google";
import { emailLogin, googleLogin } from "../../lib/scripts";
import { setAuthToken } from "../../lib/fetchInstance";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAuth } from "../../redux/slices/authSlice";
import { useAppKit } from "@reown/appkit/react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneSelected, setPhoneSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open } = useAppKit();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    if (!phoneSelected) {
      if (email === "") return false;
      if (!validateEmail(email)) return false;
    } else {
      if (!isValidPhoneNumber(phone, "PL")) return false;
    }
    if (password === "") return false;
    return true;
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse: any) => {
      try {
        setLoading(true);
        const { code } = codeResponse;
        console.log(code);
        const response = await googleLogin(code);
        if (response.ok) {
          const { token, user } = response.data;
          setAuthToken(token as string);
          dispatch(setAuth({ token, user }));
          toast.success("Welcome to register !!!");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setLoading(false);
      }
    },
    onError: (error: any) => {
      console.error("Google Login Error:", error);
    },
  });

  const handleEmailLogin = async () => {
    try {
      if (!validate) return;
      setLoading(true);
      const user = {
        email,
        password,
      };
      const response = await emailLogin(user);
      if (response.ok) {
        const { token, user } = response.data;
        setAuthToken(token as string);
        dispatch(setAuth({ token, user }));
        toast.success("Welcome to register !!!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("handle login register error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {loading && <Spinner />}
      <div className="w-full flex flex-row gap-4">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="basis-2/3 bg-white rounded-xl shadow-lg"
        >
          <img
            src="../assets/pngs/model1.png"
            alt="MODEL"
            className="w-full h-auto rounded-xl"
          />
        </motion.div>
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="basis-1/3 bg-black/5 border border-white backdrop-blur-sm rounded-xl shadow-lg flex flex-col items-center justify-center gap-2"
        >
          <img src="./logo.png" alt="LOGO" className="w-[120px] h-auto" />
          <div className="gap-1 flex flex-col items-center justify-center">
            <h1 className="font-semibold text-white text-3xl">
              WELCOME LOG IN !!!
            </h1>
            <p className="font-semibold text-white">
              Let's enjoy our life in happy house party
            </p>
          </div>
          <AnimatePresence mode="wait">
            {!phoneSelected ? (
              <motion.div
                key="email-section"
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-full flex flex-col items-center justify-center gap-4"
              >
                <div className="flex flex-col gap-4 w-full px-12">
                  <Input
                    type="email"
                    placeholder="example.com"
                    icon="solar:inbox-line-bold-duotone"
                    value={email}
                    invalid={!validate()}
                    invalidTxt="Input your correct email"
                    onChange={setEmail}
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    icon="solar:heart-lock-bold-duotone"
                    value={password}
                    invalid={password === ""}
                    invalidTxt="Input your password"
                    onChange={setPassword}
                  />
                </div>
                <div className="flex flex-row items-center justify-center gap-8 mt-4">
                  <IconButton
                    icon="logos:google-icon"
                    onClick={handleGoogleLogin}
                  />
                  <IconButton
                    icon="solar:smartphone-2-bold-duotone"
                    onClick={() => {
                      setPhoneSelected(true);
                    }}
                  />
                  <IconButton
                    icon="solar:wallet-money-bold-duotone"
                    onClick={() => open()}
                  />
                </div>
                <div className="mt-4">
                  <Button
                    label="Log in with email"
                    type="transparent"
                    icon="solar:login-bold-duotone"
                    disabled={!validate()}
                    onClick={handleEmailLogin}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="phone-section"
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-full flex flex-col items-center justify-center gap-4"
              >
                <div className="flex flex-col gap-4 w-full px-12">
                  <CustomPhoneInput
                    value={phone}
                    invalidTxt="Input your correct phone number"
                    defaultCountry="PL"
                    onChange={setPhone}
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    icon="solar:heart-lock-bold-duotone"
                    value={password}
                    invalid={password === ""}
                    invalidTxt="Input your password"
                    onChange={setPassword}
                  />
                  <Button
                    type="outline"
                    label="Return to email"
                    icon="solar:rewind-back-bold-duotone"
                    onClick={() => {
                      setPhoneSelected(false);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <Button
                    label="Log in with phone"
                    type="transparent"
                    icon="solar:login-bold-duotone"
                    disabled={
                      !isValidPhoneNumber(phone, "PL") || password === ""
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-2 flex flex-col w-full items-center justify-center gap-4">
            <p className="text-white text-sm">Don't you have an account?</p>
            <Button
              type="outline"
              label="Register"
              icon="solar:login-line-duotone"
              onClick={() => {
                navigate("/register");
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

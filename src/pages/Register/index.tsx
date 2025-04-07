import { useEffect, useState } from "react";
import {
  Button,
  CustomPhoneInput,
  IconButton,
  Input,
  Spinner,
} from "../../components";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { emailRegister, googleLogin } from "../../lib/scripts";
import toast from "react-hot-toast";
import { setAuthToken } from "../../lib/fetchInstance";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";
import EmailVerification from "./EmailVerificatoin";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useAppKit } from "@reown/appkit/react";
import { RootState } from "../../redux/store";
import {BASE_URL} from "../../constant";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneSelected, setPhoneSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailVerifySection, setEmailVerifySection] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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

  const handleGoogleRegister = useGoogleLogin({
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

  const handleEmailRegister = async () => {
    try {
      if (!validate) return;
      setLoading(true);
      const user = {
        email,
        password,
      };
      const response = await emailRegister(user);
      if (response.ok) {
        const { token, user } = response.data;
        setAuthToken(token as string);
        dispatch(setAuth({ token, user }));
        toast.success("Welcome to register !!!");
        setEmailVerifySection(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("handle email register error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && !user?.emailVerified) {
      setEmailVerifySection(true);
    }
  }, [user]);

  return (
    <div className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {loading && <Spinner />}
      <div className="w-full flex flex-row gap-4">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="basis-2/3 xl:basis-1/2 bg-white rounded-xl shadow-lg"
        >
          <img
            src={BASE_URL + '/assets/pngs/model1.png'}
            alt="MODEL"
            className="w-full h-full rounded-xl object-cover object-center"
          />
        </motion.div>
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="basis-1/3 xl:basis-1/2 bg-black/5 border border-white backdrop-blur-sm rounded-xl shadow-lg py-4"
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <img src="./logo.png" alt="LOGO" className="w-[120px] h-auto" />
            <div className="gap-1 flex flex-col items-center justify-center">
              <h1 className="font-semibold text-white text-3xl">
                WELCOME REGISTER !!!
              </h1>
              <p className="font-semibold text-white">
                Let's enjoy our life in happy house party
              </p>
            </div>
            <AnimatePresence mode="wait">
              {emailVerifySection ? (
                <EmailVerification />
              ) : !phoneSelected ? (
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
                      invalid={!validateEmail(email)}
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
                      onClick={handleGoogleRegister}
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
                      label="Register with email"
                      type="transparent"
                      icon="solar:login-bold-duotone"
                      disabled={!validate()}
                      onClick={handleEmailRegister}
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
                      label="Register with phone"
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
            <div className="mt-6 flex flex-col w-full items-center justify-center gap-4">
              <p className="text-white text-sm">Have you already account?</p>
              <Button
                type="outline"
                label="Log in"
                icon="solar:login-line-duotone"
                onClick={() => {
                  navigate("/login");
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

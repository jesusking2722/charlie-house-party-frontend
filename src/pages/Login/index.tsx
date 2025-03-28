import { useState } from "react";
import { Button, IconButton, Input } from "../../components";
import * as motion from "motion/react-client";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  return (
    <div className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center">
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
          className="basis-1/3 bg-black/5 border border-white backdrop-blur-sm rounded-xl shadow-lg flex flex-col items-center justify-center gap-4"
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
          <div className="flex flex-col gap-4 w-full px-12">
            <Input
              type="email"
              placeholder="example.com"
              icon="solar:user-bold-duotone"
              value={email}
              onChange={setEmail}
            />
            <Input
              type="password"
              placeholder="password"
              icon="solar:heart-lock-bold-duotone"
              value={password}
              onChange={setPassword}
            />
            <div className="w-full text-right">
              <Button
                type="link"
                path="/forgot-password"
                label="Forgot password"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-8 mt-4">
            <IconButton icon="logos:google-icon" />
            <IconButton icon="solar:smartphone-2-bold-duotone" />
          </div>
          <div className="mt-4">
            <Button
              label="Log in with email"
              type="transparent"
              icon="solar:login-bold-duotone"
            />
          </div>
          <div className="mt-6 flex flex-col w-full items-center justify-center gap-4">
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

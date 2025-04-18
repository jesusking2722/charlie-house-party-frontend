import { motion } from "framer-motion";
import { Button, Input } from "../../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState<string>("");
  const [timePassed, setTimePassed] = useState<number>(0);
  const [buttonLabel, setButtonLabel] = useState<string>("Submit");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed((prevTime) => prevTime + 1);
    }, 1000);

    if (timePassed >= 300) {
      setButtonLabel("Resend");
    }

    return () => clearInterval(timer);
  }, [timePassed]);

  const handleSubmit = async () => {
    try {
      navigate("/onboarding");
    } catch (error) {}
  };

  const handleResend = async () => {
    try {
      setButtonLabel("Submit");
      setTimePassed(0);
    } catch (error) {}
  };

  return (
    <motion.div
      key="email-verification-section"
      initial={{ x: 50 }}
      animate={{ x: 0 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
      className="w-full"
    >
      <div className="flex flex-col gap-4 w-full px-12">
        <Input
          type="text"
          placeholder="Verification code"
          icon="solar:inbox-line-bold-duotone"
          value={code}
          onChange={setCode}
        />
        <Button
          type="outline"
          label={buttonLabel}
          icon="solar:skip-next-bold"
          onClick={buttonLabel === "Resend" ? handleResend : handleSubmit}
        />
      </div>
    </motion.div>
  );
};

export default EmailVerification;

import { Button } from "../../components";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[60%] mx-auto min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="">
          <img
            src="./assets/pngs/404.png"
            alt="404"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <h2 className="text-black text-3xl font-semibold">Oops !</h2>
          <p className="text-black text-xl">
            We can't seem to find the page <br /> you are looking for
          </p>
          <div className="mt-8">
            <Button
              type="primary"
              label="Back to home"
              icon="solar:home-bold-duotone"
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

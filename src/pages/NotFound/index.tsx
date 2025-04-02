const NotFound = () => {
  return (
    <div className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center">
      <div className="w-full flex flex-row gap-4">
        <div className="basis-2/3">
          <img
            src="./assets/pngs/404.png"
            alt="404"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;

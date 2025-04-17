import "./style.css";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center w-screen h-screen">
      <section className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-white mx-2 h-20 w-5 rounded-full shadow-custom"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="loader-dot"></span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Spinner;

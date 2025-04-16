import "./style.css";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center flex-row">
      <section className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-white mx-4 h-20 w-5 rounded-full shadow-custom"
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

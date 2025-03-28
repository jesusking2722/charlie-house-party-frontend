const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "url('../assets/pngs/bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Container;

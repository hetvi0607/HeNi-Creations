import logo from "../../assets/brands/logo.jpg";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FFF7F1] flex flex-col items-center justify-center">
      <img
        src={logo}
        alt="HeNi Creations"
        className="w-28 h-28 rounded-full object-cover shadow-xl animate-pulse"
      />

      <h1 className="mt-6 text-4xl font-serif font-bold text-[#4A3528]">
        HeNi Creations
      </h1>

      <p className="mt-3 text-[#8B5E3C] tracking-[0.2em] uppercase text-sm">
        Crafting Art with Love...
      </p>
    </div>
  );
}

export default LoadingScreen;
import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/common/LoadingScreen";
import { MessageCircle } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);

  const whatsappNumber = "918866597696";
  const message = "Hi! I want to know more about HeNi Creations Lippan Art.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] text-[#4A3528]">
      <Navbar />
      <AppRoutes />
      <Footer />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-4 rounded-full shadow-2xl flex items-center gap-2 font-semibold hover:bg-green-700 transition"
      >
        <MessageCircle size={22} />
        WhatsApp
      </a>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, User, Menu, X } from "lucide-react";
import logo from "../../assets/brands/logo.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Custom Orders", path: "/contact" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("heniCart")) || [];
      const wishlist = JSON.parse(localStorage.getItem("heniWishlist")) || [];

      const totalCartItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(totalCartItems);
      setWishlistCount(wishlist.length);
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFF7F1]/95 backdrop-blur-md border-b border-[#F0D6C2]">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="HeNi Creations Logo"
            className="w-12 h-12 rounded-full object-cover"
          />

          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#4A3528]">
            HeNi Creations
          </h1>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-[#4A3528]">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-[#7B2D26]">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-5 text-[#4A3528] items-center">
          <Search size={22} />

          <Link to="/wishlist" className="relative hover:text-[#7B2D26]">
            <Heart size={22} />

            {wishlistCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-[#7B2D26] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/login" className="hover:text-[#7B2D26]">
            <User size={22} />
          </Link>

          <Link to="/cart" className="relative hover:text-[#7B2D26]">
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-[#7B2D26] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-[#4A3528]"
        >
          <Menu size={28} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-screen w-[80%] max-w-sm bg-[#FFF7F1] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-[#4A3528]">
                Menu
              </h2>

              <button onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-6 text-lg text-[#4A3528]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-[#E8D3C0] pb-3"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="border-b border-[#E8D3C0] pb-3 flex items-center justify-between"
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-[#7B2D26] text-white text-sm px-3 py-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="border-b border-[#E8D3C0] pb-3 flex items-center justify-between"
              >
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-[#7B2D26] text-white text-sm px-3 py-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
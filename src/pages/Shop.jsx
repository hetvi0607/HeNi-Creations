import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, MessageCircle, Search } from "lucide-react";
import productsData from "../data/products";
import { formatPrice, useCountryCode } from "../utils/currency";

function Shop() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const countryCode = useCountryCode();
  const whatsappNumber = "918866597696";

  const categories = [
    "All",
    "Mandala Art",
    "Wall Decor",
    "Clocks",
    "Name Plates",
    "Festive Collection",
    "Custom Orders",
  ];

  useEffect(() => {
    const savedProducts = localStorage.getItem("heniProducts");
    const savedWishlist = localStorage.getItem("heniWishlist");

    setProducts(savedProducts ? JSON.parse(savedProducts) : productsData);
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    const updatedWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem("heniWishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem("heniCart")) || [];
    const existingItem = savedCart.find((item) => item.id === product.id);

    const updatedCart = existingItem
      ? savedCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...savedCart, { ...product, quantity: 1 }];

    localStorage.setItem("heniCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.name} added to cart`);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            HeNi Collection
          </p>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#4A3528] mt-4 mb-5">
            Our Premium Collection
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover handcrafted Lippan art pieces made with mirror work,
            texture, tradition, and love.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-xl bg-white rounded-full px-5 py-4 shadow-md flex items-center gap-3">
            <Search size={22} className="text-[#8B5E3C]" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full outline-none bg-transparent text-[#4A3528]"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-3 rounded-full border transition ${
                selectedCategory === category
                  ? "bg-[#4A3528] text-white border-[#4A3528]"
                  : "bg-white text-[#4A3528] border-[#E7D8C7] hover:bg-[#F8F4EF]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-600 mb-10">
          {filteredProducts.length} products found
        </p>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <h2 className="text-3xl font-serif font-bold text-[#4A3528]">
              No products found
            </h2>
            <p className="mt-3 text-gray-600">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isLiked = wishlist.some((item) => item.id === product.id);
              const displayPrice = formatPrice(product.price, countryCode);

              const whatsappMessage = `Hi! I am interested in "${product.name}" priced at ${displayPrice}. Could you please share more details?`;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 flex flex-col min-h-[650px] border border-[#F0E3D8]"
                >
                  <div className="relative h-[350px] bg-[#F8F4EF] flex items-center justify-center p-5 overflow-hidden">
                    {product.badge && (
                      <span className="absolute top-5 left-5 z-10 bg-[#7B2D26] text-white text-xs px-4 py-2 rounded-full font-semibold shadow">
                        {product.badge}
                      </span>
                    )}

                    <Link to={`/product/${product.id}`} className="w-full h-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition duration-700"
                      />
                    </Link>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-5 right-5 bg-white p-4 rounded-full shadow hover:scale-110 transition"
                    >
                      <Heart
                        size={24}
                        fill={isLiked ? "#7B2D26" : "none"}
                        color={isLiked ? "#7B2D26" : "#4A3528"}
                      />
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#4A3528] text-white px-8 py-4 rounded-full flex items-center gap-2 font-semibold hover:bg-[#7B2D26] transition"
                    >
                      <ShoppingBag size={22} />
                      Add
                    </button>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif text-2xl font-bold text-[#4A3528] leading-tight min-h-[78px] hover:text-[#8B5E3C] transition">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-gray-500 mt-3 min-h-[24px]">
                      {product.category}
                    </p>

                    <div className="mt-auto">
                      <p className="text-3xl font-bold text-[#8B5E3C] mb-5">
                        {displayPrice}
                      </p>

                      <div className="flex flex-col gap-3">
                        <Link
                          to={`/product/${product.id}`}
                          className="w-full text-center bg-[#4A3528] text-white py-3 rounded-full font-semibold hover:bg-[#7B2D26] transition"
                        >
                          View Details
                        </Link>

                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                            whatsappMessage
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#00B140] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#009638] transition"
                        >
                          <MessageCircle size={22} />
                          Order on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Shop;
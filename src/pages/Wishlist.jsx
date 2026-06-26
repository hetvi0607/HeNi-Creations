import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("heniWishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);
    localStorage.setItem("heniWishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    updateWishlist(updatedWishlist);
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
    <main className="pt-32 min-h-screen bg-[#FFFDF9] px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-[#4A3528] mb-4">
          Your Wishlist
        </h1>

        <p className="text-gray-600 mb-10">
          Products you liked from HeNi Creations.
        </p>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <Heart className="mx-auto text-[#8B5E3C]" size={50} />
            <h2 className="text-3xl font-serif font-bold mt-5">
              No liked products yet
            </h2>
            <Link
              to="/shop"
              className="inline-block mt-6 bg-[#4A3528] text-white px-8 py-4 rounded-full"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[32px] overflow-hidden shadow-lg flex flex-col"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="h-[300px] bg-[#F8F4EF] flex items-center justify-center p-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif font-bold text-[#4A3528] min-h-[75px]">
                    {product.name}
                  </h3>

                  <p className="text-[#8B5E3C] font-bold text-2xl mt-3">
                    ₹{product.price}
                  </p>

                  <div className="mt-auto flex flex-col gap-3 pt-5">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#4A3528] text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#7B2D26] transition"
                    >
                      <ShoppingBag size={20} />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="bg-red-500 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-red-600 transition"
                    >
                      <Trash2 size={20} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
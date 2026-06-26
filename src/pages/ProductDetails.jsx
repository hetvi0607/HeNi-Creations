import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageCircle, ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import productsData from "../data/products";
import { formatPrice } from "../utils/currency";

const reviews = {
  1: [
    {
      name: "Priya Shah",
      rating: 5,
      comment:
        "Absolutely beautiful craftsmanship. The mirror work is stunning and looks even better in person.",
    },
    {
      name: "Riya Patel",
      rating: 5,
      comment:
        "Perfect addition to my living room. Everyone asks where I bought it from!",
    },
  ],
  2: [
    {
      name: "Sneha Desai",
      rating: 5,
      comment:
        "The detailing is incredible. Looks very premium and elegant.",
    },
    {
      name: "Aarav Mehta",
      rating: 4,
      comment:
        "Amazing handmade work and great finishing.",
    },
  ],
  3: [
    {
      name: "Kavya Joshi",
      rating: 5,
      comment:
        "Beautiful clock design and excellent quality.",
    },
    {
      name: "Dhruv Shah",
      rating: 5,
      comment:
        "The traditional touch makes it stand out from ordinary décor.",
    },
  ],
  4: [
    {
      name: "Neha Patel",
      rating: 5,
      comment:
        "Our custom name plate turned out exactly how we imagined.",
    },
    {
      name: "Harsh Trivedi",
      rating: 5,
      comment:
        "Amazing craftsmanship and timely delivery.",
    },
  ],
  default: [
    {
      name: "Ananya Shah",
      rating: 5,
      comment:
        "Beautiful handmade artwork with excellent finishing.",
    },
    {
      name: "Krisha Patel",
      rating: 5,
      comment:
        "Highly recommend HeNi Creations for unique home décor.",
    },
  ],
};

function ProductDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const whatsappNumber = "918866597696";

  useEffect(() => {
    const savedProducts = localStorage.getItem("heniProducts");
    const savedWishlist = localStorage.getItem("heniWishlist");

    setProducts(savedProducts ? JSON.parse(savedProducts) : productsData);
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, []);

  const product = products.find((item) => item.id === Number(id));

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

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    const updatedWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem("heniWishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!product) {
    return (
      <main className="pt-40 min-h-screen text-center bg-[#FFFDF9] px-6">
        <h1 className="text-4xl font-serif font-bold text-[#4A3528]">
          Product not found
        </h1>

        <Link
          to="/shop"
          className="mt-6 inline-block bg-[#4A3528] text-white px-8 py-4 rounded-full"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  const isLiked = wishlist.some((item) => item.id === product.id);

  const whatsappMessage = `Hi! I am interested in "${product.name}" priced at ₹${product.price}. Could you please share more details?`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const productReviews = reviews[product.id] || reviews.default;

  return (
    <main className="pt-32 bg-[#FFFDF9] min-h-screen px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-[#4A3528] font-semibold mb-10"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="bg-white rounded-[40px] shadow-xl p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[650px] w-full object-contain"
            />
          </div>

          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
              {product.category}
            </p>

            <h1 className="text-5xl md:text-6xl font-serif font-bold mt-4 text-[#4A3528] leading-tight">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-yellow-500 text-2xl">★★★★★</span>
              <span className="text-gray-600">4.9 customer rating</span>
            </div>

            <p className="mt-6 text-4xl font-bold text-[#8B5E3C]">
            {formatPrice(product.price)}
            </p>

            <p className="mt-8 text-lg text-gray-600 leading-8">
              This handcrafted Lippan Art piece is made with traditional mirror
              work, beautiful texture, and elegant detailing. It is perfect for
              home décor, gifting, festive decoration, and custom interior
              styling.
            </p>

            <div className="mt-8 bg-[#F8F4EF] rounded-3xl p-6">
              <h3 className="text-2xl font-serif font-bold text-[#4A3528] mb-4">
                Product Details
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>✔ Handmade by HeNi Creations</li>
                <li>✔ Traditional Indian Lippan Art</li>
                <li>✔ Mirror work and textured detailing</li>
                <li>✔ Customization available</li>
                <li>✔ Secure packaging available</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-[#4A3528] text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#7B2D26] transition"
              >
                <ShoppingBag size={22} />
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="border border-[#4A3528] text-[#4A3528] px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#4A3528] hover:text-white transition"
              >
                <Heart
                  size={22}
                  fill={isLiked ? "#7B2D26" : "none"}
                  color={isLiked ? "#7B2D26" : "currentColor"}
                />
                {isLiked ? "Liked" : "Wishlist"}
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
              >
                <MessageCircle size={22} />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="text-4xl font-serif font-bold text-[#4A3528] mb-10">
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {productReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-8">
                <div className="text-yellow-500 text-xl mb-3">
                  {"★".repeat(review.rating)}
                </div>

                <p className="text-gray-600 leading-7">"{review.comment}"</p>

                <p className="mt-5 font-semibold text-[#4A3528]">
                  — {review.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-4xl font-serif font-bold text-[#4A3528] mb-10">
              Related Products
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >
                  <div className="h-64 bg-[#F8F4EF] flex items-center justify-center p-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-xl font-bold text-[#4A3528]">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-[#8B5E3C] font-semibold">
                     {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProductDetails;
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import products from "../../data/products";
import { formatPrice } from "../../utils/currency";

function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

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
    <section className="bg-[#FFFDF9] px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            Featured Artworks
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-[#4A3528]">
            Handpicked Creations
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 flex flex-col min-h-[620px] border border-[#F0E3D8]"
            >
              <div className="relative h-[350px] bg-[#F8F4EF] flex items-center justify-center p-5 overflow-hidden">
                <Link to={`/product/${product.id}`} className="w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition duration-700"
                  />
                </Link>

                <button className="absolute top-5 right-5 bg-white p-4 rounded-full shadow hover:scale-110 transition">
                  <Heart size={24} color="#4A3528" />
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
                  <p className="text-3xl font-bold text-[#8B5E3C]">
                   {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block bg-[#4A3528] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#7B2D26] transition"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import products from "../../data/products";

function BestSellers() {
  const bestSellers = products.filter((item) => item.badge === "Best Seller");

  return (
    <section className="bg-[#FFFDF9] px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            Most Loved
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-[#4A3528]">
            Best Sellers
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition border border-[#F0E3D8]"
            >
              <div className="relative h-[320px] bg-[#F8F4EF] flex items-center justify-center p-5">
                <span className="absolute top-5 left-5 bg-[#7B2D26] text-white text-xs px-4 py-2 rounded-full font-semibold">
                  Best Seller
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-[#4A3528] min-h-[70px]">
                  {product.name}
                </h3>

                <p className="text-[#8B5E3C] text-2xl font-bold mt-3">
                  ₹{product.price}
                </p>

                <button className="mt-5 w-full bg-[#4A3528] text-white py-3 rounded-full flex items-center justify-center gap-2">
                  <ShoppingBag size={20} />
                  View Product
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
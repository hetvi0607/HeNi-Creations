import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { formatPrice } from "../utils/currency";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("heniCart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("heniCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="pt-32 min-h-screen bg-[#FFFDF9] px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-[#4A3528] mb-10">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <ShoppingBag className="mx-auto text-[#8B5E3C]" size={55} />
            <h2 className="text-3xl font-serif font-bold mt-5">
              Your cart is empty
            </h2>

            <Link
              to="/shop"
              className="inline-block mt-6 bg-[#4A3528] text-white px-8 py-4 rounded-full"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg p-5 flex flex-col md:flex-row items-center gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-contain bg-[#F8F4EF] rounded-2xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-serif font-bold text-[#4A3528]">
                      {item.name}
                    </h2>

                    <p className="text-[#8B5E3C] font-semibold mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-[#F8F4EF] p-3 rounded-full"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-xl font-bold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-[#F8F4EF] p-3 rounded-full"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <p className="text-xl font-bold text-[#4A3528]">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white p-3 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#F8F4EF] rounded-3xl p-8 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <h2 className="text-3xl font-serif font-bold text-[#4A3528]">
                Total: {formatPrice(totalPrice)}
              </h2>

              <Link
                to="/checkout"
                className="bg-[#4A3528] text-white px-10 py-4 rounded-full font-semibold text-center hover:bg-[#7B2D26] transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;
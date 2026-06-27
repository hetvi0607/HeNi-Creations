import { useEffect, useState } from "react";
import { MessageCircle, CreditCard } from "lucide-react";
import confetti from "canvas-confetti";

const API_BASE_URL = "https://heni-creations.onrender.com";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const whatsappNumber = "918866597696";

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("heniCart")) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderItems = cart
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} - ₹${item.price} x ${item.quantity} = ₹${
          item.price * item.quantity
        }`
    )
    .join("\n");

  const whatsappMessage = `Hi HeNi Creations!

I want to place an order.

Customer Details:
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}

Order Details:
${orderItems}

Total Amount: ₹${totalPrice}

Note:
${customer.note}`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill your name, phone number, and address.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Please check your internet.");
      return;
    }

    try {
      const keyResponse = await fetch(`${API_BASE_URL}/api/payment/key`);
      const keyData = await keyResponse.json();

      const orderResponse = await fetch(
        `${API_BASE_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalPrice }),
        }
      );

      const orderData = await orderResponse.json();

      const options = {
        key: keyData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "HeNi Creations",
        description: "Handmade Lippan Art Order",
        order_id: orderData.id,

        handler: async function (response) {
          const verifyResponse = await fetch(
            `${API_BASE_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            confetti({
              particleCount: 180,
              spread: 80,
              origin: { y: 0.6 },
            });

            alert("Payment successful! Your order has been placed.");

            localStorage.removeItem("heniCart");
            setCart([]);
            window.dispatchEvent(new Event("cartUpdated"));

            setTimeout(() => {
              window.open(whatsappLink, "_blank");
            }, 800);
          } else {
            alert("Payment verification failed.");
          }
        },

        prefill: {
          name: customer.name,
          contact: customer.phone,
        },

        notes: {
          address: customer.address,
          order_note: customer.note,
        },

        theme: {
          color: "#4A3528",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Backend may be waking up. Please try again.");
    }
  };

  return (
    <main className="pt-32 min-h-screen bg-[#FFFDF9] px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-[#4A3528] mb-10">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <h2 className="text-3xl font-serif font-bold text-[#4A3528]">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mt-4">
              Add products to your cart before checkout.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-serif font-bold text-[#4A3528] mb-6">
                Customer Details
              </h2>

              <div className="space-y-5">
                <input
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-[#F8F4EF] px-5 py-4 rounded-2xl outline-none"
                />

                <input
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-[#F8F4EF] px-5 py-4 rounded-2xl outline-none"
                />

                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  rows="4"
                  className="w-full bg-[#F8F4EF] px-5 py-4 rounded-2xl outline-none"
                />

                <textarea
                  name="note"
                  value={customer.note}
                  onChange={handleChange}
                  placeholder="Any special note?"
                  rows="3"
                  className="w-full bg-[#F8F4EF] px-5 py-4 rounded-2xl outline-none"
                />
              </div>
            </div>

            <div className="bg-[#F8F4EF] rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-serif font-bold text-[#4A3528] mb-6">
                Order Summary
              </h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white rounded-2xl p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain bg-[#F8F4EF] rounded-xl"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-[#4A3528]">{item.name}</h3>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-semibold text-[#8B5E3C]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-8 pt-6">
                <h3 className="text-3xl font-bold text-[#4A3528]">
                  Total: ₹{totalPrice}
                </h3>

                <button
                  onClick={handleRazorpayPayment}
                  className="mt-6 w-full bg-[#4A3528] text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#7B2D26] transition"
                >
                  <CreditCard size={22} />
                  Pay with Razorpay
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full bg-green-600 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
                >
                  <MessageCircle size={22} />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Checkout;
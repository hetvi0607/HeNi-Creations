import { useState } from "react";
import { MessageCircle, Upload } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    productType: "",
    size: "",
    color: "",
    budget: "",
    message: "",
  });

  const [preview, setPreview] = useState("");

  const phoneNumber = "918866597696";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const whatsappMessage = `Hi HeNi Creations!

I want to place a custom Lippan Art order.

Name: ${form.name}
Phone: ${form.phone}
Product Type: ${form.productType}
Preferred Size: ${form.size}
Color Preference: ${form.color}
Budget: ₹${form.budget}

Custom Details:
${form.message}

I also have a reference image. I will share it here on WhatsApp.`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="pt-32 bg-[#FFFDF9] min-h-screen px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            Custom Orders
          </p>

          <h1 className="text-5xl md:text-6xl font-serif font-bold mt-4 text-[#4A3528]">
            Create Your Own Lippan Art
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Upload a reference image, share your idea, size, colors, and budget.
            We’ll continue the order on WhatsApp.
          </p>
        </div>

        <div className="bg-[#F8F4EF] rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />

            <select
              name="productType"
              value={form.productType}
              onChange={handleChange}
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            >
              <option value="">Select Product Type</option>
              <option>Mandala Art</option>
              <option>Name Plate</option>
              <option>Wall Decor</option>
              <option>Clock</option>
              <option>Diya Collection</option>
              <option>Other Custom Design</option>
            </select>

            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="Preferred Size"
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />

            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="Color Preference"
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />

            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="Budget"
              type="number"
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />
          </div>

          <div className="mt-6 bg-white rounded-2xl p-6 border border-dashed border-[#8B5E3C]">
            <label className="flex flex-col items-center justify-center cursor-pointer text-center">
              <Upload size={36} className="text-[#8B5E3C]" />

              <span className="mt-3 font-semibold text-[#4A3528]">
                Upload Reference Image
              </span>

              <span className="text-sm text-gray-500 mt-1">
                JPG, PNG, or inspiration photo
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="mt-6 flex justify-center">
                <img
                  src={preview}
                  alt="Reference Preview"
                  className="w-64 h-64 object-contain bg-[#F8F4EF] rounded-2xl p-4 shadow"
                />
              </div>
            )}
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your custom design idea..."
            rows="6"
            className="mt-6 w-full bg-white px-5 py-4 rounded-2xl outline-none"
          />

          <p className="mt-4 text-sm text-gray-500">
            Note: WhatsApp opens with your order details. Please attach the
            reference image manually in WhatsApp after it opens.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition"
          >
            <MessageCircle size={20} />
            Send Custom Order on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

export default Contact;
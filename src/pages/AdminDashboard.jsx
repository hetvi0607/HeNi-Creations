import { useEffect, useState } from "react";
import productsData from "../data/products";

function AdminDashboard() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("heniProducts");
    return savedProducts ? JSON.parse(savedProducts) : productsData;
  });

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("heniProducts", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
    });
    setPreview("");
    setEditingId(null);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category || !form.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    if (editingId) {
      const updatedProducts = products.map((product) =>
        product.id === editingId
          ? {
              ...product,
              name: form.name,
              price: Number(form.price),
              category: form.category,
              image: form.image,
            }
          : product
      );

      setProducts(updatedProducts);
      resetForm();
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image,
    };

    setProducts([newProduct, ...products]);
    resetForm();
  };

  const handleEditProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    setPreview(product.image);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <main className="pt-32 min-h-screen bg-[#FFFDF9] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-[#4A3528] mb-2">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Add, edit, delete, and save HeNi Creations products locally.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-gray-500 mb-2">Total Products</h3>
            <p className="text-4xl font-bold text-[#4A3528]">
              {products.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-gray-500 mb-2">Orders</h3>
            <p className="text-4xl font-bold text-[#4A3528]">0</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-gray-500 mb-2">Custom Requests</h3>
            <p className="text-4xl font-bold text-[#4A3528]">0</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-gray-500 mb-2">Revenue</h3>
            <p className="text-4xl font-bold text-[#4A3528]">₹0</p>
          </div>
        </div>

        <div className="bg-[#F8F4EF] rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#4A3528] mb-6">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>

          <form
            onSubmit={handleSubmitProduct}
            className="grid md:grid-cols-2 gap-6"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            >
              <option value="">Select Category</option>
              <option>Mandala Art</option>
              <option>Wall Decor</option>
              <option>Clocks</option>
              <option>Name Plates</option>
              <option>Festive Collection</option>
              <option>Custom Orders</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-white px-5 py-4 rounded-2xl outline-none"
            />

            {preview && (
              <div className="md:col-span-2">
                <p className="mb-3 font-semibold text-[#4A3528]">
                  Image Preview
                </p>

                <img
                  src={preview}
                  alt="Preview"
                  className="w-60 h-60 object-contain bg-white rounded-2xl p-4 shadow"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-[#4A3528] text-white px-8 py-4 rounded-full hover:bg-[#7B2D26] transition"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-8 py-4 rounded-full hover:bg-gray-600 transition"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-3xl font-serif font-bold text-[#4A3528]">
              Products
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#4A3528] text-white">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-contain bg-white rounded-xl"
                      />
                    </td>

                    <td className="p-4 font-semibold">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">₹{product.price}</td>

                    <td className="p-4 flex gap-3">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-[#4A3528] text-white px-4 py-2 rounded-lg hover:bg-[#7B2D26] transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
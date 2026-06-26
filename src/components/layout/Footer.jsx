function Footer() {
  return (
    <footer className="bg-[#2B2018] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-3xl font-serif font-bold">HeNi Creations</h2>
          <p className="mt-4 text-gray-300">
            Handmade Lippan Art crafted with love and tradition.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Shop</h3>
          <ul className="space-y-3 text-gray-300">
            <li>Mirror Art</li>
            <li>Mandala Collection</li>
            <li>Name Plates</li>
            <li>Custom Orders</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
         <a
  href="tel:+918866597696"
  className="hover:text-[#D6A77A] transition"
>
  +91 88665 97696
</a>
          <p className="text-gray-300 mt-2">henicreations@gmail.com</p>
          <p className="text-gray-300 mt-2">Ahmedabad, Gujarat</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
          <p className="text-gray-300">Instagram • Facebook</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
        © 2026 HeNi Creations. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
function Newsletter() {
  return (
    <section className="bg-[#4A3528] text-white px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-sm text-[#C9A227]">
          Stay Connected
        </p>

        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4">
          Join the HeNi Creations Family
        </h2>

        <p className="mt-6 text-gray-300">
          Get updates on new collections, festive offers, and exclusive handmade creations.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-4 rounded-full bg-white text-[#2B2018] placeholder:text-gray-500 w-full md:w-[400px] outline-none"
          />

          <button className="bg-[#C9A227] text-[#2B2018] px-8 py-4 rounded-full font-semibold hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
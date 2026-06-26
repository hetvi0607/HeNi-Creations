import heroImage from "../../assets/products/image1.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen pt-28 px-6 flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C] mb-4">
            Handmade Indian Art
          </p>

          <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
            Timeless Lippan Art for Elegant Homes
          </h2>

       <div className="flex flex-col gap-8">
  <p className="text-xl text-[#4A3528] leading-10 max-w-2xl">
    Discover handcrafted mirror work, traditional textures, and soulful
    designs made with love by HeNi Creations.
  </p>

  <Link
    to="/shop"
    className="w-fit bg-[#4A3528] text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#7B2D26] transition-all duration-300 hover:scale-105"
  >
    Shop Collection
  </Link>
</div>
        
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#C9A227] rounded-t-full"></div>
          <img
            src={heroImage}
            alt="Lippan Art"
            className="relative w-full h-[560px] object-cover rounded-t-full shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
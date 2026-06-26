import storyImage from "../../assets/products/story/our story.jpg";

function OurStory() {
  return (
    <section className="bg-[#FFFDF9] px-6 py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Image Section */}
        <div className="overflow-hidden rounded-[40px] shadow-2xl bg-[#F8F4EF] flex justify-center p-4">
          <img
            src={storyImage}
            alt="Founder of HeNi Creations"
            className="h-[650px] w-auto object-contain"
          />
        </div>

        {/* Content Section */}
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            Our Story
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-[#4A3528] leading-tight">
            Handmade With Love <br /> & Tradition
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            HeNi Creations began with a passion for preserving the beauty of
            traditional Indian Lippan Art. Every piece is handcrafted with
            patience, creativity, and attention to detail.
          </p>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Behind every creation is a story of dedication and craftsmanship.
            Our mission is to bring handmade Indian art into modern homes while
            keeping our traditions alive.
          </p>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Every mirror, every pattern, and every handcrafted detail reflects
            our love for Indian heritage and our commitment to creating unique,
            meaningful décor pieces for your home.
          </p>

          <div className="mt-10">
            <button className="bg-[#4A3528] text-white px-8 py-4 rounded-full hover:bg-[#5f4435] transition duration-300">
              Explore Our Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
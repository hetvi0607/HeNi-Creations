import mandalaArt from "../../assets/products/mandala art.jpg";
import namePlate from "../../assets/products/name plate.jpg";
import festiveArt from "../../assets/products/image1.jpg";

const categories = [
  {
    title: "Mandala Art",
    desc: "Colorful circular Lippan designs with mirror detailing.",
    image: mandalaArt,
  },
  {
    title: "Wedding Name Plates",
    desc: "Personalized handmade frames for weddings and special memories.",
    image: namePlate,
  },
  {
    title: "Festive Decor",
    desc: "Bright traditional pieces for celebrations and home styling.",
    image: festiveArt,
  },
];

function Categories() {
  return (
    <section className="bg-[#F8F4EF] px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            Shop by Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            Featured Collections
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((item, index) => (
            <div
              key={index}
              className="group relative h-[430px] overflow-hidden rounded-t-full shadow-xl cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-serif font-bold">{item.title}</h3>
                <p className="mt-3 text-sm opacity-90">{item.desc}</p>
                <button className="mt-5 border border-white px-6 py-3 rounded-full hover:bg-white hover:text-[#4A3528] transition">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
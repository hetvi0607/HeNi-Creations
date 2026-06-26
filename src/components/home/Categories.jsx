import { Link } from "react-router-dom";
import image1 from "../../assets/products/image1.jpg";
import image4 from "../../assets/products/image4.jpg";
import image6 from "../../assets/products/image6.jpg";

function Categories() {
  const categories = [
    {
      title: "Mandala Art",
      description:
        "Handcrafted mandala pieces with mirror work and traditional detailing.",
      image: image1,
      link: "/shop?category=Mandala Art",
    },
    {
      title: "Name Plates",
      description:
        "Customized name plates made beautifully for homes and special memories.",
      image: image4,
      link: "/shop?category=Name Plates",
    },
    {
      title: "Wall Decor",
      description:
        "Elegant handmade décor pieces for premium and traditional home styling.",
      image: image6,
      link: "/shop?category=Wall Decor",
    },
  ];

  return (
    <section className="bg-[#FFFDF9] px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            Shop by Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-[#4A3528]">
            Explore Our Art Categories
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className="relative h-[420px] rounded-[32px] overflow-hidden shadow-xl group"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/45"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-3xl font-serif font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-4 leading-7">{category.description}</p>
                </div>

                <Link
                  to={category.link}
                  className="w-fit border border-white px-9 py-4 rounded-full font-semibold hover:bg-white hover:text-[#4A3528] transition"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
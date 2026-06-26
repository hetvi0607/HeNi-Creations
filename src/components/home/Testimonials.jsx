import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Shah",
    text: "The Lippan Art piece is even more beautiful in real life. It made my living room look so elegant.",
  },
  {
    name: "Riya Patel",
    text: "Loved the finishing, mirror work, and packaging. Perfect handmade gift for festive occasions.",
  },
  {
    name: "Meera Joshi",
    text: "HeNi Creations made a custom piece for my home and it looks absolutely premium.",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#FFFDF9] px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
            Customer Love
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8F4EF] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="flex gap-1 text-[#C9A227] mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-[#6B4B38] leading-7">“{item.text}”</p>

              <h3 className="mt-6 font-serif text-xl font-bold">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
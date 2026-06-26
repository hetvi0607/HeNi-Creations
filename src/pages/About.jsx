import storyImage from "../assets/products/story/our story.jpg";
import { Heart, Sparkles, Palette, PackageCheck } from "lucide-react";

function About() {
  return (
    <main className="pt-32 bg-[#FFFDF9] min-h-screen">
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
              About HeNi Creations
            </p>

            <h1 className="text-5xl md:text-6xl font-serif font-bold mt-4 text-[#4A3528]">
              Handmade Art with Heart & Heritage
            </h1>

            <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
              HeNi Creations is a handmade Lippan Art brand created with love,
              patience, and traditional Indian craftsmanship.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-[#F8F4EF] rounded-[40px] p-5 shadow-2xl flex justify-center">
              <img
                src={storyImage}
                alt="HeNi Creations artist working on Lippan Art"
                className="h-[650px] object-contain rounded-[30px]"
              />
            </div>

            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-[#8B5E3C]">
                Our Story
              </p>

              <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-[#4A3528] leading-tight">
                Every Piece Tells a Story
              </h2>

              <p className="mt-8 text-lg text-gray-600 leading-8">
                HeNi Creations was born from a deep love for traditional Indian
                art and home décor. Each artwork is made by hand using careful
                detailing, mirror work, texture, and creativity.
              </p>

              <p className="mt-5 text-lg text-gray-600 leading-8">
                From elegant mandalas to custom name plates and festive décor,
                every creation is designed to bring warmth, culture, and beauty
                into your home.
              </p>

              <p className="mt-5 text-lg text-gray-600 leading-8">
                Our goal is simple — to keep traditional Lippan Art alive while
                giving it a modern and premium touch for today’s homes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-24">
            <div className="bg-[#F8F4EF] rounded-3xl p-7 shadow-lg text-center">
              <Heart className="mx-auto text-[#8B5E3C]" size={34} />
              <h3 className="mt-5 text-xl font-serif font-bold">
                Handmade with Love
              </h3>
              <p className="mt-3 text-gray-600 text-sm">
                Every product is carefully handcrafted, not mass-produced.
              </p>
            </div>

            <div className="bg-[#F8F4EF] rounded-3xl p-7 shadow-lg text-center">
              <Sparkles className="mx-auto text-[#8B5E3C]" size={34} />
              <h3 className="mt-5 text-xl font-serif font-bold">
                Traditional Craft
              </h3>
              <p className="mt-3 text-gray-600 text-sm">
                Inspired by Indian Lippan Art and mirror work traditions.
              </p>
            </div>

            <div className="bg-[#F8F4EF] rounded-3xl p-7 shadow-lg text-center">
              <Palette className="mx-auto text-[#8B5E3C]" size={34} />
              <h3 className="mt-5 text-xl font-serif font-bold">
                Custom Designs
              </h3>
              <p className="mt-3 text-gray-600 text-sm">
                Personalized name plates, colors, sizes, and patterns.
              </p>
            </div>

            <div className="bg-[#F8F4EF] rounded-3xl p-7 shadow-lg text-center">
              <PackageCheck className="mx-auto text-[#8B5E3C]" size={34} />
              <h3 className="mt-5 text-xl font-serif font-bold">
                Safe Packaging
              </h3>
              <p className="mt-3 text-gray-600 text-sm">
                Products are packed carefully for secure delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
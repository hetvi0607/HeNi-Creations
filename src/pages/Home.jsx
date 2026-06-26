import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BestSellers from "../components/home/BestSellers";
import OurStory from "../components/home/OurStory";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BestSellers />
      <OurStory />
      <Testimonials />
      <Newsletter />
    </>
  );
}

export default Home;
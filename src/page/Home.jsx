import React from "react";
import Banner from "../Component/Banner";
import About from "../Component/About";
import PromotionsSection from "../Component/PromotionsSection ";

const Home = () => {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <About></About>
      </section>
      <section>
        <PromotionsSection></PromotionsSection>
      </section>
    </div>
  );
};

export default Home;

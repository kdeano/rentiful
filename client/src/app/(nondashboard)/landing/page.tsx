import React from "react";
import Hero from "./hero";
import Features from "./features";
import Discover from "./discover";
import CallToAction from "./cta";
import Footer from "./footer";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Discover />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Landing;

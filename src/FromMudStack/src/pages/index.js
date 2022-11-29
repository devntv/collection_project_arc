import Layout from "components/Layout";
import React from "react";

import SEO from "components/SEO";
import Benefits from "views/home/Benefits";
import Desktop from "views/home/Desktop/index";
import FeatureList from "views/home/FeatureList";
import Hero from "views/home/Hero";
import SearchSection from "views/home/SearchSection";

const Home = () => (
  <Layout>
    <Hero />
    <Benefits />
    <Desktop />
    <SearchSection />
    <FeatureList />
  </Layout>
);

export const Head = () => (
  <SEO
    title="mudstack"
    description="mudstack is the only asset management and collaboration platform custom built for game studios and digital artists."
  />
);

export default Home;

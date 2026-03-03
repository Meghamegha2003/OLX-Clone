import React, { useState } from "react";
import Header from "../Component/Layout/Header/Header";
import Categories from "../Component/categories/Categories";
import AdSection from "../Component/ads/AdSection";
import AdComponent from "../Component/ads/AdComponent";
import HomeCategories from "../Component/home/HomeCategories";
import Recommendations from "../Component/common/Recommendations";
import OLXPromotedGrid from "../Component/promoted/OLXPromotedGrid";
import items from "../Component/promoted/GridData";
import Footer from "../Component/Layout/Footer/Footer";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <Header />
      <Categories 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <AdSection />
      <AdComponent />
      <HomeCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Recommendations selectedCategory={selectedCategory} />
      <AdComponent />
      <OLXPromotedGrid items={items} />
      <Footer />
    </div>
  );
}

export default Home;
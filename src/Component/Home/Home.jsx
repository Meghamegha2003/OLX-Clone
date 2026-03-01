import React from 'react'
import Header from '../Header/Header';
import Categories from "../Page/Categories/Categories";
import AdSection from "../Page/AdSection/AdSection";
import HomeCategories from "../Page/HomeCategories/HomeCategories";
import AdComponent from "../Page/CustomAdd/AdComponent";
import Recommendations from "../Page/ProductCard/Recommendations";
import OLXPromotedGrid from "../OLXPromotedGrid/OLXPromotedGrid";
import items from "../OLXPromotedGrid/GridData"
import Footer from "../Footer/Footer";

function Home() {
  return (
    <div>
      <Header />
      <Categories />
      <AdSection />
      <AdComponent />
      <HomeCategories />
      <Recommendations />
      <AdComponent />
      <OLXPromotedGrid items={items} />
      <Footer/>
    </div>
  )
}

export default Home

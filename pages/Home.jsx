import React from 'react'
import Header from '../Component/Layout/Header/Header';
import Categories from '../Component/categories/Categories';
import AdSection from "../Component/ads/AdSection"
import AdComponent from "../Component/ads/AdComponent"
import HomeCategories from '../Component/home/HomeCategories';
import Recommendations from '../Component/common/Recommendations';
import OLXPromotedGrid from '../Component/promoted/OLXPromotedGrid'
import items from '../Component/promoted/GridData'
import Footer from '../Component/Layout/Footer/Footer'

function Home() {
  return (
    <div>
      <Header/>
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

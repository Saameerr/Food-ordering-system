import React, { useState } from 'react'
import './Home.css'
import Carousel from '../../components/Carousel/Carousel'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../AppDownload/AppDownload'

const Home = () => {
  const[category, setCategory]= useState("All")
  return (
    <div>
      <Carousel/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
      
    </div>
  )
}

export default Home

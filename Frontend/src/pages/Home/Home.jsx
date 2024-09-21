import React, { useState } from 'react'
import './Home.css'
import Carousel from '../../components/Carousel/Carousel'
import AppDownload from '../../AppDownload/AppDownload'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'

const Home = () => {
  const[category, setCategory]= useState("All")
  return (
    <div>
      <Carousel/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <AppDownload/>
      
    </div>
  )
}

export default Home

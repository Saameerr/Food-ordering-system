import React, { useState } from 'react'
import './Home.css'
import Carousel from '../../components/Carousel/Carousel'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {
  const[category, setCategory]= useState("All")
  return (
    <div id='home'>
      <Carousel/>
      <div className='explore-menu'>
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <FoodDisplay category={category}/>
      
    </div>
  )
}

export default Home

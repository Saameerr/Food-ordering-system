import React from 'react'
import './Home.css'
import Carousel from '../../components/Carousel/Carousel'
import AppDownload from '../../AppDownload/AppDownload'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <AppDownload/>
    </div>
  )
}

export default Home

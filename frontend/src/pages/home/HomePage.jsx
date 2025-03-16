import { useState } from 'react'
import './HomePage.css'
import SideBar from '../../components/sidebar/SideBar'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import axios from "axios";


function HomePage() {

  return (
    <>
        <NavigationBar/>
        <SideBar/>
    </>
  )
}

export default HomePage
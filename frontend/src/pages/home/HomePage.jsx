import { useState } from 'react'
import './HomePage.css'
import SideBar from '../../components/sidebar/SideBar'
import NavigationBar from '../../components/navigation-bar/NavigationBar'
import axios from "axios";
import StartAdding from '../../components/start-adding/StartAdding'


function HomePage() {
  return (
    <>
        <NavigationBar/>
        <SideBar/>
    </>
  )
}

export default HomePage
import React from 'react'
import './Sidebar.css'
import { IoAddCircleOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { LuClipboardCheck } from "react-icons/lu";

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
            <IoAddCircleOutline className='icon' />
                <p style={{fontWeight:"bold", fontSize:"16px"}}>Add Items</p>
            </NavLink>

            <NavLink to='/list' className="sidebar-option">
            <CiViewList className='icon'/>
                <p  style={{fontWeight:"bold", fontSize:"16px"}}>List Items</p>
            </NavLink>

            <NavLink to='/orders' className="sidebar-option">
            <LuClipboardCheck className='icon'/>
                <p  style={{fontWeight:"bold", fontSize:"16px"}}>Orders</p>
            </NavLink>

        </div>
      
    </div>
  )
}

export default Sidebar
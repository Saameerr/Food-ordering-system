import React from 'react'
import './Footer.css'
// import {assets} from '../assets/assets'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <img src="logo.png" alt="" style={{height:"200px", width:"200px", marginTop:"-30px"}}/>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed optio aut ullam quibusdam magnam nesciunt, et, assumenda aperiam culpa nisi, maiores explicabo! Minima perferendis dolorum vel sequi fugiat exercitationem quam!</p>
               
                <div className="footer-social-icons">
                <a href="https://www.facebook.com/"><FaFacebook style={{height:"30px", width:"30px", marginRight:"20px"}}/></a>
                <a href="https://www.instagram.com/"><FaInstagramSquare style={{height:"30px", width:"30px", marginRight:"20px"}}/></a>
                <a href="https://www.twitter.com/"><FaTwitter style={{height:"30px", width:"30px"}}/></a>
                </div>

            </div>
            <div className="footer-content-right">
                <h3>COMPANY</h3>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>

            </div>
            <div className="footer-content-center">
                <h3>GET IN TOUCH</h3>   
                <ul>
                    <li><IoMdCall /> 98000000000</li>
                    <li><IoMdCall /> 02100000</li>
                    <li><a href="https://www.gmail.com/"><MdEmail /> KhajaBhayo@gmail.com</a></li>
                </ul>

            </div>
        </div>
        <hr />
        <p className="footer-copyright">copyright 2024 <MdCopyright /> KhajaBhayo.com | All Rights Reserved.</p>

      
    </div>
  )
}

export default Footer
